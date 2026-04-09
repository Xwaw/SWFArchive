namespace Backend.Models.Dto.Archive;

public class GameViewDto
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required string AuthorName { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Description { get; set; }

    public float StarsRated { get; set; } = 0;
    public int PlaysCount { get; set; } = 0;

    public DateTime Uploaded { get; set; } = DateTime.Now;
    public DateTime Modified { get; set; } = DateTime.Now;

    public ICollection<Tag> Tags { get; set; } = [];
    
    public ICollection<UserComment> Comments { get; set; }
}