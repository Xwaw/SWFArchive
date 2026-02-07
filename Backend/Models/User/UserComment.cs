using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Enums;

namespace Backend.Models;

public class UserComment
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    public required string UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public User.User User { get; set; }
    
    [Required]
    public required Guid TargetId { get; set; }
    public CommentTargetType CommentTargetType { get; set; }
    
    [Required]
    public required string Text { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime ModifiedAt { get; set; } = DateTime.Now;
}