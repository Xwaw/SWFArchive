using Backend.Models.Dto.Badge;
using Backend.Services.Badge;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class BadgeController : ControllerBase
{
    private readonly BadgeService _badgeService;

    public BadgeController(BadgeService badgeService)
    {
        _badgeService = badgeService;
    }

    [Authorize]
    [HttpPost("upload")]
    public async Task<IActionResult> UploadBadge([FromForm] UploadBadgeDto uploadBadgeDto)
    {
        await _badgeService.UploadBadge(uploadBadgeDto, User);
        return Ok("Badge uploaded");
    }
    
    [Authorize(Policy = "ModerateBadges")]
    [HttpPost("accept/{badgeId}")]
    public async Task<IActionResult> AcceptBadge(Guid badgeId)
    {
        var result = await _badgeService.AcceptBadge(badgeId, User);
        if(!result)
            return BadRequest("Badge not accepted");
        
        return Ok("Badge accepted");
    }
    
    [Authorize(Policy = "ModerateBadges")]
    [HttpPost("reject")]
    public async Task<IActionResult> RejectBadge([FromBody] RejectionBadgeDto rejectionBadgeDto)
    {
        var result = await _badgeService.RejectBadge(rejectionBadgeDto, User);
        if(!result)
            return BadRequest("Badge cannot be rejected");
        
        return Ok("Badge Rejected");
    }
    
    [Authorize(Policy = "ModerateBadges")]
    [HttpGet("pending")]
    public async Task<IActionResult> GetPendingBadges()
    {
        return Ok(await _badgeService.GetPendingBadges());
    }
    
    [Authorize(Policy = "ModerateBadges")]
    [HttpGet("{badgeId}")]
    public async Task<IActionResult> GetBadge(Guid badgeId)
    {
        throw new NotImplementedException();
    }
    
    // add function "GetBadges" for user and archive game
}