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

    [Authorize]
    [HttpGet("users/search/{username}")]
    public async Task<IActionResult> GetUsersByUsername(string username)
    {
        var result = await _friendsService.GetUsersByUsername(username);
        
        return Ok(result);
    }

    [Authorize]
    [HttpPost("friend/{id}")]
    public async Task<IActionResult> SendFriendRequestById(string id)
    {
        await _friendsService.SendFriendRequest(User, id);
        
        return Ok();
    }
}