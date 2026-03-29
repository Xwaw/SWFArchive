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

    public async Task<string?> GetGameThumbnail(Guid gameId)
    {
        var result = await _context.Files.FirstOrDefaultAsync(f => f.Id == gameId && f.UsageType == FileUsageType.Thumbnail);
        return result?.Url;
    }
}