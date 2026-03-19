using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Library;
using Backend.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Library;

public class LibraryService
{
    private readonly UserManager<User> _userManager;
    private readonly AppIdentityDbContext _context;

    public LibraryService(UserManager<User> userManager, AppIdentityDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }
}