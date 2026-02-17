using System.Security.Claims;
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

    public async Task<string?> GetDescriptionForUser(Guid id)
    {
        return await _context.UserProfiles.Where(u => u.Id == id).Select(u => u.Description).FirstOrDefaultAsync();
    }

    public async Task<UserProfile?> GetUserProfile(Guid id)
    {
        return await _context.UserProfiles.FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<ICollection<UserBadge>?> GetUserBadges(Guid id)
    {
        return await _context.UserProfiles.Where(u => u.Id == id).Select(u => u.UserBadges).FirstOrDefaultAsync();
    }
}