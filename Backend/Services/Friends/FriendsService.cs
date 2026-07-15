using Backend.Enums;
using Backend.Models.Dto.Archive;
using Backend.Models.Dto.Friend;
using Backend.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Friends;

public class FriendsService
{
    private readonly UserManager<User> _userManager;
    private readonly AppIdentityDbContext _context;

    public FriendsService(UserManager<User> userManager, AppIdentityDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<PaginationResultDto<FriendUserViewDto>> GetUsersByUsername(string username)
    {
        var users = await _userManager.Users.Where(u => u.UserName != null && u.UserName.StartsWith(username)).Select(u => new FriendUserViewDto
        {
            Id = u.Id,
            Username = u.UserName
        }).ToListAsync();

        return new PaginationResultDto<FriendUserViewDto>
        {
            Items = users,
            Page = 1,
            PageSize = 10,
            Total = users.Count / 10
        };
    }
}