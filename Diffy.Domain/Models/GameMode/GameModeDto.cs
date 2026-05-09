using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.GameMode;

public class GameModeDto
{
    public int Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;
}
