namespace Diffy.Domain.Entities.Game;

public class GameGenreEntity
{
    public int GameId { get; set; }
    public GameEntity Game { get; set; } = null!;
    public int GenreId { get; set; }
    public GenreEntity Genre { get; set; } = null!;
}
