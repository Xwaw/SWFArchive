using Backend.Enums;
using Backend.Models.User;

namespace Backend.Models.Dto.User;

public class ProfileDto
{
    public required string ProfileUserId { get; set; }
    public required string ProfileTitle { get; set; }
    
    public string? AvatarUrl { get; set; }
    public string? BannerUrl { get; set; } 
    public string? BackgroundUrl { get; set; }
    public string? BadgeViewUrl { get; set; }
    public string? Description { get; set; }

    public UserStatus ProfileStatus { get; set; } = UserStatus.Offline;
    
    public DateTime? CreatedAt { get; set; }
}