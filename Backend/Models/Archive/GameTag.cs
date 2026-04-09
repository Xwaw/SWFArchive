namespace Backend.Models;

public class GameTag
{
    public Guid GameArchiveId { get; set; }
    public GameArchive GameArchive { get; set; } 
    
    public Guid TagId { get; set; }
    public Tag Tag { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid CreatedById { get; set; }
}