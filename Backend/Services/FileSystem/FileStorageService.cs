using Backend.Enums;

public class FileStorageService
{
    private readonly string _basePath;
    private readonly int _fileLenght;
    public string UploadPath { get; }

    public FileStorageService(IWebHostEnvironment environment)
    {
        _basePath = environment.WebRootPath;
        _fileLenght = 2 * 1024 * 1024;
        UploadPath = Path.Combine(_basePath, "upload");
    }

    public async Task<string?> SaveUserFile(
        Guid userId,
        IFormFile? file,
        FileUsageType usageType)
    {
        if (file == null || file.Length == 0) return null;
        
        var folder = BuildStoragePath(FileOwnerType.User, userId, usageType);
        EnsureFolderExists(folder);

        var extension = Path.GetExtension(file.FileName);
        var fileName = $"{Guid.NewGuid():N}{extension}";
        var fullPhysicalPath = Path.Combine(folder, fileName);

        try
        {
            await using var stream = new FileStream(fullPhysicalPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return BuildPublicUrl(FileOwnerType.User, userId, usageType, fileName);
        }
        catch
        {
            return null;
        }
    }
    
    public async Task<string?> SaveArchiveFile(Guid userId, IFormFile? file, FileUsageType usageType)
    {
        if (file == null || file.Length == 0) return null;
        
        var folder = BuildStoragePath(FileOwnerType.Archive, userId, usageType);
        EnsureFolderExists(folder);

        var extension = Path.GetExtension(file.FileName);
        var fileName = $"{Guid.NewGuid():N}{extension}";
        var fullPhysicalPath = Path.Combine(folder, fileName);

        try
        {
            await using var stream = new FileStream(fullPhysicalPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return BuildPublicUrl(FileOwnerType.Archive, userId, usageType, fileName);
        }
        catch
        {
            return null;
        }
    }

    public void DeletePhysicalFile(string publicUrl)
    {
        var physicalPath = Path.Combine(_basePath, publicUrl.TrimStart('/'));
        if (File.Exists(physicalPath))
            File.Delete(physicalPath);
    }

    private string BuildPublicUrl(
        FileOwnerType ownerType,
        Guid id,
        FileUsageType usageType,
        string fileName)
    {
        return $"/upload/{GetOwnerFolder(ownerType)}/{id:N}/{GetUsageFolder(usageType)}/{fileName}";
    }

    private string BuildStoragePath(FileOwnerType ownerType, Guid id, FileUsageType usageType)
    {
        return Path.Combine(
            UploadPath,
            GetOwnerFolder(ownerType),
            id.ToString("N"),
            GetUsageFolder(usageType)
        );
    }

    public void EnsureFolderExists(string folder)
    {
        if (!Directory.Exists(folder))
            Directory.CreateDirectory(folder);
    }

    private static string GetOwnerFolder(FileOwnerType ownerType) =>
        ownerType switch
        {
            FileOwnerType.User => "users",
            FileOwnerType.Archive => "games",
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
}
