using Backend.Services.Archive;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class TagController : ControllerBase
{
    private TagService _tagService;
    
    public TagController(TagService tagService)
    {
        _tagService = tagService;
    }

    [HttpGet("{name}")]
    public IActionResult GetAllTags(string? name)
    {
        var result = _tagService.GetQueryTags(name);
        
        return Ok(result);
    }
}