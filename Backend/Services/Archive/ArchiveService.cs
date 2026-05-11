using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto;
using Backend.Models.Dto.Archive;
using Backend.Models.User;
using Backend.Repositories.Archive;
using Backend.Services.Comment;
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
    private readonly CommentService _commentService;
    
    private readonly int _pageSize = 10;

    public ArchiveService(UserManager<User> userManager,
        AppIdentityDbContext appIdentityDbContext, 
        FileStorageService fileStorageService, 
        FileRepository fileRepository, 
        ArchiveRepository archiveRepository, 
        TagService tagService, CommentService commentService)
    {
        _userManager = userManager;
        _context = appIdentityDbContext;
        _fileStorageService = fileStorageService;
        _fileRepository = fileRepository;
        _archiveRepository = archiveRepository;
        _tagService = tagService;
        _commentService = commentService;
    }

    public async Task<PagedResultDto<ArchiveGameCardDto>?> GetArchive(ArchiveQueryDto currentQuery)
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

        return new PagedResultDto<ArchiveGameCardDto>()
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
            AuthorName = dto.Author
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

    public async Task<GameInfoDto?> LoadGameInformation(Guid gameGuid)
    {
        var gameArchive = await _archiveRepository.GetArchiveGame(gameGuid);
        var thumbnail = _archiveRepository.GetGameThumbnail(gameGuid);
        if (gameArchive == null)
            return null;

        return new GameInfoDto
        {
            Title = gameArchive.Title,
            AuthorName = gameArchive.AuthorName,
            Description = gameArchive.Description,
            ThumbnailUrl = thumbnail,
            StarsRated = gameArchive.RatingAverage,
            PlaysCount = gameArchive.PlaysCount,
            Uploaded = gameArchive.CreatedAt,
            Modified = gameArchive.UpdatedAt,
            Tags = gameArchive.GameTags,
        };
    }
}