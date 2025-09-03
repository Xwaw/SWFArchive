using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    
    private record AccInfoDto(string Id, string? Username, string? Email);
    
    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterAccount register)
    {
        var user = new User { UserName = register.Username, Email = register.Email };
        var result = await _userManager.CreateAsync(user, register.Password);
        if (!result.Succeeded) return BadRequest(result.Errors.Select(e => e.Description));
        if (!(await _roleManager.RoleExistsAsync("User")))
        {
            await _roleManager.CreateAsync(new IdentityRole("User"));
        }
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
}