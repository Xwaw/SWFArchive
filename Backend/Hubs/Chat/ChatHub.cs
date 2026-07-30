using Backend.Models.Dto.Friend;
using Backend.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Backend.Hubs.Chat;

public class ChatHub : Hub
{
    private readonly AppIdentityDbContext _context;

    public ChatHub(AppIdentityDbContext context)
    {
        _context = context;
    }
    
    public override Task OnConnectedAsync()
    {
        Console.WriteLine("Ping");
        
        return base.OnConnectedAsync();
    }

    [Authorize]
    public async Task SendMessage(Guid conversationId, string text)
    {
        var userId = Context.UserIdentifier;
        if (userId == null) return;

        var isUserInConversation = await _context.Friendships
            .AnyAsync(f =>
                f.ConversationId == conversationId &&
                (f.UserId == userId || f.FriendId == userId));

        if (!isUserInConversation) return;

        var message = new Message
        {
            ConversationId = conversationId,
            SenderId = userId,
            Content = text
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        await Clients.Group(conversationId.ToString())
            .SendAsync("ReceiveMessage", message);
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