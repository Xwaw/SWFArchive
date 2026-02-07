using Backend.Models;
using Backend.Models.Dto.Archive;
using Backend.Services;
using Backend.Services.Archive;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ArchiveController : ControllerBase
{
    private readonly ArchiveService _archiveService;
    private readonly ViewGameService _viewGameService;
    public ArchiveController(ArchiveService archiveService, ViewGameService viewGameService)
    {
        _archiveService = archiveService;
        _viewGameService = viewGameService;
    }

    [HttpGet("game/{id}")] // only for others to view, future: add view for developer of game.
    public async Task<IActionResult> GetGame(Guid id)
    {
        var result = await _viewGameService.GetGameById(id);
        if(result == null) return NotFound("Game not found");
        return Ok(result);
    }

    [Authorize]
    [HttpPost("upload/game")]
    public async Task<IActionResult> UploadGame([FromForm] UploadGameDto uploadedGame)
    {
        var result = await _archiveService.AddGameToArchive(User, uploadedGame);
        if(!result) BadRequest("Error with uploading game");
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetArchive([FromQuery] string? search, [FromQuery] int page = 1)
    {
        var result = await _archiveService.GetArchive(search, page);
        return Ok(result);
    }
}