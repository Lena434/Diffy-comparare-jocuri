using Diffy.Domain.Entities.User;

namespace Diffy.Domain.Models.User;

public class UserInfoDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public UserRole Role { get; set; }
    public bool IsBanned { get; set; }
    public DateTime RegisteredOn { get; set; }

}