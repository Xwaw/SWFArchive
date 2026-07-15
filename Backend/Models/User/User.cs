using Microsoft.AspNetCore.Identity;

namespace Backend.Models.User;

public class User : IdentityUser
{
    public UserProfile UserProfile { get; set;}
    public ICollection<UserGame> UserGames { get; set; } = new List<UserGame>();
    
    public ICollection<FriendRequest> SentFriendRequests { get; set; } = new List<FriendRequest>();
    public ICollection<FriendRequest> ReceivedFriendRequests { get; set; } = new List<FriendRequest>();
}