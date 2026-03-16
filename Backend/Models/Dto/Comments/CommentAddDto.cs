using Backend.Enums;

namespace Backend.Models.Dto.Archive;

public class CommentAddDto
{
    public string Text { get; set; } = "";
    public Guid TargetId { get; set; }
    public CommentTargetType TargetType { get; set; }
}