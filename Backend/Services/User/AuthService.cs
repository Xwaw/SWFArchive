using System.Globalization;
using System.Net;
using System.Security.Claims;
using Backend.Authorization;
using Backend.Models;
using Backend.Models.Dto.User;
using Backend.Models.User;
using Backend.Services.Email;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services;

public class AuthService
{
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    
    private readonly GmailSender _gmailSender;
    private readonly EmailTemplateService _emailTemplateService;

    private readonly string? _frontendBaseUrl;
    private readonly AppIdentityDbContext _context;
    
    public AuthService(
        SignInManager<User> signInManager, 
        UserManager<User> userManager, 
        GmailSender gmailSender, 
        IConfiguration config, 
        EmailTemplateService emailTemplateService, AppIdentityDbContext context)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _gmailSender = gmailSender;
        _emailTemplateService = emailTemplateService;
        _context = context;
        _frontendBaseUrl = config["Frontend:BaseUrl"] ?? throw new Exception("Frontend:BaseUrl not configured");
    }
    
    public async Task<IdentityResult> Register(string username, string email, string password)
    {
        var user = new User { UserName = username,  Email = email };
        var result = await _userManager.CreateAsync(user, password);
        if(result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, Roles.User);

            var profile = new UserProfile
            {
                UserId = user.Id,
                Description = user.UserName,
                IsOnline = false,
                CreatedAt = DateTime.Now,
            };
            
            _context.UserProfiles.Add(profile);
            await _context.SaveChangesAsync();
        }
        
        return result;
    }

    public async Task<SignInResult> Login(string email, string password, bool rememberMe = false)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if(user == null)
            return SignInResult.Failed;
        
        return await _signInManager.PasswordSignInAsync(user.UserName!, password, rememberMe, false);
    }

    public Task LogOut()
    {
        return _signInManager.SignOutAsync();
    }

    private string BuildResetLink(string token, string email)
    {
        var encodedToken = WebUtility.UrlEncode(token);
        var encodedEmail = WebUtility.UrlEncode(email);
        return $"{_frontendBaseUrl}/auth/reset?token={encodedToken}&email={encodedEmail}";
    }

    private string BuildConfirmMailLink(string token, string email)
    {
        var encodedToken = WebUtility.UrlEncode(token);
        var encodedEmail = WebUtility.UrlEncode(email);
        return $"{_frontendBaseUrl}/auth/confirm?token={encodedToken}&email={encodedEmail}";
    }

    public async Task SendResetPasswordLink(string userEmail)
    {
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null) return;
        
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var resetUrl = BuildResetLink(token, userEmail);
        
        await _gmailSender.SendResetPasswordMail(userEmail, user.UserName!, resetUrl);
    }

    public async Task<bool> ResetPassword(string email, string token, string newPassword)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return false;
        
        var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
        
        if(result.Succeeded)
            await _userManager.UpdateSecurityStampAsync(user);
        
        return result.Succeeded;
    }

    public async Task<bool> ChangePassword(ClaimsPrincipal principal, string oldPassword, string newPassword)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) return false;
        var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
        
        if(result.Succeeded)
            await _userManager.UpdateSecurityStampAsync(user);
        
        return result.Succeeded;
    }

    public async Task SendConfirmEmailLink(string userEmail)
    {
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null) return;

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var confirmUrl = BuildConfirmMailLink(token, userEmail);

        await _gmailSender.SendConfirmMail(userEmail, confirmUrl);
    }

    public async Task<bool> ConfirmMail(string email, string token)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if(user == null) return false;

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (result.Succeeded)
            await _userManager.UpdateSecurityStampAsync(user);
        return result.Succeeded;
    }
}