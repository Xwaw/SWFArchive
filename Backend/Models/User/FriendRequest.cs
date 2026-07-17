using System.ComponentModel.DataAnnotations;

namespace Backend.Models.User;

public class FriendRequest
{
    [Key]
    public Guid Id { get; set; }

    public required string SenderId { get; set; }
    public required User Sender { get; set; }

    public required string ReceiverId { get; set; }
    public required User Receiver { get; set; }

    public DateTime CreatedAt { get; set; }
}