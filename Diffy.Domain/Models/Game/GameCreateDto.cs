namespace Diffy.Domain.Models.Game;

public class GameCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Developer { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public List<int> GenreIds { get; set; } = new();
    public List<int> PlatformIds { get; set; } = new();
    public List<int> GameModeIds { get; set; } = new();
}
