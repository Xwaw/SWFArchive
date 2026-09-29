namespace Backend.Models.Dto.User;

public class UserDto
{
    public string? Id { get; set; }
    public string? AccountTitle { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    
    public required ProfileDto Profile { get; set; }

    public bool EmailConfirmed { get; set; } = false;
}