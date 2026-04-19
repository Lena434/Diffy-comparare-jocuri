namespace Diffy.Domain.Entities;

public class PlatformEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Game.GamePlatformEntity> GamePlatforms { get; set; } = new List<Game.GamePlatformEntity>();
}