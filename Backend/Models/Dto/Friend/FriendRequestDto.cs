namespace Backend.Models.Dto.Friend;

public class FriendRequestDto
{
    public Guid Id { get; set; }
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public string? SenderUsername { get; set; }
    public string AvatarUrl { get; set; }
}