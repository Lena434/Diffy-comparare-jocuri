namespace Diffy.Domain.Models.Rating;

public class GameRatingDto
{
    public int UserId { get; set; }
    public int GameId { get; set; }
    public decimal Score { get; set; }
    public DateTime CreatedAt { get; set; }
}
