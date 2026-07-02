using Backend.Models.Game;
using Backend.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Backend.Hubs.Game;

public class SessionHub : Hub
{
    private readonly AppIdentityDbContext _context;
    private readonly UserManager<User> _userManager;

    public SessionHub(AppIdentityDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public override async Task OnConnectedAsync()
    {
        var user = await _userManager.GetUserAsync(Context.User!);
        var gameId = Context.GetHttpContext()!.Request.Query["gameId"].ToString();
        
        await _context.SessionRooms.AddAsync(new SessionRoom
        {
            Id = Guid.NewGuid(),
            ConnectionId = Context.ConnectionId,
            UserId = user!.Id,
            GameId = gameId
        });
        await _context.SaveChangesAsync();
        
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var user = await _userManager.GetUserAsync(Context.User!);
        if(user == null) return;
        
        var session = await _context.SessionRooms.FirstOrDefaultAsync(s => s.ConnectionId == Context.ConnectionId && s.UserId == user.Id);
        if(session == null) return;

        var gameId = Guid.Parse(session.GameId);

        var userGame = await _context.UserGames.FirstOrDefaultAsync(u =>
            u.UserId == user.Id &&
            u.GameId == gameId);
        
        
        if(userGame == null) return;
        
        var playTime  = DateTime.UtcNow - session.StartedAt;
        var minutes = (float)playTime.TotalHours * 60;
        userGame.HoursPlayed += minutes;
        
        _context.Remove(session);
        await _context.SaveChangesAsync();
        
        await base.OnDisconnectedAsync(exception);
    }

    public async Task Heartbeat()
    {
        var session = await _context.SessionRooms.FirstOrDefaultAsync(s => s.ConnectionId == Context.ConnectionId);

        if (session == null) return;
        
        session.LastHeartBeat = DateTime.UtcNow;
        await _context.SaveChangesAsync();
    }
}