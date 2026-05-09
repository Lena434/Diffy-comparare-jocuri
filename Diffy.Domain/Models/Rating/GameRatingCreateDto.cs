using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Rating;

public class GameRatingCreateDto
{
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "GameId must be a positive integer.")]
    public int GameId { get; set; }

    [Required]
    [Range(1.0, 10.0, ErrorMessage = "Score must be between 1.0 and 10.0.")]
    public decimal Score { get; set; }
}
