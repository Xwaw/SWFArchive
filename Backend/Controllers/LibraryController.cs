using Backend.Models;
using Backend.Services.Library;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend;

[Authorize]
[ApiController]
[Route("[controller]")]
public class LibraryController : ControllerBase
{
    private LibraryService _libraryService;
    public LibraryController(LibraryService libraryService)
    {
        _libraryService = libraryService;
    }

    [Authorize]
    [HttpPost("add/{id}")]
    public async Task<IActionResult> AddGame(Guid id)
    {
        var result = await _libraryService.AddGameFromArchive(id, User);
        if(!result)
            return BadRequest("Error adding game to library");
        
        return Ok("Success adding game to library");
    }

    [Authorize]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllGames()
    {
        var games = await _libraryService.GetUserGames(User);
        return Ok(games);
    }
}