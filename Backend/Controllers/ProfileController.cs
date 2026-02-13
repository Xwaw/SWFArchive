using Backend.Enums;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend;

[ApiController]
[Route("[controller]")]
public class ProfileController : ControllerBase
{
    private readonly ProfileService _profileService;
    public ProfileController(ProfileService profileService)
    {
        _profileService = profileService;
    }

    [Authorize]
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetProfile(Guid userId)
    {
        var result = await _profileService.GetProfileByUser(userId);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("avatar/{userId}")]
    public async Task<IActionResult> UploadAndSaveAvatar(string userId, [FromForm] IFormFile file)
    {
        var isOwner = await _profileService.IsProfileOwner(User, userId);
        if(!isOwner)
            return StatusCode(403);

        var url = await _profileService.ReplaceUserImageAsync(Guid.Parse(userId), file, FileUsageType.Avatar);

        return Ok(url);
    }
    
    [Authorize]
    [HttpPost("banner/{userId}")]
    public async Task<IActionResult> UploadAndSaveBanner(string userId, [FromForm] IFormFile file)
    {
        var isOwner = await _profileService.IsProfileOwner(User, userId);
        if(!isOwner)
            return StatusCode(403);

        var url = await _profileService.ReplaceUserImageAsync(Guid.Parse(userId), file, FileUsageType.Banner);

        return Ok(url);
    }
}