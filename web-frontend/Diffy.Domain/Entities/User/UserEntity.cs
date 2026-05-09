namespace Diffy.Domain.Entities.User;

public class UserEntity
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public bool IsBanned { get; set; }
    public DateTime RegisteredOn { get; set; }
    public UserProfileEntity? UserProfile { get; set; }
}
