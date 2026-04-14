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
}