namespace Backend.Models.Dto.Badge;

public class UploadBadgeDto
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public required IFormFile Gif { get; set; }
    public required int RequiredPlayTime { get; set; }
    
    public required Guid GameId { get; set; }
}