using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    
    private record AccInfoDto(string Id, string? Username, string? Email);
    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterAccount register)
    {
        var user = new AppUser { UserName = register.Username, Email = register.Email };
        var result = await _userManager.CreateAsync(user, register.Password);
        if (!result.Succeeded) return BadRequest(result.Errors.Select(e => e.Description));
        await _userManager.AddToRoleAsync(user, "User");
        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUser login)
    {
        var result = await _signInManager.PasswordSignInAsync(login.Username, login.Password, true, false);
        if (!result.Succeeded) return Unauthorized();
        return Ok(new { message = "Logged in" });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { message = "Logged out" });
    }
    
    [HttpGet("info")]
    public async Task<IActionResult> GetAccount()
    {
        if (!_signInManager.IsSignedIn(User))
            return Unauthorized();
        
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return NotFound();
        
        var accInfoDto = new AccInfoDto(user.Id, user.UserName, user.Email);
        return Ok( accInfoDto );
    }
    
    [HttpPost("avatar")] // just test, in future need to change
    public async Task<IActionResult> UploadAvatar(IFormFile file)
    {
        if (file == null || file.Length == 0) return BadRequest("No file");

        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var filePath = Path.Combine("wwwroot/avatars", $"{user.Id}.png");
        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        user.AvatarUrl = $"/avatars/{user.Id}.png";
        await _userManager.UpdateAsync(user);

        return Ok(new { avatarUrl = user.AvatarUrl });
    }
}