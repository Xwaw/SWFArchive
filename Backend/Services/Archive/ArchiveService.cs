using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Archive;
using Backend.Models.Dto;
using Backend.Models.Dto.Archive;
using Backend.Models.User;
using Backend.Repositories.Archive;
using Backend.Services.Comment;
using Backend.Services.FileSystem;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace Backend.Services.Archive;

public class ArchiveService
{
    private readonly UserManager<User> _userManager;
    private readonly FileStorageService _fileStorageService;
    private readonly FileRepository _fileRepository;
    private readonly AppIdentityDbContext _context;
    private readonly ArchiveRepository _archiveRepository;
    private readonly TagService _tagService;
    
    private readonly int _pageSize = 10;

    public ArchiveService(UserManager<User> userManager,
        AppIdentityDbContext appIdentityDbContext, 
        FileStorageService fileStorageService, 
        FileRepository fileRepository, 
        ArchiveRepository archiveRepository, 
        TagService tagService)
    {
        _userManager = userManager;
        _context = appIdentityDbContext;
        _fileStorageService = fileStorageService;
        _fileRepository = fileRepository;
        _archiveRepository = archiveRepository;
        _tagService = tagService;
    }

    public async Task<PaginationResultDto<ArchiveGameCardDto>?> GetArchive(ArchiveQueryDto currentQuery)
    {
        var archive = _context.ArchiveGames
            .Include(g => g.GameTags)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(currentQuery.Search))
        {
            var normalized = currentQuery.Search.ToLower();
            archive = archive.Where(g => g.Title.ToLower().Contains(normalized));
        }

        if (currentQuery.TagIds != null && currentQuery.TagIds.Any())
            archive = archive.Where(g => g.GameTags.Any(gt => currentQuery.TagIds.Contains(gt.TagId)));
        
        var totalCount = await archive.CountAsync();
        
        if(totalCount == 0)
            return null;

        if (currentQuery.SortBy != null) 
            archive = _archiveRepository.SortArchive(archive, currentQuery.SortBy);

        var pagedArchive = _archiveRepository.ApplyPaging(archive, currentQuery.CurrentPage, _pageSize);

        var items = await pagedArchive.Select(g => new ArchiveGameCardDto
        {
            Title = g.Title,
            Id = g.Id,
            AuthorName = g.AuthorName,
            PlaysCount = g.PlaysCount,
            RatingAverage = g.RatingAverage,
            ThumbnailUrl = _archiveRepository.GetGameThumbnail(g.Id),
            Uploaded = g.CreatedAt
        }).ToListAsync();

        return new PaginationResultDto<ArchiveGameCardDto>()
        {
            Items = items,
            Page = currentQuery.CurrentPage,
            PageSize = _pageSize,
            Total = (int)Math.Ceiling(totalCount / (double)_pageSize)
        };
    }
    public async Task UploadNewGame(ClaimsPrincipal principal, UploadGameDto dto)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null)
            throw new UnauthorizedAccessException("User not found.");

        if (!Guid.TryParse(user.Id, out var userId))
            throw new Exception("Invalid user id.");

        if (dto.SwfGame is null || dto.SwfGame.Length == 0)
            throw new ArgumentException("SWF file is required.");

        if (dto.SwfGame.Length > FileSizeLimits.GetMaxFileSizeLimit(FileUsageType.FlashFile))
            throw new ArgumentException("SWF file is too large.");

        var archiveGameId = Guid.NewGuid();

        var urlFlash = await _fileStorageService.SaveArchiveFile(archiveGameId, dto.SwfGame, FileUsageType.FlashFile);
        if (string.IsNullOrWhiteSpace(urlFlash))
            throw new Exception("Failed to save SWF file.");

        string? thumbnailUrl = null;

        if (dto.Thumbnail is not null &&
            dto.Thumbnail.Length > 0 &&
            dto.Thumbnail.Length <= FileSizeLimits.GetMaxFileSizeLimit(FileUsageType.Thumbnail))
        {
            thumbnailUrl = await _fileStorageService.SaveArchiveFile(archiveGameId, dto.Thumbnail, FileUsageType.Thumbnail);
        }
        
        var listTags = new List<Tag>();

        if (dto.Tags != null)
            foreach (var tagName in dto.Tags)
            {
                var tag = await _tagService.GetOrCreateTag(tagName);
                if (tag != null)
                    listTags.Add(tag);
            }

        var game = new GameArchive
        {
            Id = archiveGameId,
            Title = dto.Title,
            Description = dto.Description,
            UploadedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = dto.CreatedAt,
            AuthorName = dto.Author,
            PublisherId = user.Id
        };

        await _archiveRepository.AddArchiveAsync(game);

        await _fileRepository.AddFileAsync(new FileTarget
        {
            OwnerId = archiveGameId,
            Url = urlFlash,
            OwnerType = FileOwnerType.Archive,
            UsageType = FileUsageType.FlashFile,
        });
        
        await _tagService.AddTagsToGame(game.Id, listTags);

        if (thumbnailUrl is not null)
        {
            await _fileRepository.AddFileAsync(new FileTarget
            {
                OwnerId = archiveGameId,
                Url = thumbnailUrl,
                OwnerType = FileOwnerType.Archive,
                UsageType = FileUsageType.Thumbnail,
            });
        }
    }

    
    public async Task RateGame(ClaimsPrincipal principal, GameRateDto dto){
        var user = await _userManager.GetUserAsync(principal);
        if (user == null)
            throw new UnauthorizedAccessException("User not found.");
        
        var rating = await _context.GameRates.SingleOrDefaultAsync(
            g => g.GameId == dto.GameId
                 && g.RaterId == user.Id);

        if (rating is null)
        {
            _context.GameRates.Add(new GameRate
            {
                Rate = dto.Rating,
                RaterId = user.Id,
                GameId = dto.GameId
            });
        }
        else
        {
            rating.Rate = dto.Rating;
        }

        await _context.SaveChangesAsync();
    }
    
    public async Task<GameInfoDto?> GetGameInfo(
        Guid gameGuid,
        ClaimsPrincipal principal)
    {
        var gameArchive = await _archiveRepository.GetArchiveGame(gameGuid);

        if (gameArchive == null)
            return null;

        var tags = await _archiveRepository.GetGameTags(gameGuid);
        var thumbnail = _archiveRepository.GetGameThumbnail(gameGuid);

        var user = await _userManager.GetUserAsync(principal);

        bool isOwner = user != null &&
                       gameArchive.PublisherId == user.Id;

        bool isInLibrary = false;
        int? userRating = null;

        if (user != null)
        {
            isInLibrary = await _context.Set<UserGame>()
                .AnyAsync(g =>
                    g.GameId == gameGuid &&
                    g.UserId == user.Id);

            userRating = await _context.GameRates
                .Where(g =>
                    g.GameId == gameGuid &&
                    g.RaterId == user.Id)
                .Select(g => (int?)g.Rate)
                .SingleOrDefaultAsync();
        }

        var ratingAverage = await _context.GameRates
            .Where(g => g.GameId == gameGuid)
            .AverageAsync(g => (float?)g.Rate) ?? 0;

        return new GameInfoDto
        {
            Title = gameArchive.Title,
            AuthorName = gameArchive.AuthorName,
            Description = gameArchive.Description,
            ThumbnailUrl = thumbnail,
            StarsRated = ratingAverage,
            UserRating = userRating,
            PlaysCount = gameArchive.PlaysCount,
            Uploaded = gameArchive.UploadedAt,
            Modified = gameArchive.UpdatedAt,
            Tags = tags,
            PublisherId = gameArchive.PublisherId,
            IsOwner = isOwner,
            IsInLibrary = isInLibrary
        };
    }

    public async Task<string?> GetGameFileUrl(Guid gameGuid)
    {
        return await _context.ArchiveGames
            .Where(game => game.Id == gameGuid)
            .Join(
                _context.Files,
                game => game.Id,
                file => file.OwnerId,
                (_, file) => file)
            .Where(file =>
                file.OwnerType == FileOwnerType.Archive &&
                file.UsageType == FileUsageType.FlashFile)
            .Select(file => file.Url)
            .FirstOrDefaultAsync();
    }

    public async Task<List<ArchiveGameCardDto>> GetRandomGames(int value)
    {
        var games = await _context.ArchiveGames
            .OrderBy(g => EF.Functions.Random())
            .Take(value)
            .ToListAsync();

        var result = await Task.WhenAll(
            games.Select(async g => new ArchiveGameCardDto
            {
                Id = g.Id,
                AuthorName = g.AuthorName,
                PlaysCount = g.PlaysCount,
                RatingAverage = g.RatingAverage,
                ThumbnailUrl = await _fileRepository.GetFileUrlAsync(
                    g.Id,
                    FileOwnerType.Archive,
                    FileUsageType.Thumbnail
                ),
                Title = g.Title,
                Uploaded = g.UploadedAt
            })
        );

        return result.ToList();
    }
    public async Task<List<ArchiveGameCardDto>> GetTopGames(string type)
    {
        var now = DateTime.UtcNow;
        var today = now.Date;

        var query = _context.ArchiveGames.AsNoTracking();

        query = type.ToLowerInvariant() switch
        {
            "today" => query.Where(g =>
                g.UploadedAt >= today &&
                g.UploadedAt < today.AddDays(1)),

            "month" => query.Where(g =>
                g.UploadedAt >= new DateTime(now.Year, now.Month, 1) &&
                g.UploadedAt < new DateTime(now.Year, now.Month, 1).AddMonths(1)),

            "year" => query.Where(g =>
                g.UploadedAt >= new DateTime(now.Year, 1, 1) &&
                g.UploadedAt < new DateTime(now.Year + 1, 1, 1)),

            "overall" => query,

            _ => throw new ArgumentException("Invalid ranking type")
        };

        var games = await query
            .OrderByDescending(g => g.RatingAverage)
            .ThenByDescending(g => g.PlaysCount)
            .Take(10)
            .ToListAsync();

        var result = await Task.WhenAll(
            games.Select(async g => new ArchiveGameCardDto
            {
                Id = g.Id,
                AuthorName = g.AuthorName,
                PlaysCount = g.PlaysCount,
                RatingAverage = g.RatingAverage,
                ThumbnailUrl = await _fileRepository.GetFileUrlAsync(
                    g.Id,
                    FileOwnerType.Archive,
                    FileUsageType.Thumbnail
                ),
                Title = g.Title,
                Uploaded = g.UploadedAt
            })
        );

        return result.ToList();
    }
}