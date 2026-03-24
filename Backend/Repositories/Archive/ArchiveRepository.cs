using Backend.Models;
using Backend.Models.Dto.Archive;
using Google;

namespace Backend.Repositories.Archive;

public class ArchiveRepository
{
    private readonly AppIdentityDbContext _context;
    
    public ArchiveRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public List<GameArchive> GetArchive()
    {
        return _context.ArchiveGames.ToList();
    }
}