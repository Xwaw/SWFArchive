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
    private readonly AccountService _accountService;
    private readonly ArchiveService _archiveService;
    private readonly ViewGameService _viewGameService;
    public ArchiveController(ArchiveService archiveService, ViewGameService viewGameService, AccountService accountService)
    {
        _archiveService = archiveService;
        _viewGameService = viewGameService;
        _accountService = accountService;
    }

    [HttpGet]
    public async Task<IActionResult> GetArchive([FromQuery] ArchiveQueryDto query)
    {
        var archive = await _archiveService.GetArchive(query);
        return Ok(archive);
    }

    [Authorize]
    [HttpPost("upload/game")]
    public async Task<IActionResult> UploadGame([FromForm] UploadGameDto dto)
    {
        await _archiveService.UploadNewGame(User, dto);

        return Ok();
    }

    [HttpGet("data/{id}")]
    public async Task<ActionResult<GameInfoDto>> ViewGame([FromRoute] Guid id)
    {
        var result = await _archiveService.GetGameInfo(id);
        if (result == null)
            return NotFound("Game not found");
        
        return Ok(result);
    }
}