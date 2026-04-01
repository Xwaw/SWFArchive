using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto;
using Backend.Models.Dto.Archive;
using Backend.Models.User;
using Backend.Repositories.Archive;
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
    
    private readonly int _pageSize = 10;

    public ArchiveService(UserManager<User> userManager,
        AppIdentityDbContext appIdentityDbContext, FileStorageService fileStorageService, FileRepository fileRepository, ArchiveRepository archiveRepository)
    {
        _userManager = userManager;
        _context = appIdentityDbContext;
        _fileStorageService = fileStorageService;
        _fileRepository = fileRepository;
        _archiveRepository = archiveRepository;
    }

    public async Task<PagedResultDto<ArchiveGameCardDto>?> GetPagedArchive(int currentPage) // ONLY TEST, NEED:  PAGINATION AND QUERY
    {
        var archive = _context.ArchiveGames;
        var sorted = _archiveRepository.SortArchive(archive, "title");
        var query = _archiveRepository.ApplyPaging(sorted, currentPage, _pageSize);

        if (!query.Any())
        {
            return null;
        }

        var archiveGameCardDto = query.Select(g => new ArchiveGameCardDto
        {
            Id = g.Id,
            Title = g.Title,
            PlaysCount = g.PlaysCount,
            RatingAverage = g.RatingAverage,
            Uploaded = g.UploadedAt,
            AuthorName = g.AuthorName,
            ThumbnailUrl = _archiveRepository.GetGameThumbnail(g.Id)
        });

        var pageArchive = await archiveGameCardDto.ToListAsync();

        var page = new PagedResultDto<ArchiveGameCardDto>
        {
            Items = pageArchive,
            Page = currentPage,
            PageSize = _pageSize,
            Total = (int)Math.Ceiling(archive.Count() / 10.0),
        };
        return page;
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

        await _fileRepository.AddArchiveAsync(new GameArchive
        {
            Id = archiveGameId,
            Title = dto.Title,
            Description = dto.Description,
            UploadedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = dto.CreatedAt,
            AuthorName = dto.Author,
        });

        await _fileRepository.AddFileAsync(new FileTarget
        {
            OwnerId = archiveGameId,
            Url = urlFlash,
            OwnerType = FileOwnerType.Archive,
            UsageType = FileUsageType.FlashFile,
        });

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
}