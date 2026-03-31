namespace Diffy.Domain.Models.Game;

public class GameUpdateDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Genre { get; set; }
    public decimal Price { get; set; }
}