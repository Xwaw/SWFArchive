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

    public async Task<List<UserGame>> GetUserGameLibrary(string userId)
    {
        return await _context.UserGames
            .Where(g => g.UserId == userId)
            .Include(ug => ug.Game)
            .ToListAsync();
    }
}