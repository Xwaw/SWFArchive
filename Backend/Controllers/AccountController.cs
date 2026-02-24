using Backend.Models;
using Backend.Models.Dto.Email;
using Backend.Models.Dto.User;
using Backend.Models.UserModel;
using Backend.Services;
using Backend.Services.Role;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly AccountService _accountService;
    public AccountController(AuthService authService, AccountService accountService)
    {
        _authService = authService;
        _accountService = accountService;
    }
    
    [HttpGet("status")]
    public IActionResult GetAuthStatus()
    {
        return Ok(User.Identity?.IsAuthenticated ?? false);
    }
   
    [Authorize]
    [HttpGet("me")]
    public async Task <ActionResult<UserDto>> GetUserInfo()
    {
        var user = await _accountService.GetUserDto(User);
        return Ok(user);
    }

    [Authorize]
    [HttpGet("is-yours/{userId}")]
    public async Task <ActionResult<bool>> IsAccountOwner(Guid userId)
    {
        var result = await _accountService.ConfirmUserIsOwner(User, userId);
        
        return Ok(result);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> LoginUser([FromBody] LoginDto dto)
    {
        if(User.Identity!.IsAuthenticated) return Conflict("User is already logged in");
        
        var result = await _authService.Login(dto.Email, dto.Password, dto.RememberMe);
        if (!result.Succeeded) return Unauthorized("Invalid email or password");
        
        return Ok(new {message = "Login Successful"});
    }
    
    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> LogoutUser()
    {
        await _authService.LogOut();
        return Ok(new {message = "Logout Successful"});
    }
    
    [HttpPut("register")]
    public async Task<IActionResult> CreateAndRegisterUser([FromBody] RegisterDto dto)
    {
        if(User.Identity!.IsAuthenticated) return Conflict("User is already logged in");

        var result = await _authService.Register(dto.UserName, dto.Email, dto.Password);
        if(!result.Succeeded) return BadRequest(result.Errors);
        
        return Ok(new {message = "Registration Successful"});
    }
    
    //passwords
    [Authorize]
    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var result = await _authService.ChangePassword(User, dto.OldPassword, dto.NewPassword); // need sending email
        if(!result) return BadRequest("Something went wrong");
        return Ok("Password changed successfully");
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        await _authService.SendResetPasswordLink(dto.Email);
            
        return Ok();
    }

    [HttpPut("reset-password")]
    public async Task<IActionResult> ResetPassword([FromQuery] string token, [FromQuery] string email, [FromBody] ResetPasswordDto dto)
    {
        var result = await _authService.ResetPassword(email, token, dto.NewPassword);
        if (!result)
            return BadRequest("Invalid or expired reset link");
        return Ok();
    }
    
    //emails

    [HttpPost("confirm/send")]
    public async Task<IActionResult> SendConfirmMail([FromBody] SendConfirmLinkDto dto)
    {
        await _authService.SendConfirmEmailLink(dto.Email);
        
        return Ok();
    }
    
    [HttpPost("confirm/email")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string token, [FromQuery] string email)
    {
        var result = await _authService.ConfirmMail(email, token);
        if (!result)
            return BadRequest("Invalid or expired reset link");
        return Ok();
    }
}