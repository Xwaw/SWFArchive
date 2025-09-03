using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Game
{
    [Key]
    public required string Id { get; set; }
    
    public string Title { get; set; }
    public string UrlSource { get; set; }
    public string? Description {get; set;}
    public string Author { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateAdded { get; set; }
    
    public float PlayTime { get; set; }
}