using System.ComponentModel.DataAnnotations;
using Backend.Enums;
using Backend.Models.Archive;

namespace Backend.Models.BadgeEntity;

public class Badge
{
    [Key]
    public Guid Id { get; set; }

    public Guid GameId { get; set; }
    public GameArchive Game { get; set; }

    public string Name { get; set; }
    public string? Description { get; set; }
    public int RequiredPlayTime { get; set; }
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public BadgeModeration? Moderation { get; set; }
    
    public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
}