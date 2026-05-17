namespace Backend.Models.Dto.Library;

public class ViewLibraryGameDto
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public string? ThumbnailUrl { get; set; }
    public DateTime? LastPlayed { get; set; }
}