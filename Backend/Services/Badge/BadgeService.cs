using System.Security.Claims;
using Backend.Enums;
using Backend.Models.BadgeEntity;
using Backend.Models.Dto;
using Backend.Models.Dto.Badge;
using Backend.Models.User;
using Backend.Services.FileSystem;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Badge;

public class BadgeService
{
    private readonly UserManager<User> _userManager;
    private readonly FileStorageService _fileStorageService;
    private readonly AppIdentityDbContext _context;

    public BadgeService(UserManager<User> userManager, FileStorageService fileStorageService, AppIdentityDbContext appIdentityDbContext)
    {
        _userManager = userManager;
        _fileStorageService = fileStorageService;
        _context = appIdentityDbContext;
    }

    public async Task UploadBadge(UploadBadgeDto uploadBadgeDto, ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) return;
        
        var canUploadBadge = await _context.ArchiveGames
            .AnyAsync(g =>
                g.Id == uploadBadgeDto.GameId &&
                g.PlaysCount >= 100 &&
                g.OwnerId == user.Id);

        if (!canUploadBadge) return;
        
        if (uploadBadgeDto.Gif.Length == 0 ||
            uploadBadgeDto.Gif.Length >
            FileSizeLimits.GetMaxFileSizeLimit(FileUsageType.Badge))
            return;

        if (!Path.GetExtension(uploadBadgeDto.Gif.FileName)
                .Equals(".gif", StringComparison.InvariantCultureIgnoreCase))
            return;

        var badge = new Models.BadgeEntity.Badge
        {
            Name = uploadBadgeDto.Name ?? uploadBadgeDto.Gif.FileName,
            Description = uploadBadgeDto.Description,
            GameId = uploadBadgeDto.GameId,
            RequiredPlayTime = uploadBadgeDto.RequiredPlayTime,
        };

        _context.Badges.Add(badge);

        var badgePath = await _fileStorageService.SaveBadgeFile(
            badge.Id,
            uploadBadgeDto.Gif
        );

        if (badgePath == null)
        {
            _context.Badges.Remove(badge);
            return;
        }

        var file = new FileTarget
        {
            Url = badgePath,
            OwnerType = FileOwnerType.Badge,
            UsageType = FileUsageType.Badge,
            OwnerId = badge.Id,
        };

        _context.Files.Add(file);

        await _context.SaveChangesAsync();
    }
    public async Task<bool> AcceptBadge(Guid badgeId, ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return false;
        
        var badge = await _context.Badges
            .FirstOrDefaultAsync(b =>
                b.Id == badgeId &&
                b.Moderation == null);

        if (badge == null)
            return false;

        badge.Moderation = new BadgeModeration
        {
            BadgeId = badge.Id,
            ModeratorId = user.Id,
            Result = BadgeModerationResult.Accepted
        };

        await _context.SaveChangesAsync();

        return true;
    }
    public async Task<bool> RejectBadge(RejectionBadgeDto rejectionBadgeDto, ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return false;
        
        var badge = await _context.Badges.Include(badge => badge.Moderation).FirstOrDefaultAsync(b => b.Id == rejectionBadgeDto.BadgeId);
        if (badge == null) return false;

        if (badge.Moderation != null)
            return false;

        var rejection = new BadgeModeration
        {
            BadgeId = badge.Id,
            Reason = rejectionBadgeDto.Reason,
            ModeratorId = user.Id,
            Result = BadgeModerationResult.Rejected
        };
        
        badge.Moderation = rejection;
        
        await _context.SaveChangesAsync();

        return true;
    }
    public async Task<List<PendingBadgeDto>> GetPendingBadges()
    {
        return await _context.Badges.Where(b => b.Moderation == null)
            .Select(b => new PendingBadgeDto
            {
                BadgeId = b.Id,
                Name = b.Name,
                Description = b.Description,
                RequiredPlayTime =  b.RequiredPlayTime,
                UploadedAt = b.UploadedAt,
                GameId = b.GameId,
                GameTitle = b.Game.Title
            })
            .ToListAsync();
    }
}