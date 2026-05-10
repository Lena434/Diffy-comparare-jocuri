using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Game;

public class GameCreateDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(2000)]
    public string Description { get; set; } = string.Empty;

    [StringLength(100)]
    public string Developer { get; set; } = string.Empty;

    [StringLength(100)]
    public string Publisher { get; set; } = string.Empty;

    [Range(1970, 2100)]
    public int ReleaseYear { get; set; }

    [Range(0, 10000)]
    public decimal Price { get; set; }

    [Url]
    public string? ImageUrl { get; set; }

    public List<int> GenreIds { get; set; } = new();
    public List<int> PlatformIds { get; set; } = new();
    public List<int> GameModeIds { get; set; } = new();
}
