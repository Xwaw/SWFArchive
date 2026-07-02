using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models.Game;

public class SessionRoom
{
    [Key] 
    public Guid Id { get; set; }
    
    public required string UserId { get; set; }
    public required string GameId { get; set; }
    public required string ConnectionId { get; set; }
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastHeartBeat { get; set; } = DateTime.UtcNow;
}