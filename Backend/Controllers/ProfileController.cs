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
    private readonly AccountService _accountService;
    public ProfileController(ProfileService profileService, AccountService accountService)
    {
        _profileService = profileService;
        _accountService = accountService;
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Get()
    {
        var result = await _profileService.GetProfileByPrincipal(User);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetProfile(Guid userId)
    {
        var result = await _profileService.GetProfileByUserId(userId);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("upload/avatar/{userId}")]
    public async Task<IActionResult> UploadAndSaveAvatar(Guid userId, [FromForm] IFormFile file)
    {
        var isOwner = await _accountService.ConfirmUserIsOwner(User, userId);
        if(!isOwner)
            return Forbid("The user is not the owner of the profile");

        var url = await _profileService.ReplaceUserImageAsync(userId, file, FileUsageType.Avatar);

        return Ok(url);
    }
    
    [Authorize]
    [HttpPost("upload/banner/{userId}")]
    public async Task<IActionResult> UploadAndSaveBanner(Guid userId, [FromForm] IFormFile file)
    {
        var isOwner = await _accountService.ConfirmUserIsOwner(User, userId);
        if(!isOwner)
            return Forbid("The user is not the owner of the profile");

        var url = await _profileService.ReplaceUserImageAsync(userId, file, FileUsageType.Banner);

        return Ok(url);
    }
    
    [Authorize]
    [HttpPost("upload/background/{userId}")]
    public async Task<IActionResult> UploadAndSaveBackground(Guid userId, [FromForm] IFormFile file)
    {
        var isOwner = await _accountService.ConfirmUserIsOwner(User, userId);
        if(!isOwner)
            return Forbid("The user is not the owner of the profile");

        var url = await _profileService.ReplaceUserImageAsync(userId, file, FileUsageType.Background);

        return Ok(url);
    }
    
    [Authorize]
    [HttpPatch("upload/description/{userId}")]
    public async Task<IActionResult> UpdateDescription(Guid userId, [FromForm] string description)
    {
        var isOwner = await _accountService.ConfirmUserIsOwner(User, userId);
        if(!isOwner)
            return Forbid("The user is not the owner of the profile");

        await _profileService.UpdateDescription(userId, description);

        return Ok(true);
    }
}