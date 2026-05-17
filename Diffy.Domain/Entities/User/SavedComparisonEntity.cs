namespace Diffy.Domain.Entities.User;

public class SavedComparisonEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public UserEntity User { get; set; }
    public string GameIds { get; set; } = string.Empty; // ex: "1,2,3"
    public string? GameTitles { get; set; }              // ex: "Elden Ring,Hollow Knight"
    public DateTime SavedAt { get; set; } = DateTime.UtcNow;
}