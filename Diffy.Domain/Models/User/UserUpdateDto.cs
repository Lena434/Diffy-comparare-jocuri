using Diffy.Domain.Entities.User;
using System.ComponentModel.DataAnnotations;

namespace Diffy.Domain.Models.User;

public class UserUpdateDto
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public UserRole Role { get; set; }
    public bool IsBanned { get; set; }
}