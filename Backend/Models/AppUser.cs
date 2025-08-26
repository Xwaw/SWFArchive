using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

public class AppUser : IdentityUser
{
    public string? AvatarUrl { get; set; }
}