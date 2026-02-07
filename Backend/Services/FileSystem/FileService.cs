namespace Backend.Services;

public class FileService
{
    public async Task<string?> CopyDataToNewFile(IFormFile? file, string fileFullPath)
    {
        try
        {
            await using var stream = new FileStream(fileFullPath, FileMode.Create);
            await file?.CopyToAsync(stream)!;

            return fileFullPath;
        }
        catch (Exception _)
        {
            return null;
        }
    }
    public bool DeleteFile(string fileName, string folder)
    {
        var fullPath = Path.Combine(folder, fileName);
        if (!File.Exists(fullPath))
            return true;
        File.Delete(fullPath);
        return true;
    }
    public void DeleteFilesStartingWith(string folder, string prefix = "")
    {
        if (!Directory.Exists(folder)) return;
        
        foreach (var fullPath in Directory.GetFiles(folder))
        {
            var fileName = Path.GetFileName(fullPath);
            if (fileName.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                File.Delete(fullPath);
        }
    }
}