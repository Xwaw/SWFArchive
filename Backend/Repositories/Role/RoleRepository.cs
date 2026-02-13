using Backend.Models.User;
using Microsoft.AspNetCore.Identity;

public class RoleRepository
{
    private readonly UserManager<User> _userManager;
    
    public RoleRepository(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
}