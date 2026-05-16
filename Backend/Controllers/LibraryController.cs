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
    public async Task<ActionResult<PaginationResultDto<LibraryGameDto>>> GetUserLibrary([FromRoute] string userId)
    {
        var result = await _libraryService.GetUserLibrary(User, userId);

        return Ok(result);
    }
}