using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Dto.Friend;

public class MessageDto
{
    [Key]
    public Guid Id { get; set; }
    
    public Guid ConversationId { get; set; }
    
    public string SenderId { get; set; }
    public string? SenderUsername { get; set; }
    public string? SenderAvatarUrl { get; set; }
    
    public string Content { get; set; }
    
    public DateTime Created { get; set; } = DateTime.UtcNow;
}