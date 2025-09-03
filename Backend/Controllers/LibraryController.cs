using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class LibraryController : ControllerBase
{
    private UserManager<User> _userManager;
    private AppIdentityDbContext _context;
    
    public LibraryController(UserManager<User> userManager, AppIdentityDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpGet("number-games")]
    public async Task<IActionResult> GetNumberGames()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var games = await _context.Games
            .Where(g => g.Id == user.Id)
            .ToListAsync();

        return Ok(new { count = games.Count });
    }
}