namespace Backend.Models.User;

public class UserProfile
{
    public Guid Id { get; set; }
    public required string UserId { get; set; }
    public required User User{ get; set; }
    
    public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
    public ICollection<UserComment> ProfileComments { get; set; } = new List<UserComment>();
    
    public string? Description { get; set; }
}