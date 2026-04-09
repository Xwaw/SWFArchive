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
    private readonly TagRepository _tagRepository;
    
    private readonly int _pageSize = 10;

    public ArchiveService(UserManager<User> userManager,
        AppIdentityDbContext appIdentityDbContext, FileStorageService fileStorageService, FileRepository fileRepository, ArchiveRepository archiveRepository, TagRepository tagRepository)
    {
        _userManager = userManager;
        _context = appIdentityDbContext;
        _fileStorageService = fileStorageService;
        _fileRepository = fileRepository;
        _archiveRepository = archiveRepository;
        _tagRepository = tagRepository;
    }

    public async Task<PagedResultDto<ArchiveGameCardDto>?> GetPagedArchive(int currentPage)
    {
        var archive = _context.ArchiveGames;
        var sorted = _archiveRepository.SortArchive(archive, "title");
        var query = _archiveRepository.ApplyPaging(sorted, currentPage, _pageSize);

        if (! await query.AnyAsync())
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
        
        var totalCount = await query.CountAsync();

        var page = new PagedResultDto<ArchiveGameCardDto>
        {
            Items = pageArchive,
            Page = currentPage,
            PageSize = _pageSize,
            Total = (int) Math.Ceiling(totalCount / (double) _pageSize)
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
        
        var listTags = new List<Tag>();

        foreach (var tagName in dto.Tags)
        {
            var tag = await GetOrCreateTag(tagName);
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
        
        await _tagRepository.AddTagsToGame(game.Id, listTags);

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

    public async Task<Tag?> GetOrCreateTag(string name)
{
    if (string.IsNullOrWhiteSpace(name)) return null;
    
    var normalized = name.Trim().ToLower();
    
    var existing = await _tagRepository.GetExistingTag(normalized);
    
    if (existing != null) return existing;

    var newTag = new Tag { Name = normalized };

    await _tagRepository.AddTag(newTag);
    
    return newTag;
}
}