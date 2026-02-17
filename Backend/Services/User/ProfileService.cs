using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto;
using Backend.Models.Dto.User;
using Backend.Models.User;
using Backend.Repositories.User;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services;

public class ProfileService
{
    private readonly UserManager<User> _userManager;
    private readonly FileStorageService _fileStorageService;
    private readonly FileRepository _fileRepository;
    private readonly ProfileRepository _profileRepository ;
    private readonly AppIdentityDbContext _context;
    public ProfileService(UserManager<User> userManager, 
        FileStorageService fileStorageService, 
        AppIdentityDbContext context, 
        FileRepository fileRepository, 
        ProfileRepository profileRepository) 
    {
        _userManager = userManager;
        _fileStorageService = fileStorageService;
        _context = context;
        _fileRepository = fileRepository;
        _profileRepository = profileRepository;
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
            BackgroundUrl = await _fileRepository.GetUserFileUrlAsync(userId, FileUsageType.Background),
            Description = await _profileRepository.GetDescriptionForUser(userId)
        };
    }
    public async Task<bool> IsProfileOwner(ClaimsPrincipal principal, Guid id)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return false;
        return id.ToString() == user.Id;
    }

    public async Task<string?> ReplaceUserImageAsync(
        Guid userId,
        IFormFile? file,
        FileUsageType usageType)
    {
        if(file == null || file.Length == 0 || file.Length > FileSizeLimits.GetMaxFileSizeLimit(usageType)) return null;
        
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
    
    public async Task UpdateDescription(Guid userId, string? description)
    {
        if(string.IsNullOrEmpty(description)) return;

        var profile = await _profileRepository.GetUserProfile(userId);
        if(profile == null) return;
        
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if(user == null) return;
        
        profile.Description = description;

        await _userManager.UpdateAsync(user);
    }
}