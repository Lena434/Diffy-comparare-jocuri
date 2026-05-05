using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Rating;

public class GameRatingCreateDto
{
    [Required]
    [Range(1, int.MaxValue)]
    public int GameId { get; set; }

    [Required]
    [Range(1.0, 10.0)]
    public decimal Score { get; set; }
}
