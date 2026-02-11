using System.Security.Claims;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto;
using Backend.Models.Dto.User;
using Backend.Models.User;
using Backend.Repositories.Files;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services;

public class ProfileService
{
    private readonly UserManager<User> _userManager;
    private readonly FileService _fileService;
    private readonly FileStorageService _fileStorageService;
    private readonly ProfileRepository _profileRepository;
    private readonly AppIdentityDbContext _context;
    public ProfileService(UserManager<User> userManager, FileService fileService, FileStorageService fileStorageService, AppIdentityDbContext context, ProfileRepository profileRepository)
    {
        _userManager = userManager;
        _fileService = fileService;
        _fileStorageService = fileStorageService;
        _context = context;
        _profileRepository = profileRepository;
    }

    public async Task<ProfileDto?> GetProfileByUser(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if(user == null) return null;
        
        var username = user.UserName;

        var avatarUrl = await _profileRepository.GetUserImageUrl(userId, FileUsageType.Avatar);
        var bannerUrl = await _profileRepository.GetUserImageUrl(userId, FileUsageType.Banner);
        var backgroundUrl = await _profileRepository.GetUserImageUrl(userId, FileUsageType.Background);
        var description = _profileRepository.GetProfileDescription(userId);

        return new ProfileDto
        {
            UserId = userId.ToString(),
            UserName = username!,
            AvatarUrl = avatarUrl,
            BannerUrl = bannerUrl,
            BackgroundUrl = backgroundUrl,
            Description = description,
        };
    }

    public async Task<string?> SaveImage(ClaimsPrincipal principal, IFormFile? file, string type)
    {
        if (file == null) return null;

        var result = _fileStorageService.EnsureFileExtension(file.FileName, AllowExtensionFile.Image);
        if (!result) 
            return null;
        
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return null;
        var userId = user.Id;

        //_fileService.EnsureFolderExists(Path.Combine(_fileService.ProfilePath, userId));
        
        /*
        _fileService.DeleteFilesStartingWith(Path.Combine(_fileService.ProfilePath, userId), $"{type}_");

        var savedPath = await _fileService.SaveFile(
            file,
            $"{type}_{DateTime.Now:yyyyMMdd_HHmmss}{extension}",
            Path.Combine("Profile", userId).Replace("\\", "/")
        );

        savedPath = "/" + savedPath;

        switch (type.ToLower())
        {
            case "avatar": user.AvatarUrl = savedPath; break;
            case "banner": user.BannerUrl = savedPath; break;
            case "background": user.BackgroundUrl = savedPath; break;
        }*/
        
        await _userManager.UpdateAsync(user);
        
        return "savedPath";
    }

    public async Task SaveDescription(ClaimsPrincipal principal, string? description)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return;
        if(string.IsNullOrEmpty(description)) return;
        //user.Description = description;
        await _userManager.UpdateAsync(user);
    }

    public async Task<bool> IsProfileOwner(ClaimsPrincipal principal, string id)
    {
        var user = await _userManager.GetUserAsync(principal);
        if(user == null) return false;
        return id == user.Id;
    }
}