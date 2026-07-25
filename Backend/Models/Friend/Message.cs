using System.ComponentModel.DataAnnotations;

namespace Backend.Models.User;

public class Message
{
    [Key]
    public Guid Id { get; set; }
    
    public Guid FriendshipId { get; set; }
    public Friendship Friendship { get; set; }
    
    public User Sender { get; set; }
    public string SenderId { get; set; }
    
    public string Content { get; set; }
    
    public DateTime Created { get; set; }
    
    public ICollection<Message> Messages { get; set; } = new List<Message>();
}