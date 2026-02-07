using System.ComponentModel.DataAnnotations;
using System.Text;
using Backend.Services.Email;
using Google.Apis.Gmail.v1.Data;
using MimeKit.Encodings;

namespace Backend.Services;

public class EmailTemplateService // to convert .raw template into mail message
{
    private readonly string _emailPath;
    private readonly EmailConverter _emailConverter;

    public EmailTemplateService(EmailConverter emailConverter)
    {
        _emailConverter = emailConverter;
        _emailPath = "EmailTemplates";
    }

    public async Task<Message> GetTestMail(string to)
    {
        var mail = await _emailConverter.GetRawEmailAsString(_emailPath, "Test");
        var values = new Dictionary<string, string>()
        {
            ["to"] = to,
        };
        var replacedMail= _emailConverter.Apply(mail, values);
        
        var encodedMail = _emailConverter.EncodeRaw(replacedMail);
        return _emailConverter.CreateMessage(encodedMail);
    }

    public async Task<Message> GetResetPasswordMail(string to, string username, string link)
    {
        var mail = await _emailConverter.GetRawEmailAsString(_emailPath, "ResetPassword");
        var values = new Dictionary<string, string>
        {
            ["to"] = to,
            ["username"] = username,
            ["link"] = link,
        };
        var replacedMail= _emailConverter.Apply(mail, values);
        
        var encodedMail = _emailConverter.EncodeRaw(replacedMail);
        return _emailConverter.CreateMessage(encodedMail);
    }

    public async Task<Message> GetConfirmMail(string to, string link)
    {
        var mail = await _emailConverter.GetRawEmailAsString(_emailPath, "ConfirmMail");
        var values = new Dictionary<string, string>
        {
            ["to"] = to,
            ["link"] = link
        };
        var replacedMail = _emailConverter.Apply(mail, values);
        
        var encodeRaw = _emailConverter.EncodeRaw(replacedMail);
        return _emailConverter.CreateMessage(encodeRaw);
    }
}