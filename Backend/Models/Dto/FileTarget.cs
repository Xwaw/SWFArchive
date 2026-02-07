using Backend.Enums;

namespace Backend.Models.Dto;

public class FileTarget
{
    public Guid Id { get; set; }
    public required string Url {get; set;}
    
    public DateTime UploadedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public required FileOwnerType OwnerType {get; set;}
    public required FileUsageType UsageType {get; set;}
    public required Guid OwnerId {get; set;}
    
    public bool IsActive { get; set; } = true;
}