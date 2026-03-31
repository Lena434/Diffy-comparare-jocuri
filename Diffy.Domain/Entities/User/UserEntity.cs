namespace Diffy.Domain.Entities.User;

public class UserEntity
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public UserRole Role { get; set; }
    public bool IsBanned { get; set; }
    public DateTime RegisteredOn { get; set; }
    
}