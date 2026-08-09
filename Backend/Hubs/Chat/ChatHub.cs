using Backend.Enums;
using Backend.Models.Dto.Friend;
using Backend.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Backend.Hubs.Chat;

public class ChatHub : Hub
{
    private readonly AppIdentityDbContext _context;
    private readonly UserManager<User> _userManager;

    public ChatHub(AppIdentityDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [Authorize]
    public async Task SendMessage(Guid conversationId, string text)
    {
        var userId = Context.UserIdentifier;

        if (userId == null)
            throw new HubException("Unauthorized.");

        if (string.IsNullOrWhiteSpace(text))
            throw new HubException("Message cannot be empty.");

        var isUserInConversation = await _context.Friendships
            .AnyAsync(f =>
                f.ConversationId == conversationId &&
                (f.UserId == userId || f.FriendId == userId));

        if (!isUserInConversation)
            throw new HubException("You are not a member of this conversation.");

        var user = await _userManager.FindByIdAsync(userId);

        var avatarUrl = await _context.Files
            .Where(f =>
                f.OwnerId.ToString() == userId &&
                f.OwnerType == FileOwnerType.User &&
                f.UsageType == FileUsageType.Avatar)
            .Select(f => f.Url)
            .FirstOrDefaultAsync();

        var message = new Message
        {
            ConversationId = conversationId,
            SenderId = userId,
            Content = text.Trim(),
            Created = DateTime.UtcNow
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        var messageDto = new MessageDto
        {
            Id = message.Id,
            ConversationId = message.ConversationId,
            SenderId = message.SenderId,
            SenderUsername = user?.UserName,
            SenderAvatarUrl = avatarUrl,
            Content = message.Content,
            Created = message.Created
        };
        
        Console.WriteLine(messageDto == null);
        Console.WriteLine(messageDto.Content);
        Console.WriteLine(messageDto.SenderUsername);

        await Clients
            .Group(conversationId.ToString())
            .SendAsync("ReceiveMessage", messageDto);
    }

    public async Task JoinChatRoom(Guid conversationId)
    {
        var userId = Context.UserIdentifier;
        if (userId == null) return;
        
        var isUserInConversation = await _context.Friendships
            .AnyAsync(f => f.ConversationId == conversationId && (f.UserId == userId || f.FriendId == userId));
        if (!isUserInConversation) return;
        
        await Groups.AddToGroupAsync(Context.ConnectionId, conversationId.ToString());
    }

    [Authorize]
    public async Task LeaveChatRoom(Guid conversationId)
    {
        var userId = Context.UserIdentifier;
        if (userId == null) return;
        
        var isUserInConversation = await _context.Friendships
            .AnyAsync(f => f.ConversationId == conversationId && (f.UserId == userId || f.FriendId == userId));
        if (!isUserInConversation) return;
        
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, conversationId.ToString());
    }
}