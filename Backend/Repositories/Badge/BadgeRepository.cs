using Backend.Models.BadgeEntity;
using Backend.Models.Dto.Badge;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Badge;

public class BadgeRepository
{
    private readonly AppIdentityDbContext _context;

    public BadgeRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CanUploadBadge(Guid gameId, string userId)
    {
        return await _context.ArchiveGames
            .AnyAsync(g =>
                g.Id == gameId &&
                g.PlaysCount >= 100 &&
                g.OwnerId == userId);
    }

    public async Task<Models.BadgeEntity.Badge?> GetPendingBadge(Guid badgeId)
    {
        return await _context.Badges
            .FirstOrDefaultAsync(b => b.Id == badgeId);
    }

    public async Task<Models.BadgeEntity.Badge?> GetBadge(Guid badgeId)
    {
        return await _context.Badges
            .Include(b => b.Moderation)
            .FirstOrDefaultAsync(b => b.Id == badgeId);
    }

    public async Task<List<PendingBadgeDto>> GetPendingBadges()
    {
        return await _context.Badges
            .Where(b => b.Moderation == null)
            .Select(b => new PendingBadgeDto
            {
                BadgeId = b.Id,
                Name = b.Name,
                Description = b.Description,
                RequiredPlayTime = b.RequiredPlayTime,
                UploadedAt = b.UploadedAt,
                GameId = b.GameId,
                GameTitle = b.Game.Title
            })
            .ToListAsync();
    }

    public void AddBadge(Models.BadgeEntity.Badge badge)
    {
        _context.Badges.Add(badge);
    }
    
    public async Task<bool> UserHasBadge(
        string userId,
        Guid badgeId)
    {
        return await _context.UserBadges
            .AnyAsync(ub =>
                ub.UserId == userId &&
                ub.BadgeId == badgeId);
    }

    public async Task AddUserBadge(UserBadge userBadge)
    {
        await _context.UserBadges.AddAsync(userBadge);
    }

    public void RemoveBadge(Models.BadgeEntity.Badge badge)
    {
        _context.Badges.Remove(badge);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}