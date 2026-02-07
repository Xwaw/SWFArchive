using Backend.Enums;

namespace Backend.Models.Dto.Library;

public class LibraryGameDto
{
    public double HoursPlayed { get; set; }
    public StatusGame PlayingStatus { get; set; } = StatusGame.NotPlayed;
    public DateTime AddedAt { get; set; } = DateTime.Now;
    public DateTime? LastPlayed { get; set; } = null;
    public required string Title { get; set; }
    public required string AuthorName { get; set; }
    public required string SwfUrl { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Description { get; set; }
    
    public DateTime Modified { get; set; } = DateTime.Now;
}