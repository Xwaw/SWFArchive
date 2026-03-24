namespace Backend.Models.Dto.Archive;

public class PagedResultDto<T>
{
    public required List<T> Items { get; set; } = [];
    public int Total { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}