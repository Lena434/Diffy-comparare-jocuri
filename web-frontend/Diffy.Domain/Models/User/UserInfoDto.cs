using Diffy.Domain.Entities.User;

namespace Diffy.Domain.Models.User;

public class UserInfoDto
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public bool IsBanned { get; set; }
    public DateTime RegisteredOn { get; set; }
}
