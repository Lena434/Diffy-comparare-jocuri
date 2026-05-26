using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.GameMode;

public class GameModeInputDto
{
    [Required]
    [StringLength(100)]
    
    public string Name { get; set; }
}