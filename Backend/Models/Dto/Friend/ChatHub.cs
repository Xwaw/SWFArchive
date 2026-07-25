using Backend.Hubs.Game;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Models.Dto.Friend;

public class ChatHub : Hub
{
    private readonly AppIdentityDbContext _context;

    public ChatHub(AppIdentityDbContext context)
    {
        _context = context;
    }

    public override Task OnConnectedAsync()
    {
        base.OnConnectedAsync();
        
        return Task.CompletedTask;
    }
}