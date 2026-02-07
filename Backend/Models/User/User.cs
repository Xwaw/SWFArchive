using Backend.Models.Dto.User;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models.User;

public class User : IdentityUser
{
    public UserProfile UserProfile { get; set;}
    public ICollection<UserGame> UserGames {get; set;} = new List<UserGame>();
}