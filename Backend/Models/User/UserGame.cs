using System.ComponentModel.DataAnnotations;
using Backend.Enums;
using Backend.Models.Archive;

namespace Backend.Models.User;

public class UserGame
{
    [Key]
    public Guid Id { get; set; }
    public required string UserId { get; set; }
    public User User { get; set; }

    public required Guid GameId { get; set; }
    public GameArchive Game { get; set; }

    //
    
    public double HoursPlayed { get; set; }
    public StatusGame PlayingStatus { get; set; } = StatusGame.NotPlayed;
    public DateTime AddedAt { get; set; } = DateTime.Now;
    public DateTime? LastPlayed { get; set; } = null;
}