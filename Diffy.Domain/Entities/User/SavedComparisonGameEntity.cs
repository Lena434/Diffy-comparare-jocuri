using Diffy.Domain.Entities.Game;

namespace Diffy.Domain.Entities.User;

public class SavedComparisonGameEntity
{
    public int SavedComparisonId { get; set; }
    public SavedComparisonEntity SavedComparison { get; set; } = null!;

    public int GameId { get; set; }
    public GameEntity Game { get; set; } = null!;
}