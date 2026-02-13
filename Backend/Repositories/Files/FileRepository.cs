using Backend;
using Backend.Enums;
using Backend.Models.Dto;
using Microsoft.EntityFrameworkCore;

public class FileRepository
{
    private readonly AppIdentityDbContext _context;

    public FileRepository(AppIdentityDbContext context)
    {
        _context = context;
    }

    public async Task<string?> GetUserFileUrlAsync(
        Guid userId,
        FileUsageType usageType)
    {
        return await _context.Files
            .Where(f => f.OwnerId == userId &&
                        f.OwnerType == FileOwnerType.User &&
                        f.UsageType == usageType)
            .Select(f => f.Url)
            .FirstOrDefaultAsync();
    }

    public async Task<List<FileTarget>> GetUserFilesAsync(
        Guid userId,
        FileUsageType usageType)
    {
        return await _context.Files
            .Where(f => f.OwnerId == userId &&
                        f.OwnerType == FileOwnerType.User &&
                        f.UsageType == usageType)
            .ToListAsync();
    }

    public async Task AddAsync(FileTarget file)
    {
        await _context.Files.AddAsync(file);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveRangeAsync(IEnumerable<FileTarget> files)
    {
        _context.Files.RemoveRange(files);
        await _context.SaveChangesAsync();
    }
}