using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Models.User;

namespace Backend.Models.BadgeEntity;

public class UserBadge
{
    [Key]
    public Guid Id { get; set; }

    public Guid BadgeId { get; set; }
    public Badge Badge { get; set; }

    public string UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public UserProfile UserProfile { get; set; }

    public DateTime ObtainedAt { get; set; }
}