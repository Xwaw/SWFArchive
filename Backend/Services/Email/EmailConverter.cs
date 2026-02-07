using System.Text;
using Google.Apis.Gmail.v1.Data;

namespace Backend.Services.Email;

public class EmailConverter // class for handling business matters
{
    public async Task<string> GetRawEmailAsString(string path, string templateName)
    {
        return await File.ReadAllTextAsync(Path.Combine(path, $"{templateName}.raw"));
    }

    public string Apply(string template, Dictionary<string, string> values)
    {
        return values.Aggregate(
            template,
            (current, kv) =>
                current.Replace($"{{{{{kv.Key}}}}}", kv.Value ?? string.Empty)
        );
    }
    
    public string EncodeRaw(string rawEmail)
    {
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(rawEmail))
            .Replace('+', '-')
            .Replace('/', '_')
            .Replace("=", "");
    }

    public Message CreateMessage(string encodedRaw)
    {
        return new Message
        {
            Raw = encodedRaw
        };
    }
}