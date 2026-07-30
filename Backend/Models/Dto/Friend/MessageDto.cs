using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Dto.Friend;

public class MessageDto
{
    [Key]
    public Guid Id { get; set; }
    
    public Guid FriendshipId { get; set; }
    public string SenderId { get; set; }
    
    public string Content { get; set; }
    
    public DateTime Created { get; set; } = DateTime.UtcNow;
}