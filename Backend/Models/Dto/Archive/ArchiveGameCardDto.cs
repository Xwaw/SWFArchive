namespace Backend.Models.Dto.Archive;

public class ArchiveGameCardDto
{ 
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required string AuthorName { get; set; }
    public string? ThumbnailUrl { get; set; }

    public float RatingAvarage { get; set; } = 0;
    public int PlaysCount { get; set; } = 0;
    
    public DateTime Uploaded { get; set; } = DateTime.Now;
}