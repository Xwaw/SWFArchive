using Backend.Models;
using Backend.Services.Library;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend;

[Authorize]
[ApiController]
[Route("[controller]")]
public class LibraryController : ControllerBase
{
    private LibraryService _libraryService;
    public LibraryController(LibraryService libraryService)
    {
        _libraryService = libraryService;
    }
}