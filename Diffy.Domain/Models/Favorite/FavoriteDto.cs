namespace Diffy.Domain.Models.Favorite;

public class FavoriteDto
{
    public int GameId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public DateTime AddedAt { get; set; }
}
