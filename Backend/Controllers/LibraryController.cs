using Backend.Models;
using Backend.Models.Dto.Archive;
using Backend.Models.Dto.Library;
using Backend.Models.User;
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
    [HttpPut("add/{gameId}")]
    public async Task<IActionResult> AddGameToLibrary([FromRoute] Guid gameId)
    {
        var result = await _libraryService.AddGameToLibrary(User, gameId);
        
        if(!result)
            return BadRequest("Failed to add game to library");
        
        return Ok("Successfully added game to library");
    }

    [Authorize]
    [HttpGet("{userId}")]
    public async Task<ActionResult<PaginationResultDto<LibraryGameDto>>> GetLibraryGames([FromRoute] string userId)
    {
        try
        {
            var result = await _libraryService.GetLibraryGames(User, userId);
            return Ok(result);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [Authorize]
    [HttpGet("view/{gameId}")]
    public async Task<ActionResult<ViewLibraryGameDto>> GetLibraryGame([FromRoute] Guid gameId)
    {
        var result = await _libraryService.GetLibraryGame(User, gameId);

        if (result == null)
            return NotFound("Game not found");
        
        return Ok(result);
    }

    [Authorize]
    [HttpPost("play/{gameId}")]
    public async Task<ActionResult<PlayLibraryGameDto>> CreateGameSession([FromRoute] Guid gameId)
    {
        var result = await _libraryService.GetPlayLibraryGame(User, gameId);
        
        if(result == null)
            return NotFound("Game not found");
        
        return Ok(result);
    }
}