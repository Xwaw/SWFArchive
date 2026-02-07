using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Archive;
using Backend.Services;
using Backend.Services.Archive;
using Backend.Services.Comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly CommentService _commentService;
    
    public CommentController(CommentService commentService)
    {
        _commentService = commentService;
    }

    [Authorize]
    [HttpGet("all/{targetType}/{targetId:guid}")]
    public async Task<ActionResult<List<CommentCardDto>>> GetComments(CommentTargetType targetType, Guid targetId)
    {
        var result = await _commentService.GetComments(User, targetId, targetType);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddComment([FromBody] CommentAddDto commentDto)
    {
        await _commentService.AddUserComment(User, commentDto.Text, commentDto.TargetId, commentDto.TargetType);
        return Ok(new {Message = "Comment added successfully."});
    }
    
    [Authorize]
    [HttpPut("edit/{commentId:guid}")]
    public async Task<IActionResult> EditComment(Guid commentId, [FromBody] CommentEditDto commentDto)
    {
        var result = await _commentService.EditUserComment(User, commentDto.Text, commentId);
        if (!result) return BadRequest("Fail on editing comment");
        return Ok(new {Message = "Comment added successfully."});
    }

    [Authorize]
    [HttpDelete("delete/{commentId:guid}")]
    public async Task<IActionResult> DeleteComment(Guid commentId)
    {
        var result = await _commentService.DeleteUserComment(User, commentId);
        if(!result) return BadRequest("Fail on deleting comment");
        return Ok(new {Message = "Comment deleted successfully."});
    }
    
}