namespace Diffy.Domain.Entities.Game;

public class GameGameModeEntity
{
    public int GameId { get; set; }
    public GameEntity Game { get; set; } = null!;
    public int GameModeId { get; set; }
    public GameModeEntity GameMode { get; set; } = null!;
}
