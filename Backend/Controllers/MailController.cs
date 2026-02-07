using Backend.Services.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class MailController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public MailController(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    [Authorize(Policy = "CanGetMailApi")]
    [HttpGet("oauth/start")]
    public IActionResult OAuthStart()
    {
        var clientId = _configuration["Gmail:ClientId"];
        var redirectUri = "http://localhost:5092/mail/oauth/callback";

        var url =
            "https://accounts.google.com/o/oauth2/v2/auth" +
            $"?client_id={clientId}" +
            $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
            "&response_type=code" +
            "&scope=https://www.googleapis.com/auth/gmail.send" +
            "&access_type=offline" +
            "&prompt=consent";

        return Redirect(url);
    }
    
    [Authorize(Policy = "CanGetMailApi")]
    [HttpGet("oauth/callback")]
    public async Task<IActionResult> OAuthCallback([FromQuery] string code)
    {
        var clientId = _configuration["Gmail:ClientId"];
        var clientSecret = _configuration["Gmail:ClientSecret"];
        var redirectUri = "http://localhost:5092/mail/oauth/callback";

        using var http = new HttpClient();

        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            { "client_id", clientId },
            { "client_secret", clientSecret },
            { "code", code },
            { "redirect_uri", redirectUri },
            { "grant_type", "authorization_code" }
        });

        var response = await http.PostAsync(
            "https://oauth2.googleapis.com/token",
            content
        );

        var json = await response.Content.ReadAsStringAsync();

        return Ok(json);
    }
}