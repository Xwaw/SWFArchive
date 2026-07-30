using System.ComponentModel.DataAnnotations;

namespace Backend.Models.User;

public class Conversation
{
    [Key]
    public Guid Id { get; set; }
    public ICollection<Friendship> Friendships { get; set; } = new List<Friendship>();
    public ICollection<Message> Messages { get; set; } = new List<Message>();
}