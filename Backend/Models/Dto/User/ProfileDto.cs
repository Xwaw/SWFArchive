using Backend.Models.User;

namespace Backend.Models.Dto.User;

public class ProfileDto
{
    public required string UserId { get; set; }
    public required string UserName { get; set; }
    
    public string? AvatarUrl { get; set; }
    public string? BannerUrl { get; set; } 
    public string? BackgroundUrl { get; set; }
    public string? Description { get; set; }
    
    public string? IsOnline { get; set; }
    
    public DateTime? CreatedAt { get; set; }

    public ICollection<UserBadge>? Badges { get; set; } = new List<UserBadge>();
}