using System.Security.Claims;
using Backend.Enums;
using Backend.Models.BadgeEntity;
using Backend.Models.Dto;
using Backend.Models.Dto.Badge;
using Backend.Models.User;
using Backend.Repositories.Badge;
using Backend.Services.FileSystem;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Badge;

public class BadgeService
{
    private readonly UserManager<User> _userManager;
    private readonly FileStorageService _fileStorageService;
    private readonly BadgeRepository _badgeRepository;
    private readonly FileRepository _fileRepository;

    public BadgeService(
        UserManager<User> userManager,
        FileStorageService fileStorageService,
        BadgeRepository badgeRepository,
        FileRepository fileRepository)
    {
        _userManager = userManager;
        _fileStorageService = fileStorageService;
        _badgeRepository = badgeRepository;
        _fileRepository = fileRepository;
    }

    public async Task UploadBadge(
    UploadBadgeDto uploadBadgeDto,
    ClaimsPrincipal principal)
{

    var user = await _userManager.GetUserAsync(principal);

    if (user == null)
        return;
    
    if (uploadBadgeDto.Gif.Length == 0 || uploadBadgeDto.Gif.Length > FileSizeLimits.GetMaxFileSizeLimit(FileUsageType.Badge))
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

    _badgeRepository.AddBadge(badge);

    var badgePath = await _fileStorageService.SaveBadgeFile(
        badge.Id,
        uploadBadgeDto.Gif
    );

    if (badgePath == null)
    {
        _badgeRepository.RemoveBadge(badge);
        return;
    }

    var file = new FileTarget
    {
        Url = badgePath,
        OwnerType = FileOwnerType.Badge,
        UsageType = FileUsageType.Badge,
        OwnerId = badge.Id,
    };

    await _fileRepository.AddFileAsync(file);
}

    public async Task<bool> AcceptBadge(
        Guid badgeId,
        ClaimsPrincipal principal)
    {
        Console.WriteLine($"BADGE ID: {badgeId}");

        var user = await _userManager.GetUserAsync(principal);

        Console.WriteLine($"USER: {user?.Id ?? "NULL"}");

        if (user == null)
            return false;

        var badge = await _badgeRepository.GetPendingBadge(badgeId);

        Console.WriteLine($"BADGE: {(badge == null ? "NULL" : badge.Id)}");

        if (badge == null)
            return false;

        badge.Moderation = new BadgeModeration
        {
            BadgeId = badge.Id,
            ModeratorId = user.Id,
            Result = BadgeModerationResult.Accepted
        };

        await _badgeRepository.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RejectBadge(
        RejectionBadgeDto rejectionBadgeDto,
        ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);

        if (user == null)
            return false;

        var badge = await _badgeRepository.GetBadge(
            rejectionBadgeDto.BadgeId
        );

        if (badge == null)
            return false;

        if (badge.Moderation != null)
            return false;

        badge.Moderation = new BadgeModeration
        {
            BadgeId = badge.Id,
            Reason = rejectionBadgeDto.Reason,
            ModeratorId = user.Id,
            Result = BadgeModerationResult.Rejected
        };

        await _badgeRepository.SaveChangesAsync();

        return true;
    }

    public async Task<List<PendingBadgeDto>> GetPendingBadges()
    {
        return await _badgeRepository.GetPendingBadges();
    }

    public async Task<bool> AddBadgeToUser(
        Guid badgeId,
        ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);

        if (user == null)
            return false;

        var badge = await _badgeRepository.GetBadge(badgeId);

        if (badge == null)
            return false;

        if (badge.Moderation?.Result != BadgeModerationResult.Accepted)
            return false;

        var alreadyOwned = await _badgeRepository.UserHasBadge(
            user.Id,
            badgeId
        );

        if (alreadyOwned)
            return true;

        var userBadge = new UserBadge
        {
            UserId = user.Id,
            BadgeId = badgeId,
        };

        await _badgeRepository.AddUserBadge(userBadge);
        await _badgeRepository.SaveChangesAsync();

        return true;
    }
}