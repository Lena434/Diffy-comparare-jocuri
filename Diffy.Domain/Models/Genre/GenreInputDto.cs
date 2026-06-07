using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Genre;

public class GenreInputDto
{
    [Required]
    [StringLength(100, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;
}