using System.ComponentModel.DataAnnotations;
using Backend.Enums;

namespace Backend.Models;

public class UserGame
{
    [Key]
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public User.User User { get; set; }

    public Guid GameId { get; set; }
    public GameArchive Game { get; set; }

    public double HoursPlayed { get; set; }
    public StatusGame PlayingStatus { get; set; } = StatusGame.NotPlayed;
    public DateTime AddedAt { get; set; } = DateTime.Now;
    public DateTime? LastPlayed { get; set; } = null;
}