using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Library;
using Backend.Models.User;
using Backend.Repositories.Archive;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Library;

public class LibraryService
{
    private readonly UserManager<User> _userManager;
    private readonly ArchiveRepository _archiveRepository;
    private readonly AppIdentityDbContext _context;

    public LibraryService(UserManager<User> userManager, AppIdentityDbContext context, ArchiveRepository archiveRepository)
    {
        _userManager = userManager;
        _context = context;
        _archiveRepository = archiveRepository;
    }

    public async Task<bool> AddGameToLibrary(ClaimsPrincipal principal, Guid gameGuid)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) return false;

        var game = await _archiveRepository.GetArchiveGame(gameGuid);
        if (game == null) return false;
        
        var exists = await _context.UserGames.AnyAsync(ug => ug.GameId == gameGuid && ug.UserId == user.Id);
        if(exists) return false;

        var userGame = new UserGame
        {
            UserId = user.Id,
            GameId = game.Id,
        };
        
        _context.UserGames.Add(userGame);
        await _context.SaveChangesAsync();
        
        return true;
    }
}