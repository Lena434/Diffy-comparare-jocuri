namespace Diffy.Domain.Models.Game;

public class GameInfoDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Developer { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public decimal Price { get; set; }
    public List<GameImgDto> Imgs { get; set; } = new();
    public List<string> Genres { get; set; } = new();
    public List<string> Platforms { get; set; } = new();
    public List<string> GameModes { get; set; } = new();
    public decimal AverageRating { get; set; }
}
