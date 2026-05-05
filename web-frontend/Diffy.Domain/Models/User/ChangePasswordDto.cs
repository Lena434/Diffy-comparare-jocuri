using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.User;

public class ChangePasswordDto
{
    public string Email { get; set; } = string.Empty;

    [Required]
    public string OldPassword { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6)]
    public string NewPassword { get; set; } = string.Empty;
}
