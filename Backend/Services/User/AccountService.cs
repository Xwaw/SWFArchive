using System.Security.Claims;
using Backend.Models.Dto.User;
using Backend.Models.User;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services;

public class AccountService
{
    private UserManager<User> _userManager;

    public AccountService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
    public async Task<UserDto> GetUserDto(ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) throw new Exception("User not found");
        
        var userDto = new UserDto
        {
            Id = user.Id,
            UserName = await _userManager.GetUserNameAsync(user),
            Email = await _userManager.GetEmailAsync(user),
            EmailConfirmed = await _userManager.IsEmailConfirmedAsync(user)
        };
        
        return userDto;
    }
    public async Task<bool> ConfirmUserIsOwner(ClaimsPrincipal principal, Guid userId)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) return false;
        var guid = userId.ToString();
        return guid == user.Id;
    }
}