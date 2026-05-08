namespace Diffy.Domain.Entities.Game;

public class GameEntity
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Developer { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public ICollection<GameGenreEntity> GameGenres { get; set; } = new List<GameGenreEntity>();
    public ICollection<GamePlatformEntity> GamePlatforms { get; set; } = new List<GamePlatformEntity>();
    public ICollection<GameGameModeEntity> GameModes { get; set; } = new List<GameGameModeEntity>();
    public ICollection<GameRatingEntity> Ratings { get; set; } = new List<GameRatingEntity>();
}