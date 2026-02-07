using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Archive;
using Backend.Models.User;
using Backend.Repositories.Comments;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Comment;

public class CommentService
{
    private readonly CommentRepository _repository;
    private readonly UserManager<User> _userManager;
    
    public CommentService(CommentRepository repository, UserManager<User> userManager)
    {
        _repository = repository;
        _userManager = userManager;
    }

    public async Task<List<CommentCardDto>> GetComments(ClaimsPrincipal principal, Guid targetId, CommentTargetType targetType)
    {
        var user = await _userManager.GetUserAsync(principal);
        var userId = user?.Id;

        return await _repository
            .QueryByTarget(targetId, targetType)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new CommentCardDto
            {
                CommentId = c.Id,
                Author = c.User.UserName!,
                Text = c.Text,
                AvatarUrl = null,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.ModifiedAt,
                IsOwner = userId != null && c.UserId == userId
            })
            .ToListAsync();
    }

    
    public async Task AddUserComment(ClaimsPrincipal principal, string newComment, Guid targetId, CommentTargetType type)
    {
        if (string.IsNullOrWhiteSpace(newComment))
            throw new Exception("Comment cannot be empty");
        
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) 
            throw new Exception("User is null");

        var userId = user.Id;

        if (!await _repository.TargetExists(targetId, type))
            throw new Exception("Target does not exist");
        
        var userComment = new UserComment
        {
            UserId = userId,
            CommentTargetType = type,
            TargetId = targetId,
            Text = newComment
        };
        
        await _repository.Add(userComment);
        await _repository.Save();
    }

    public async Task<bool> EditUserComment(ClaimsPrincipal principal, string newComment, Guid commentId)
    {
        if (string.IsNullOrWhiteSpace(newComment))
            return false;

        var user = await _userManager.GetUserAsync(principal);
        if (user == null)
            return false;

        var userComment = await _repository.GetById(commentId);
        if (userComment == null)
            return false;

        var isOwner = await _repository.ExistsOwnedByUser(commentId, user.Id);
        if (!isOwner) return false;

        userComment.Text = newComment;
        userComment.ModifiedAt = DateTime.UtcNow;

        _repository.Update(userComment);
        await _repository.Save();

        return true;
    }

    public async Task<bool> DeleteUserComment(ClaimsPrincipal principal, Guid commentId)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null)
            return false;

        var userComment = await _repository.GetById(commentId);
        if (userComment == null)
            return false;

        var isOwner = await _repository.ExistsOwnedByUser(commentId, user.Id);
        if (!isOwner) return false;
        
        _repository.Delete(userComment);
        await _repository.Save();
        return true;
    }
}