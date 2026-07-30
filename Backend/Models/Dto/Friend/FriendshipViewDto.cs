namespace Backend.Models.Dto.Friend;

public class FriendshipViewDto
{
    public Guid conversationId { get; set; }
    public string friendId { get; set; }
    public string? friendUsername { get; set; }
}