namespace Diffy.Domain.Models.ActivityLog;

public class ActivityLogDto
{
    public int Id { get; set; }
    public string ActivityType { get; set; } = string.Empty;
    public string? Details { get; set; }
    public DateTime CreatedAt { get; set; }
}