namespace Backend.Models.Dto.Badge;

public class RejectionBadgeDto
{
    public Guid BadgeId { get; set; }
    public string Reason { get; set; }
    public DateTime RejectedAt { get; set; }
}