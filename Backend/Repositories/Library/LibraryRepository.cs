using Backend.Enums;
using Backend.Models.Dto.Library;
using Backend.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Library;

public class LibraryRepository
{
    private AppIdentityDbContext _context;
    
    public LibraryRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public async Task<List<UserGame>> GetLibraryGames(string userId)
    {
        return await _context.UserGames
            .Where(g => g.UserId == userId)
            .Include(ug => ug.Game)
            .ToListAsync();
    }

    public async Task<ViewLibraryGameDto?> GetLibraryViewGame(string userId, Guid gameId)
    {
        return await _context.UserGames.Where(ug => ug.GameId == gameId && ug.UserId == userId).Select(ug => new ViewLibraryGameDto
        {
            Id = ug.GameId,
            Title = ug.Game.Title,
            Description = ug.Game.Description,
            ThumbnailUrl = _context.Files
                .Where(f => f.OwnerId == ug.GameId && f.UsageType == FileUsageType.Thumbnail)
                .Select(f => f.Url)
                .FirstOrDefault(),
            LastPlayed = ug.LastPlayed
        }).FirstOrDefaultAsync();
    }

    public async Task<PlayLibraryGameDto?> GetGameToPlay(string userId, Guid gameId)
    {
        var swf = await _context.Files
            .Where(f => f.OwnerId == gameId &&
                        f.UsageType == FileUsageType.FlashFile)
            .Select(f => f.Url)
            .FirstOrDefaultAsync();

        if (swf == null)
            return null;

        return new PlayLibraryGameDto
        {
            GameId = gameId,
            UserId = userId,
            SwfUrl = swf
        };
    }

    public async Task<bool> CheckGameOwnership(string userId, Guid gameId)
    {
        return await _context.UserGames.AnyAsync(g => g.UserId == userId && gameId == g.GameId);
    }
}