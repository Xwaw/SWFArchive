using System.Diagnostics;
using Backend.Enums;

namespace Backend.Services;

public class FileStorageService
{
    public FileStorageService(IWebHostEnvironment environment)
    {
        _basePath = environment.WebRootPath;
        
        UploadPath = _basePath + "/upload";
    }

    public string UploadPath { get; }

    private string _basePath { get; }
    
    public void EnsureFolderExists(string folder)
    {
        if(Directory.Exists(folder)) return;
        Directory.CreateDirectory(folder);
    }

    public string BuildStoragePath(FileOwnerType ownerType, Guid id, FileUsageType usageType)
    {
        return Path.Combine(
            UploadPath,
            GetOwnerFolder(ownerType),
            id.ToString("N"),
            GetUsageFolder(usageType)
        );
    }
    private static string GetOwnerFolder(FileOwnerType ownerType) =>
        ownerType switch
        {
            FileOwnerType.User => "users",
            FileOwnerType.Game => "games",
            _ => throw new ArgumentOutOfRangeException(nameof(ownerType))
        };
    private static string GetUsageFolder(FileUsageType usageType) =>
        usageType switch
        {
            FileUsageType.Avatar     => "avatar",
            FileUsageType.Background => "background",
            FileUsageType.Banner     => "banner",
            FileUsageType.FlashFile  => "flash",
            FileUsageType.Thumbnail  => "thumbnail",
            _ => throw new ArgumentOutOfRangeException(nameof(usageType))
        };
    
    public bool EnsureFileExtension(string file, string[] usageType)
    {
        var extension = Path.GetExtension(file)
            .TrimStart('.')
            .ToLowerInvariant();
        return usageType.Any(extType => extType.Equals(extension, StringComparison.InvariantCultureIgnoreCase));
    }
}