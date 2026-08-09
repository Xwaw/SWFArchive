using System.ComponentModel.DataAnnotations;
using Backend.Enums;

namespace Backend.Models.BadgeEntity;

public class BadgeModeration
{
    [Key]
    public Guid BadgeId { get; set; }
    public Badge Badge { get; set; } = null!;

    public BadgeModerationResult Result { get; set; }

    [Length(5, 150)]
    public string? Reason { get; set; }

    public DateTime ModeratedAt { get; set; } = DateTime.UtcNow;

    public required string ModeratorId { get; set; }
    public User.User Moderator { get; set; } = null!;
}