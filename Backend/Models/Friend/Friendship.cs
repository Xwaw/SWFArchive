using System.ComponentModel.DataAnnotations;
using Backend.Enums;

namespace Backend.Models.User;

public class Friendship
{
    [Key]
    public Guid Id { get; set; }

    public string UserId { get; set; }
    public User User { get; set; }

    public string FriendId { get; set; }
    public User Friend { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<Message> Messages { get; set; } = new List<Message>();
}