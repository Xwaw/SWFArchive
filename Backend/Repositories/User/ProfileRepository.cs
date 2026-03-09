using Backend.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.User;

public class ProfileRepository
{
    private readonly AppIdentityDbContext _context;

    public ProfileRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public async Task<string?> GetDescriptionForUser(Guid userId)
    {
        return await _context.UserProfiles
            .Where(p => p.UserId == userId.ToString())
            .Select(p => p.Description)
            .FirstOrDefaultAsync();
    }

    public async Task<DateTime?> GetCreatedAtDate(Guid userId)
    {
        return await _context.UserProfiles.Where(p => p.UserId == userId.ToString()).Select(p => p.CreatedAt).FirstOrDefaultAsync();
    }

    public async Task<UserProfile?> GetUserProfile(Guid userId)
    {
        return await _context.UserProfiles
            .FirstOrDefaultAsync(p => p.UserId == userId.ToString());
    }

    public async Task<ICollection<UserBadge>> GetUserBadges(Guid userId)
    {
        return await _context.UserProfiles
            .Where(p => p.UserId == userId.ToString())
            .Select(p => p.UserBadges)
            .FirstOrDefaultAsync() ?? new List<UserBadge>();
    }
}