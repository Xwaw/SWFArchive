using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend;

[ApiController]
[Route("[controller]")]
public class UserController(AppDbContext context) : ControllerBase
{

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterUser registeredUser)
    {
        var user = new User()
        {
            Password = registeredUser.Password,
            Username = registeredUser.Username,
            isLogged = false
        };
        
        if(!ModelState.IsValid)
            return BadRequest(new { error = "Invalid user data" });

        try
        {
            context.Users.Add(user);
            context.SaveChanges();
            return Ok(new { message = $"User has been registered. Please Login {user.Username}" });
        }
        catch(Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
    
    [HttpPost("login")]
    public IActionResult Login([FromBody] RegisterUser registeredUser)
    {
        var user = new User()
        {
            Password = registeredUser.Password,
            Username = registeredUser.Username,
            isLogged = false
        };
        
        var loggedUser = context.Users.FirstOrDefault(u => u.Username == user.Username &&  u.Password == user.Password);
        if(loggedUser == null) return Unauthorized();
        loggedUser.isLogged = true;
        context.SaveChanges();
        return Ok(loggedUser);
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var user = context.Users.FirstOrDefault(u => u.isLogged);
        if (user == null) return Unauthorized(new { message = "No user is logged in" });

        user.isLogged = false;
        context.SaveChanges(); 

        return Ok(new { message = $"{user.Username} is logged out" });
    }


    [HttpGet("get-user")]
    public IActionResult GetUser()
    {
        var user = context.Users.FirstOrDefault(u => u.isLogged == true);
        if(user == null) return NotFound();
        if(user.isLogged) return Ok( new { username = user.Username });
        return Unauthorized();
    }
    // ?
}