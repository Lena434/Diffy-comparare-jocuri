using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Genre;

public class GenreDto
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
}
