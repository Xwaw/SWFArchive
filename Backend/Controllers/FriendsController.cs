using Backend.Services.Friends;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class FriendsController : ControllerBase
{
    private readonly FriendsService _friendsService;

    public FriendsController(FriendsService friendsService)
    {
        _friendsService = friendsService;
    }

    [HttpGet("users/search/{username}")]
    public async Task<IActionResult> GetUsersByUsername(string username)
    {
        var result = await _friendsService.GetUsersByUsername(username);
        
        return Ok(result);
    }

    [HttpPost("friend/{id}")]
    public async Task<IActionResult> SendFriendRequestById(string id) // Send friend request by his ID
    {
        throw new NotImplementedException();
    }
}