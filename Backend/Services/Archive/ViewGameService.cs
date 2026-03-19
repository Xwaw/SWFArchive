using System.Security.Claims;
using Backend.Models;
using Backend.Models.Dto.Archive;
using Backend.Models.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Archive;

public class ViewGameService
{
    private readonly UserManager<User> _userManager;
    private readonly AppIdentityDbContext _context;
    
    public ViewGameService(UserManager<User> userManager, AppIdentityDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }
}