using System.ComponentModel.DataAnnotations;
using Backend.Models.Archive;

public class GameRate
{
    [Key]
    public Guid Id { get; set; }

    [Range(1, 5)]
    public int Rate { get; set; }

    public required string RaterId { get; set; }

    public Guid GameId { get; set; }
    public GameArchive Game { get; set; } = null!;
}