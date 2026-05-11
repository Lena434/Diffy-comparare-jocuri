namespace Diffy.Domain.Entities.User;

public enum ActivityType
{
    Login,
    FavoriteAdded,
    FavoriteRemoved,
    ComparisonSaved,
    ComparisonRemoved,
    RatingGiven,
}

public class ActivityLogEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public UserEntity User { get; set; } = null!;
    public ActivityType ActivityType { get; set; }
    public string? Details { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}