using Backend.Services.Archive;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TagController : ControllerBase
{
    private TagService _tagService;
    
    public TagController(TagService tagService)
    {
        _tagService = tagService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTags([FromQuery] string? name)
    {
        var result = await _tagService.GetQueryTags(name);
        
        return Ok(result);
    }
}