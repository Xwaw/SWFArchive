namespace Backend.Enums;

public static class FileSizeLimits
{
    public static int GetMaxFileSizeLimit(FileUsageType usageType)
    {
        return usageType switch
        {
            FileUsageType.Avatar => Avatar,
            FileUsageType.Banner => Banner,
            FileUsageType.Background => Background,
            FileUsageType.Thumbnail => Thumbnail,
            FileUsageType.FlashFile => FlashFile,
            _ => throw new ArgumentOutOfRangeException(nameof(usageType))
        };
    }

    private const int MB = 1024 * 1024;
    
    private const int Avatar = 2 * MB;
    private const int Banner = 5 * MB;
    private const int Background = 8 * MB;
    private const int Thumbnail = 2 * MB;
    private const int FlashFile = 20 * MB;
}