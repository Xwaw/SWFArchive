using System.ComponentModel.DataAnnotations;
using Backend.Models.BadgeEntity;

namespace Backend.Models.User;

public class UserProfile
{
    [Key] 
    public required string UserId { get; set; }
    public User User{ get; set; }

    public required bool IsOnline { get; set; } = false;
    
    public ICollection<UserBadge>? ProfileBadges { get; set; } = new List<UserBadge>();
    public ICollection<UserComment> ProfileComments { get; set; } = new List<UserComment>();
    public string? Description { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}