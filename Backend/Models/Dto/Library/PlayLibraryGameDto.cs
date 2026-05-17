namespace Backend.Models.Dto.Library;

public class PlayLibraryGameDto
{
    public required string SwfUrl { get; set; }
    public required Guid GameId { get; set; }
    public required string UserId { get; set; }
}