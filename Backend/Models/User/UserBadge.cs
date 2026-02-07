using System.Net.Mime;
using Backend.Models.Dto;

namespace Backend.Models.User;

public class UserBadge
{
    public Guid Id { get; set; }
    
    public required Guid UserId { get; set; }
    public User? User { get; set; }
    
    public required string Name { get; set; }
    public string? Description { get; set; }
    
    public required Guid ImageId { get; set; }
    public FileTarget? Image { get; set; }
}