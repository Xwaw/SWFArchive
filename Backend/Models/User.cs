using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

public class User : IdentityUser
{
    public ICollection<Game> Games {get; set;} = new List<Game>();
}