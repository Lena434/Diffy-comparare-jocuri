using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Genre;

public class GenreInputDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
}