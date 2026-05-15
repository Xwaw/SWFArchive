using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Archive;
using Google;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Archive;

public class ArchiveRepository
{
    private readonly AppIdentityDbContext _context;
    
    public ArchiveRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public IQueryable<GameArchive> SortArchive(IQueryable<GameArchive> query, string sortBy)
    {
        return sortBy switch
        {
            "title" => query.OrderBy(g => g.Title),
            "date" => query.OrderBy(g => g.UploadedAt),
            "popularity" => query.OrderBy(g => g.PlaysCount),
            "rating" => query.OrderBy(g => g.RatingAverage),
            _ => query.OrderBy(g => g.Title)
        };
    }

    public IQueryable<GameArchive> ApplyPaging(IQueryable<GameArchive> query, int page, int pageSize)
    {
        return query.Skip((page - 1) * pageSize).Take(pageSize);
    }

    public string? GetGameThumbnail(Guid ownerId)
    {
        return _context.Files.Where(f => f.OwnerId == ownerId && f.UsageType == FileUsageType.Thumbnail)
            .Select(f => f.Url).FirstOrDefault();
    }
    
    public async Task AddArchiveAsync(GameArchive gameArchive)
    {
        await _context.ArchiveGames.AddAsync(gameArchive);
        await _context.SaveChangesAsync();
    }

    public async Task<GameArchive?> GetArchiveGame(Guid guid)
    {
        return await _context.ArchiveGames
            .Where(g => g.Id == guid)
            .Include(g => g.GameTags)
            .ThenInclude(t => t.Tag)
            .FirstOrDefaultAsync();
    }

    public async Task<List<string>> GetGameTags(Guid guid)
    {
        var game = await GetArchiveGame(guid);
        return game!.GameTags.Select(t => t.Tag.Name).ToList();
    }
}