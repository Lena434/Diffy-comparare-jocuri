using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.Game;

public class GameImgInputDto
{
    [Required]
    [Url]
    public string Url { get; set; } = string.Empty;
}