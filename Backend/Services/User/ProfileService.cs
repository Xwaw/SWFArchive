using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto;
using Backend.Models.Dto.User;
using Backend.Models.User;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services;

public class ProfileService
{
    private readonly UserManager<User> _userManager;
    private readonly FileService _fileService;
    private readonly FileStorageService _fileStorageService;
    private readonly FileRepository _fileRepository;
    private readonly AppIdentityDbContext _context;
    public ProfileService(UserManager<User> userManager, 
        FileService fileService, 
        FileStorageService fileStorageService, 
        AppIdentityDbContext context, 
        FileRepository profileRepository
        ) 
    {
        _userManager = userManager;
        _fileService = fileService;
        _fileStorageService = fileStorageService;
        _context = context;
        _fileRepository = profileRepository;
    }

    public async Task<ProfileDto?> GetProfileByUser(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if(user == null) return null;
    
        return new ProfileDto
        {
            UserId = userId.ToString(),
            UserName = user.UserName!,
            AvatarUrl = await _fileRepository.GetUserFileUrlAsync(userId, FileUsageType.Avatar),
            BannerUrl = await _fileRepository.GetUserFileUrlAsync(userId, FileUsageType.Banner),
            BackgroundUrl = await _fileRepository.GetUserFileUrlAsync(userId, FileUsageType.Background)
        };
    }
    public async Task<bool> IsProfileOwner(ClaimsPrincipal principal, string id)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return false;
        return id == user.Id;
    }

    public async Task<string?> ReplaceUserImageAsync(
        Guid userId,
        IFormFile file,
        FileUsageType usageType)
    {
        var oldFiles = await _fileRepository
            .GetUserFilesAsync(userId, usageType);

        foreach (var old in oldFiles)
        {
            _fileStorageService.DeletePhysicalFile(old.Url);
        }

        await _fileRepository.RemoveRangeAsync(oldFiles);

        var publicUrl = await _fileStorageService
            .SaveUserFile(userId, file, usageType);

        if (publicUrl == null)
            return null;

        await _fileRepository.AddAsync(new FileTarget
        {
            OwnerId = userId,
            OwnerType = FileOwnerType.User,
            UsageType = usageType,
            Url = publicUrl
        });

        return publicUrl;
    }
    
    public async Task SaveDescription(ClaimsPrincipal principal, string? description)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return;
        if(string.IsNullOrEmpty(description)) return;
        //user.Description = description;
        await _userManager.UpdateAsync(user);
    }
}