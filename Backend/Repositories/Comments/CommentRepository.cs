using Backend.Enums;
using Backend.Models;
using Backend.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Comments;

public class CommentRepository
{
    private readonly AppIdentityDbContext _context;

    public CommentRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public IQueryable<UserComment> QueryByTarget(Guid targetId, CommentTargetType commentTargetType)
    {
        return _context.UserComments
            .Where(c => c.TargetId == targetId &&
                        c.CommentTargetType == commentTargetType);
    }

    public async Task<bool> TargetExists(Guid targetId, CommentTargetType commentTargetType)
    {
        return commentTargetType switch
        {
            CommentTargetType.Game =>
                await _context.ArchiveGames.AnyAsync(g => g.Id == targetId),
            CommentTargetType.Profile =>
                await _context.Users.AnyAsync(p => p.Id == targetId.ToString()),

            _ => false
        };
    }
    public async Task<UserComment?> GetById(Guid commentId)
    {
        return await _context.UserComments
            .FirstOrDefaultAsync(c => c.Id == commentId);
    }

    public async Task<bool> ExistsOwnedByUser(Guid commentId, string userId)
    {
        return await _context.UserComments
            .AnyAsync(c => c.Id == commentId && c.UserId == userId);
    }

    public async Task Add(UserComment comment)
    {
        await _context.UserComments.AddAsync(comment);
    }

    public void Delete(UserComment comment)
    {
        _context.UserComments.Remove(comment);
    }

    public void Update(UserComment comment)
    {
        _context.UserComments.Update(comment);
    }

    public async Task Save()
    {
        await _context.SaveChangesAsync();
    }
}