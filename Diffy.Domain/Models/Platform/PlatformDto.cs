using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Platform;

public class PlatformDto
{
    public int Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;
}
