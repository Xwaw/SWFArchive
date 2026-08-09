namespace Backend.Models.Dto.Badge;

public class PendingBadgeDto
{
    public Guid BadgeId { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public int RequiredPlayTime { get; set; }
    public DateTime UploadedAt {get; set;}
    public Guid? GameId { get; set; }
    public string? GameTitle { get; set; }
}