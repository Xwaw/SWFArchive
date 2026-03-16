namespace Backend.Models.Dto.Archive;

public class CommentCardDto
{
    public Guid CommentId { get; set; }
    public required string Author { get; set; }
    public required string Text { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public bool IsOwner { get; set; } = false;
}