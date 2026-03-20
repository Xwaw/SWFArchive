namespace Backend.Models.Dto.Archive;

public class UploadGameDto
{
    public string Title { get; set; } = "Untitled";
    public string? Description { get; set; }
    public string Author { get; set; } = "Untitled";
    public IFormFile? Thumbnail { get; set; }
    public required IFormFile SwfGame { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}