using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Comparison;

public class SavedComparisonCreateDto
{
    [Required]
    [MinLength(2, ErrorMessage = "A comparison requires at least 2 games.")]
    public List<int> GameIds { get; set; } = new List<int>();
}