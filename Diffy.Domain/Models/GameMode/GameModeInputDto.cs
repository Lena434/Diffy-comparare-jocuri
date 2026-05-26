using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.GameMode;

public class GameModeInputDto
{
    [Required]
    [StringLength(100, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;
}