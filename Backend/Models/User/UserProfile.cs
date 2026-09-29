using System.ComponentModel.DataAnnotations;
using Backend.Enums;
using Backend.Models.BadgeEntity;

namespace Backend.Models.User;

public class UserProfile
{
    [Key] 
    public required string UserId { get; set; }
    public User User{ get; set; }

    public UserStatus ProfileStatus { get; set; } = UserStatus.Offline;
    
    public ICollection<UserBadge>? ProfileBadges { get; set; } = new List<UserBadge>();
    public ICollection<UserComment> ProfileComments { get; set; } = new List<UserComment>();
    public string? Description { get; set; }
    public string? ProfileTitle { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}