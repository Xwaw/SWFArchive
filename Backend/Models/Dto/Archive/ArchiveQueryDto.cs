namespace Backend.Models.Dto.Archive;

public class ArchiveQueryDto
{
    public int CurrentPage { get; set; } = 1;
    public string? Search { get; set; }
    public List<Guid>? TagsId { get; set; }
    public string? SortBy { get; set; }

}