using System.Security.Claims;
using Backend.Models;
using Backend.Models.Dto.Archive;
using Backend.Models.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Archive;

public class ViewGameService
{
    private readonly UserManager<User> _userManager;
    private readonly AppIdentityDbContext _context;
    
    public ViewGameService(UserManager<User> userManager, AppIdentityDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<GameViewDto?> GetGameById(Guid id)
    {
        var game = await _context.ArchiveGames.FirstOrDefaultAsync(g => g.Id == id);
        if(game == null) return null;
        return new GameViewDto
        {
            Id = game.Id,
            Title = game.Title,
            AuthorName = game.AuthorName,
            ThumbnailUrl = game.ThumbnailUrl,
            Description = game.Description,

            StarsRated = game.StarsRated,
            PlaysCount = game.PlaysCount,

            Uploaded = game.Uploaded,
            Modified = game.Modified,
            
            Tags = game.Tags
        };
    }
}