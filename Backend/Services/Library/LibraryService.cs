using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Archive;
using Backend.Models.Dto.Library;
using Backend.Models.User;
using Backend.Repositories.Archive;
using Backend.Repositories.Library;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Library;

public class LibraryService
{
    private readonly UserManager<User> _userManager;
    private readonly ArchiveRepository _archiveRepository;
    private readonly LibraryRepository _libraryRepository;
    private readonly AppIdentityDbContext _context;

    public LibraryService(UserManager<User> userManager, AppIdentityDbContext context, ArchiveRepository archiveRepository, LibraryRepository libraryRepository)
    {
        _userManager = userManager;
        _context = context;
        _archiveRepository = archiveRepository;
        _libraryRepository = libraryRepository;
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

    public async Task<PaginationResultDto<LibraryGameDto>> GetLibraryGames(ClaimsPrincipal principal, string userId)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null)
        {
            return new PaginationResultDto<LibraryGameDto>
            {
                Items = [],
                PageSize = 0,
                Page = 1,
            };
        }
        
        var isOwner = user.Id == userId;
        if (!isOwner)
            throw new UnauthorizedAccessException();

        var userGames = await _libraryRepository.GetLibraryGames(user.Id);

        var libraryGames = userGames.Select(g => new LibraryGameDto
        {
            Id = g.Game.Id,
            Title = g.Game.Title,
            Thumbnail = _archiveRepository.GetGameThumbnail(g.Game.Id),
        }).ToList();

        return new PaginationResultDto<LibraryGameDto>
        {
            Items = libraryGames,
            Total = 10,
            Page = 1,
        };
    }

    public async Task<ViewLibraryGameDto?> GetLibraryGame(ClaimsPrincipal principal, Guid gameId)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null)
            return null;

        return await _libraryRepository.GetLibraryViewGame(user.Id, gameId);
    }

    public async Task<PlayLibraryGameDto?> GetPlayLibraryGame(ClaimsPrincipal principal, Guid gameId)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null)
            return null;

        var isGameOwner = await _libraryRepository.CheckGameOwnership(user.Id, gameId);
        if (!isGameOwner) 
            return null;

        return await _libraryRepository.GetGameToPlay(user.Id, gameId);
    }
}