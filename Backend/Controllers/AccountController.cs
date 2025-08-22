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
        return Ok(new { message = "User created" });
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

    [HttpGet("get-account")]
    public async Task<IActionResult> GetAccount()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        return Ok(new { userName = user.UserName, user.Email });
    }
}