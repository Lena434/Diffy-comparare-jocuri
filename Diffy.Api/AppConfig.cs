namespace Diffy.Api;

public static class AppConfig
{
    public static string JwtKey { get; private set; } = string.Empty;
    public static string JwtIssuer { get; private set; } = string.Empty;
    public static string JwtAudience { get; private set; } = string.Empty;

    public static void Initialize(IConfiguration config)
    {
        JwtKey = config["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is missing from configuration.");
        JwtIssuer = config["Jwt:Issuer"] ?? throw new InvalidOperationException("Jwt:Issuer is missing from configuration.");
        JwtAudience = config["Jwt:Audience"] ?? throw new InvalidOperationException("Jwt:Audience is missing from configuration.");
    }
}
