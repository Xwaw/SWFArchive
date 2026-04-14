using Backend.Models;
using Backend.Repositories.Archive;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Archive;

public class TagService
{
    private AppIdentityDbContext _context;
    private readonly TagRepository _tagRepository;
    
    public TagService(TagRepository tagRepository, AppIdentityDbContext context)
    {
        _tagRepository = tagRepository;
        _context = context;
    }
    
    public async Task<Tag?> GetOrCreateTag(string name)
    {
        if (string.IsNullOrWhiteSpace(name)) 
            return null;
        
        var normalized = name.Trim().ToLower();
        
        var existing = await _tagRepository.GetExistingTag(normalized);
        
        if (existing != null) 
            return existing;

        var newTag = new Tag { Name = normalized};

        await _tagRepository.AddTag(newTag);
        
        return newTag;
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

            tag.UsageCount++;
        }

        await _context.SaveChangesAsync();
    }
    
    public async Task<List<Tag>> GetQueryTags(string? name = null)
    {
        var query = _context.Tags.AsQueryable();

        if (!string.IsNullOrWhiteSpace(name))
        {
            var normalized = name.Trim().ToLower();

            query = query.Where(t => t.Name.ToLower().StartsWith(normalized));
        }

        return await query
            .OrderByDescending(t => t.UsageCount)
            .Take(10)
            .ToListAsync();
    }
}