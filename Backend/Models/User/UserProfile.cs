using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.User;

public class UserProfile
{
    [Key]
    public Guid Id { get; set; }
    
    [ForeignKey(nameof(User))]
    public required string UserId { get; set; }
    public required User User{ get; set; }
    
    public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
    public ICollection<UserComment> ProfileComments { get; set; } = new List<UserComment>();
    
    public string? Description { get; set; }
}