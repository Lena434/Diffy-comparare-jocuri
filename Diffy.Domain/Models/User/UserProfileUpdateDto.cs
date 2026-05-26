using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.User;

public class UserProfileUpdateDto
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string NewEmail { get; set; } = string.Empty;
}
