using Backend.Repositories.Player;
using Backend.Services.Player;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class PlayerController : ControllerBase
{
    private PlayerService _playerService;
    
    public PlayerController(PlayerService playerService)
    {
        _playerService = playerService;
    }
    
    [Authorize]
    [HttpGet("get-{gameId}")]
    public async Task<IActionResult> GetGameUrl([FromRoute] Guid gameId)
    {
        var result = await _playerService.GetGameUrl(gameId);
        
        if(result == null)
            return NotFound("Game not found");

        return Ok(result);
    }
}