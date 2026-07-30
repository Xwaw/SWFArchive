using System.ComponentModel.DataAnnotations;

namespace Backend.Models.User;

public class Message
{
    [Key]
    public Guid Id { get; set; }
    
    public Guid ConversationId { get; set; }
    public Conversation Conversation { get; set; }
    
    public User Sender { get; set; }
    public string SenderId { get; set; }
    
    public string Content { get; set; }
    
    public DateTime Created { get; set; } = DateTime.UtcNow;
}