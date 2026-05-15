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
    [HttpPut("add/{id}")]
    public async Task<IActionResult> AddGameToLibrary([FromRoute] Guid id)
    {
        var result = await _libraryService.AddGameToLibrary(User, id);
        
        if(!result)
            return BadRequest("Failed to add game to library");
        
        return Ok("Successfully added game to library");
    }
}