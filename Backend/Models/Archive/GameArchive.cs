using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public class GameArchive
{
    [Key]
    public Guid Id { get; set; }

    public required string Title { get; set; }
    public required string AuthorName { get; set; }
    public required string SwfUrl { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Description { get; set; }

    public int StarsRated { get; set; } = 0;
    public int PlaysCount { get; set; } = 0;
    
    public DateTime Uploaded { get; set; } = DateTime.Now;
    public DateTime Modified { get; set; } = DateTime.Now;
    
    public List<string> Tags { get; set; } = [];
    public ICollection<UserGame> UserGames { get; set; } = new List<UserGame>();
    
    public ICollection<UserComment> GameComments { get; set; } = new List<UserComment>();
}