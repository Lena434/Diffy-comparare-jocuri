namespace Diffy.Domain.Entities.Game;

public class GameImgEntity
{
    public int Id { get; set; }
    public string ImgUrl { get; set; } = string.Empty;
    public int GameId { get; set; }
    public GameEntity Game { get; set; } = null!;
}