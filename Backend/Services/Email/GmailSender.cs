using Google.Apis.Gmail.v1;

namespace Backend.Services.Email;

public class GmailSender // just to send emails
{
    private readonly GmailService _gmail;
    private readonly EmailTemplateService _emailTemplateService;

    private const string UserId = "me";

    public GmailSender(GmailService gmail, EmailTemplateService emailTemplateService)
    {
        _gmail = gmail;
        _emailTemplateService = emailTemplateService;
    }

    public async Task SendTestMail(string to) // debug function, can be used to check if the server can send email.
    {
        var message = await _emailTemplateService.GetTestMail(to);
        await _gmail.Users.Messages.Send(message, UserId).ExecuteAsync();
    }

    public async Task SendResetPasswordMail(string to, string username, string link)
    {
        var message = await _emailTemplateService.GetResetPasswordMail(to, username, link);
        await _gmail.Users.Messages.Send(message, UserId).ExecuteAsync();
    }

    public async Task SendConfirmMail(string to, string link)
    {
        var message = await _emailTemplateService.GetConfirmMail(to, link);
        await _gmail.Users.Messages.Send(message, UserId).ExecuteAsync();
    }
}