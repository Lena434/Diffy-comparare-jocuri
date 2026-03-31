namespace Diffy.Domain.Models.User;

public class UserProfileUpdateDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string NewEmail { get; set; }
}