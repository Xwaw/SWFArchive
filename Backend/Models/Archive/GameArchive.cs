using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class GameArchive
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string AuthorName { get; set; }

    public string? Description { get; set; }

    public string? Version { get; set; }

    public int PlaysCount { get; set; }

    public float RatingAverage { get; set; }

    public int RatingCount { get; set; }

    public DateTime UploadedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    
    public ICollection<UserGame> UserGames { get; set; } = new List<UserGame>();
}