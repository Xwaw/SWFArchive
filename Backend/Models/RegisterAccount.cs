using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

public class RegisterAccount
{
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required string Email { get; set; }
}