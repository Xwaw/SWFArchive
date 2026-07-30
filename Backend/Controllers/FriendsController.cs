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
    [HttpGet]
    public async Task<IActionResult> GetFriends()
    {
        var result = await _friendsService.GetFriendships(User);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("users/search/{username}")]
    public async Task<IActionResult> GetUsersByUsername(string username)
    {
        var result = await _friendsService.GetUsersByUsername(username);
        
        return Ok(result);
    }

    [Authorize]
    [HttpPost("invite/{id}")]
    public async Task<IActionResult> SendFriendRequestById(string id)
    {
        var result = await _friendsService.SendFriendRequest(User, id);
        
        Console.WriteLine(result);
        
        return Ok(result);
    }

    [Authorize]
    [HttpGet("requests")]
    public async Task<IActionResult> GetUserFriendRequests()
    {
        var result = await _friendsService.GetUserFriendRequests(User);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("{requestId}/accept")]
    public async Task<IActionResult> AcceptFriendRequest(Guid requestId)
    {
        var result = await _friendsService.AcceptRequest(User, requestId);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("{requestId}/deny")]
    public async Task<IActionResult> DenyFriendRequest(Guid requestId)
    {
        var result = await _friendsService.DenyRequest(User, requestId);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("messages/{conversationId}")]
    public async Task<IActionResult> GetMessages(Guid conversationId)
    {
        var result = await _friendsService.GetConversationMessages(conversationId);
        return Ok(result);
    }
}