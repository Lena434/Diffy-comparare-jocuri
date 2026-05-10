namespace Diffy.Domain.Entities.Game;

public class GameEntity
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Developer { get; set; }
    public string Publisher { get; set; }
    public int ReleaseYear { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public ICollection<GameGenreEntity> GameGenres { get; set; } = new List<GameGenreEntity>();
    public ICollection<GamePlatformEntity> GamePlatforms { get; set; } = new List<GamePlatformEntity>();
    public ICollection<GameGameModeEntity> GameModes { get; set; } = new List<GameGameModeEntity>();
    public ICollection<GameRatingEntity> Ratings { get; set; } = new List<GameRatingEntity>();
}