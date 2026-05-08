namespace Diffy.Domain.Entities;

public class GameModeEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Game.GameGameModeEntity> GameGameModes { get; set; } = new List<Game.GameGameModeEntity>();
}