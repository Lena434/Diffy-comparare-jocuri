namespace Diffy.Domain.Models.User;

public class ChangePasswordDto
{
    public string Email { get; set; }
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }
}