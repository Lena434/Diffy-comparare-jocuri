namespace Diffy.Domain.Models.Game;

public class GameImgDto
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public int GameId { get; set; }
}