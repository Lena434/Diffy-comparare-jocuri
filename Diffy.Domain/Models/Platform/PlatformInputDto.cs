using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Platform;

public class PlatformInputDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
}