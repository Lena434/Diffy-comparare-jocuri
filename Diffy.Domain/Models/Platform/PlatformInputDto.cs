using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Platform;

public class PlatformInputDto
{
    [Required]
    [StringLength(100, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;
}