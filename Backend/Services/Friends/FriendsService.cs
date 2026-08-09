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

    public async Task<bool> SendFriendRequest(ClaimsPrincipal principal, string id)
    {
        var userSender = await _userManager.GetUserAsync(principal);
        if(userSender == null) return false;
        
        var userReceiver = await _userManager.FindByIdAsync(id);
        if(userReceiver == null) return false;

        if (userSender.Id == userReceiver.Id) return false;
        
        var exists = await _context.FriendRequests.AnyAsync(f =>
            (f.SenderId == userSender.Id && f.ReceiverId == userReceiver.Id) ||
            (f.SenderId == userReceiver.Id && f.ReceiverId == userSender.Id));
        
        if(exists) return false;

        var friendInvite = new FriendRequest
        {
            ReceiverId = userReceiver.Id,
            SenderId = userSender.Id,
            Receiver = userReceiver,
            Sender = userSender
        };
        
        _context.FriendRequests.Add(friendInvite);
        
        await _context.SaveChangesAsync();
        
        return true;
    }

    public async Task<List<FriendRequestDto>> GetUserFriendRequests(ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return [];

        var userRequest = await _context.FriendRequests.Where(fr => fr.ReceiverId == user.Id).Select(fr =>
            new FriendRequestDto
            {
                Id = fr.Id,
                ReceiverId = fr.ReceiverId,
                SenderId = fr.SenderId,
                SenderUsername = fr.Sender.UserName
            }).ToListAsync();
        
        return userRequest;
    }

    public async Task<bool> AcceptRequest(ClaimsPrincipal principal, Guid requestId)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) return false;

        var request = await _context.FriendRequests
            .FirstOrDefaultAsync(fr => fr.Id == requestId && fr.ReceiverId == user.Id);

        if (request == null) return false;

        var isFriendshipExist = await _context.Friendships.AnyAsync(fr =>
            (fr.UserId == request.ReceiverId && fr.FriendId == request.SenderId) ||
            (fr.UserId == request.SenderId && fr.FriendId == request.ReceiverId));

        if (isFriendshipExist)
        {
            _context.FriendRequests.Remove(request);
            await _context.SaveChangesAsync();
            return false;
        }

        var conversation = new Conversation();

        await _context.Conversations.AddAsync(conversation);

        await _context.Friendships.AddRangeAsync(
            new Friendship
            {
                UserId = request.ReceiverId,
                FriendId = request.SenderId,
                Conversation = conversation
            },
            new Friendship
            {
                UserId = request.SenderId,
                FriendId = request.ReceiverId,
                Conversation = conversation
            });

        _context.FriendRequests.Remove(request);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DenyRequest(ClaimsPrincipal principal, Guid requestId)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return false;
        
        var request = await _context.FriendRequests.FirstOrDefaultAsync(fr => fr.Id == requestId && fr.ReceiverId == user.Id);
        if(request == null) return false;
        
        _context.FriendRequests.Remove(request);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<FriendshipViewDto>> GetFriendships(ClaimsPrincipal principal)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null) return [];

        return await _context.Friendships
            .Where(f => f.UserId == user.Id)
            .Select(f => new FriendshipViewDto
            {
                friendId = f.FriendId,
                conversationId = f.ConversationId,
                friendUsername = f.Friend.UserName
            })
            .ToListAsync();
    }

    public async Task<List<MessageDto>> GetConversationMessages(Guid conversationId)
    {
        var messages = await _context.Messages
            .Include(m => m.Sender)
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.Created)
            .ToListAsync();

        return messages.Select(m => new MessageDto
        {
            Id = m.Id,
            ConversationId = m.ConversationId,
            SenderId = m.SenderId,
            SenderUsername = m.Sender.UserName,
            SenderAvatarUrl = _context.Files
                .Where(f =>
                    f.OwnerId.ToString() == m.SenderId.ToString() &&
                    f.OwnerType == FileOwnerType.User &&
                    f.UsageType == FileUsageType.Avatar)
                .Select(f => f.Url)
                .FirstOrDefault(),
            Content = m.Content,
            Created = m.Created
        }).ToList();
    }
}