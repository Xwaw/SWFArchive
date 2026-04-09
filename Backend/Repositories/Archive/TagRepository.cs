using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Archive;

public class TagRepository
{
    private AppIdentityDbContext _context;
    
    public TagRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public async Task AddTag(Tag tag)
    {
        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();
    }

    public async Task<Tag?> GetExistingTag(string name)
    {
        return await _context.Tags.FirstOrDefaultAsync(t => t.Name == name);
    }

    public async Task AddTagsToGame(Guid gameId, List<Tag> tags)
    {
        var game = await _context.ArchiveGames
            .Include(g => g.GameTags)
            .FirstOrDefaultAsync(g => g.Id == gameId);

        if (game == null) return;

        foreach (var tag in tags)
        {
            var exists = game.GameTags.Any(gt => gt.TagId == tag.Id);
            if (exists) continue;

            game.GameTags.Add(new GameTag
            {
                GameArchive = game,
                Tag = tag,
            });
        }

        await _context.SaveChangesAsync();
    }
}