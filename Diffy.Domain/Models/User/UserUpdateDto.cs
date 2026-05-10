using Diffy.Domain.Entities.User;

namespace Diffy.Domain.Models.User;

public class UserUpdateDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public UserRole Role { get; set; }
    public bool IsBanned { get; set; }
}