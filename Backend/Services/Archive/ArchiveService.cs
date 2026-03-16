using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Archive;
using Backend.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace Backend.Services.Archive;

public class ArchiveService
{
    private readonly UserManager<User> _userManager;
    private readonly FileStorageService _fileStorageService;
    private readonly AppIdentityDbContext _context;

    public ArchiveService(UserManager<User> userManager,
        AppIdentityDbContext appIdentityDbContext, FileStorageService fileStorageService)
    {
        _userManager = userManager;
        _context = appIdentityDbContext;
        _fileStorageService = fileStorageService;
    }

    private async Task<List<GameArchive>> GetAllArchiveGames()
    {
        var archive = await _context.ArchiveGames.ToListAsync();
        return archive;
    }

    private ArchiveCardViewDto MapToArchiveCardDto(GameArchive game)
    {
        return new ArchiveCardViewDto
        {
            Id = game.Id,
            Title = game.Title,
            AuthorName = game.AuthorName,
            PlaysCount = game.PlaysCount,
            StarsRated = game.StarsRated,
            ThumbnailUrl = game.ThumbnailUrl,
            Uploaded = game.Uploaded
        };
    }

    public async Task<PagedResultDto<ArchiveCardViewDto>> GetArchive(string? search, int page = 1, int pageSize = 50)
    {
        search = search?.Trim();
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);
        
        IQueryable<GameArchive> query = _context.ArchiveGames;
        
        if(!string.IsNullOrEmpty(search))
            query = query.Where(g => EF.Functions.Like(g.Title, $"%{search}%"));

        var total = await query.CountAsync();
        
        var games = await query
            .OrderByDescending(g => g.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(g => new ArchiveCardViewDto
            {
                Id = g.Id,
                Title = g.Title,
                AuthorName = g.AuthorName,
                PlaysCount = g.PlaysCount,
                StarsRated = g.StarsRated,
                ThumbnailUrl = g.ThumbnailUrl,
                Uploaded = g.Uploaded
            })
            .ToListAsync();
        
        return new PagedResultDto<ArchiveCardViewDto>
        {
            Items = games,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }


    public async Task<bool> AddGameToArchive(ClaimsPrincipal principal, UploadGameDto? gameDto)
    {
        var user = await _userManager.GetUserAsync(principal);
        if (user == null || gameDto == null) return false;
        
        var guid = Guid.NewGuid();

        var game = new GameArchive
        {
            Id = guid,
            Title = gameDto.Title,
            Description = gameDto.Description,
            AuthorName = user.UserName!,
            SwfUrl = string.Empty,
            ThumbnailUrl = null
        };
         
        _context.ArchiveGames.Add(game);
        await _context.SaveChangesAsync();

        if(gameDto.Thumbnail != null)
            game.ThumbnailUrl = await UpdateFile(gameDto.Thumbnail, guid.ToString(), "thumbnail_", [".png", ".jpeg", ".jpg"]);
        
        game.SwfUrl = await UpdateFile(gameDto.SwfGame, guid.ToString(), "swf_", [".swf"]);
        
        await _context.SaveChangesAsync();
        
        return true;
    }

    private async Task<string> UpdateFile(IFormFile? file, string gameId, string prefix, string[] allowedExtensions)
    {
        throw new NotImplementedException();
    }
}