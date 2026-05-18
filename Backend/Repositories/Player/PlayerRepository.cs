using Backend.Enums;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Player;

public class PlayerRepository
{
    private AppIdentityDbContext _context;
    
    public PlayerRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public async Task<string?> GetUrlByGameId(Guid gameId)
    {
        return await _context.Files.Where(f => f.OwnerId == gameId && f.UsageType == FileUsageType.FlashFile).Select(g => g.Url).FirstOrDefaultAsync();
    }
}