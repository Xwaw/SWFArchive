namespace Backend.Models.Dto.Archive;

public class UploadGameDto
{
    public string Title { get; set; } = "Untitled";
    public string? Description { get; set; }
    public IFormFile? Thumbnail { get; set; }
    public required IFormFile SwfGame { get; set; }
}