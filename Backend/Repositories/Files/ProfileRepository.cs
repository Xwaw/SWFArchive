using System.Net.Mime;
using Backend.Enums;
using Backend.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Files;

public class ProfileRepository
{
    private AppIdentityDbContext _context;
    
    public ProfileRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public async Task<string?> GetUserImageUrl(Guid userId, FileUsageType usageType)
    {
        return await _context.Files.Where(f => f.OwnerId == userId && f.UsageType == usageType)
            .Select(f => f.Url).
            FirstOrDefaultAsync();
    }

    public string? GetProfileDescription(Guid userId)
    {
        return _context.UserProfiles
            .Where(p => p.UserId == userId.ToString())
            .Select(p => p.Description)
            .FirstOrDefault();
    }
}