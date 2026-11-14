using System.Security.Claims;
using Backend.Models.Dto.User;
using Backend.Models.User;
using Backend.Repositories.User;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services;

public class AccountService
{
    private UserManager<User> _userManager;
    private ProfileRepository _profileRepository;

    public AccountService(UserManager<User> userManager, ProfileRepository profileRepository)
    {
        _userManager = userManager;
        _profileRepository = profileRepository;
    }
    public async Task<UserDto> GetUserDto(ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) throw new Exception("User not found");
        
        Guid userGuid = Guid.Parse(user.Id);
        
        var userDto = new UserDto
        {
            Id = user.Id,
            UserName = await _userManager.GetUserNameAsync(user),
            Email = await _userManager.GetEmailAsync(user),
            EmailConfirmed = await _userManager.IsEmailConfirmedAsync(user),
            Profile = await _profileRepository.GetUserProfile(userGuid)
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