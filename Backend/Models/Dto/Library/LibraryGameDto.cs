using Backend.Enums;

namespace Backend.Models.Dto.Library;

public class LibraryGameDto
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Thumbnail { get; set; } // future Icon
}