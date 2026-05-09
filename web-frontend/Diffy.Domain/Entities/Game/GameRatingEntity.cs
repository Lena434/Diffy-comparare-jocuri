using Diffy.Domain.Entities.User;

namespace Diffy.Domain.Entities.Game;

public class GameRatingEntity
{
    public int UserId { get; set; }
    public UserEntity User { get; set; } = null!;
    public int GameId { get; set; }
    public GameEntity Game { get; set; } = null!;
    public decimal Score { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
