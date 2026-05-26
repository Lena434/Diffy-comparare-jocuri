namespace Diffy.Domain.Entities.User;

public class SavedComparisonEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public UserEntity User { get; set; } = null!;
    public DateTime SavedAt { get; set; } = DateTime.UtcNow;

    public ICollection<SavedComparisonGameEntity> SavedComparisonGames { get; set; } = new List<SavedComparisonGameEntity>();
}