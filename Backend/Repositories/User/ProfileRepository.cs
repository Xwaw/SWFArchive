using Backend.Enums;
using Backend.Models.BadgeEntity;
using Backend.Models.Dto.User;
using Backend.Models.User;
using Backend.Repositories.Badge;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.User;

public class ProfileRepository
{
    private readonly AppIdentityDbContext _context;
    private readonly FileRepository _fileRepository;

    public ProfileRepository(AppIdentityDbContext context, FileRepository fileRepository)
    {
        _context = context;
        _fileRepository = fileRepository;
    }

    public async Task<string?> GetDescriptionForUser(Guid userId)
    {
        var cachedUserId = userId.ToString();
        
        return await _context.UserProfiles
            .Where(p => p.UserId == cachedUserId)
            .Select(p => p.Description)
            .FirstOrDefaultAsync();
    }

    public async Task<DateTime?> GetCreatedAtDate(Guid userId)
    {
        var cachedUserId = userId.ToString();
        
        return await _context.UserProfiles
            .Where(p => p.UserId == cachedUserId)
            .Select(p => p.CreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task<ProfileDto> GetUserProfile(Guid userId)
    {
        var userIdString = userId.ToString();

        var profile = await _context.UserProfiles
            .Where(p => p.UserId == userIdString)
            .Select(p => new ProfileDto
            {
                ProfileUserId = p.UserId,
                ProfileTitle = p.ProfileTitle 
                               ?? p.User.UserName 
                               ?? "Undefined User",
                Description = p.Description,
                ProfileStatus = p.ProfileStatus,
                CreatedAt = p.CreatedAt
            })
            .FirstOrDefaultAsync();

        if (profile == null)
            return null;

        profile.AvatarUrl = await _fileRepository.GetUserFileUrlAsync(
            userId,
            FileUsageType.Avatar
        );
        profile.BannerUrl = await _fileRepository.GetUserFileUrlAsync(
            userId, 
            FileUsageType.Banner
        );
        profile.BackgroundUrl = await _fileRepository.GetUserFileUrlAsync(
            userId, 
            FileUsageType.Background
        );
        // TODO: Replace with UserBadge system after Prototype
        profile.BadgeViewUrl = "/upload/badges/92937b207611440eb8a409d6425e27cf/b6d16681715445958428c539a625feee.gif";
        

        return profile;
    }
}