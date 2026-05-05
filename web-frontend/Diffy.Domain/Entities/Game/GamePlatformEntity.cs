namespace Diffy.Domain.Entities.Game;

public class GamePlatformEntity
{
    public int GameId { get; set; }
    public GameEntity Game { get; set; } = null!;
    public int PlatformId { get; set; }
    public PlatformEntity Platform { get; set; } = null!;
}
