using System.Security.Claims;
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

    public async Task SendFriendRequest(ClaimsPrincipal principal, string id)
    {
        var userSender = await _userManager.GetUserAsync(principal);
        if(userSender == null) return;
        
        var userReceiver = await _userManager.FindByIdAsync(id);
        if(userReceiver == null) return;
        
        if(userSender.Id == userReceiver.Id) return;
        
        var exists = await _context.FriendRequests.AnyAsync(f =>
            (f.SenderId == userSender.Id && f.ReceiverId == userReceiver.Id) ||
            (f.SenderId == userReceiver.Id && f.ReceiverId == userSender.Id));
        
        if(exists) return;

        var friendInvite = new FriendRequest
        {
            ReceiverId = userReceiver.Id,
            SenderId = userSender.Id,
            Receiver = userReceiver,
            Sender = userSender
        };
        
        _context.FriendRequests.Add(friendInvite);
        
        await _context.SaveChangesAsync();
    }
}