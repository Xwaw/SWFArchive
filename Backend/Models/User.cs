using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    
    public bool isLogged { get; set; }
}