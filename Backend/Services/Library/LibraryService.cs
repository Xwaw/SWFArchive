using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Library;
using Backend.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Library;

public class LibraryService
{
    private readonly UserManager<User> _userManager;
    private readonly AppIdentityDbContext _context;

    public LibraryService(UserManager<User> userManager, AppIdentityDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<bool> AddGameFromArchive(Guid gameId, ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) 
            return false;
        
        var alreadyAdded = await _context.UserGames.AnyAsync(x => x.GameId == gameId && x.UserId == user.Id);
        if (alreadyAdded) 
            return true;
        
        var game = new UserGame
        {
            UserId = user.Id,
            GameId = gameId,
        };
        
        _context.UserGames.Add(game);
        await _context.SaveChangesAsync();
        
        return true;
    }
    public async Task<List<LibraryGameDto>?> GetUserGames(ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) 
            return null;

        var userGames = await _context.UserGames.Where(x => x.UserId == user.Id).Include(userGame => userGame.Game).ToListAsync();

        return userGames.Select(game => new LibraryGameDto { Title = game.Game.Title, AuthorName = game.Game.AuthorName, SwfUrl = game.Game.SwfUrl, }).ToList();
    }
}