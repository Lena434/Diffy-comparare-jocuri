using Diffy.Domain.Entities.Game;

namespace Diffy.Domain.Entities.User;

public class UserFavoriteEntity
{
    public int UserId { get; set; }
    public UserEntity User { get; set; } = null!;
    public int GameId { get; set; }
    public GameEntity Game { get; set; } = null!;
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}
