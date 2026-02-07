
using System.Security.Claims;
using Backend.Authorization;
using Backend.Models;
using Backend.Models.User;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Role;

public class RoleService
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly SignInManager<User> _signInManager;
    
    public RoleService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _signInManager = signInManager;
    }
    
    public async Task<bool> ReplaceUserRole(string userId, string roleName)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if(user == null) throw new Exception("User not found");
        
        var roleIsExist = await _roleManager.RoleExistsAsync(roleName);
        if(!roleIsExist)
            throw new Exception("Role doesn't exist");
        
        var isHasRole = await _userManager.IsInRoleAsync(user, roleName);
        if(isHasRole)
            return false;
        
        await ResetUserRoles(user.Id);
        await _userManager.AddToRoleAsync(user, roleName);
        await _signInManager.RefreshSignInAsync(user);

        return true;
    }

    public async Task<bool> AddRoleToUser(string userId, string roleName)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if(user == null) throw new Exception("User not found");
        
        var roleIsExist = await _roleManager.RoleExistsAsync(roleName);
        if(!roleIsExist)
            throw new Exception("Role doesn't exist");
        
        var isHasRole = await _userManager.IsInRoleAsync(user, roleName);
        if(isHasRole)
            return false;
        
        await _userManager.AddToRoleAsync(user, roleName);
        await _signInManager.RefreshSignInAsync(user);
        return true;
    }

    public async Task<IList<string>> GetUserRole(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) throw new Exception("User not found");
        
        return await _userManager.GetRolesAsync(user);
    }

    public async Task ResetUserRoles(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) throw new Exception("User not found");
        
        var userRoles = await _userManager.GetRolesAsync(user);

        await _userManager.RemoveFromRolesAsync(user, userRoles);
    }
}