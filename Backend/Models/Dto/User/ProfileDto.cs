using Backend.Models.User;

namespace Backend.Models.Dto.User;

public class ProfileDto
{
    public string UserId { get; set; }
    public string UserName { get; set; }
    
    public string? AvatarUrl { get; set; }
    public string? BannerUrl { get; set; } 
    public string? BackgroundUrl { get; set; }
    public string? Description { get; set; }
    
    public List<string> BadgesView { get; set; }
}