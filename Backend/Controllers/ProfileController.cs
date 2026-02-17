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
    [HttpGet("owner/{userId}")]
    public async Task<IActionResult> IsOwner(Guid userId)
    {
        var result = await _profileService.IsProfileOwner(User, userId);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("upload/avatar/{userId}")]
    public async Task<IActionResult> UploadAndSaveAvatar(Guid userId, [FromForm] IFormFile file)
    {
        var isOwner = await _profileService.IsProfileOwner(User, userId);
        if(!isOwner)
            return Forbid("The user is not the owner of the profile");

        var url = await _profileService.ReplaceUserImageAsync(userId, file, FileUsageType.Avatar);

        return Ok(url);
    }
    
    [Authorize]
    [HttpPost("upload/banner/{userId}")]
    public async Task<IActionResult> UploadAndSaveBanner(Guid userId, [FromForm] IFormFile file)
    {
        var isOwner = await _profileService.IsProfileOwner(User, userId);
        if(!isOwner)
            return Forbid("The user is not the owner of the profile");

        var url = await _profileService.ReplaceUserImageAsync(userId, file, FileUsageType.Banner);

        return Ok(url);
    }
    
    [Authorize]
    [HttpPost("upload/background/{userId}")]
    public async Task<IActionResult> UploadAndSaveBackground(Guid userId, [FromForm] IFormFile file)
    {
        var isOwner = await _profileService.IsProfileOwner(User, userId);
        if(!isOwner)
            return Forbid("The user is not the owner of the profile");

        var url = await _profileService.ReplaceUserImageAsync(userId, file, FileUsageType.Background);

        return Ok(url);
    }
    
    [Authorize]
    [HttpPatch("description/{userId}")]
    public async Task<IActionResult> UpdateDescription(Guid userId, [FromForm] string description)
    {
        var isOwner = await _profileService.IsProfileOwner(User, userId);
        if(!isOwner)
            return Forbid("The user is not the owner of the profile");

        await _profileService.UpdateDescription(userId, description);

        return Ok(true);
    }
}