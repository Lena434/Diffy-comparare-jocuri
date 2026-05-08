using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Structure;

public class UserActions
{
    private readonly DiffyDbContext _dbContext;

    public UserActions()
    {
        _dbContext = new DiffyDbContext();
    }

    internal bool CreateUserAction(UserCreateDto userCreateDto)
    {
        var userEntity = new UserEntity
        {
            Username = userCreateDto.Username,
            Email = userCreateDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(userCreateDto.Password),
            Role = UserRole.User,
            IsBanned = false,
            RegisteredOn = DateTime.UtcNow
        };

        try
        {
            _dbContext.Users.Add(userEntity);
            _dbContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    internal UserInfoDto? GetUserByIdAction(int id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user == null) return null;

        return new UserInfoDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            IsBanned = user.IsBanned,
            RegisteredOn = user.RegisteredOn
        };
    }

    internal List<UserInfoDto> GetUserListAction()
    {
        return _dbContext.Users.Select(user => new UserInfoDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            IsBanned = user.IsBanned,
            RegisteredOn = user.RegisteredOn
        }).ToList();
    }

    internal bool UpdateUserAction(int id, UserUpdateDto dto)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user == null) return false;

        user.Username = dto.Username;
        user.Email = dto.Email;
        user.Role = dto.Role;
        user.IsBanned = dto.IsBanned;

        try
        {
            _dbContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    internal bool DeleteUserAction(int id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user == null) return false;

        try
        {
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    internal bool ChangePasswordAction(string authenticatedEmail, ChangePasswordDto dto)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == authenticatedEmail);
        if (user == null) return false;
        if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash)) return false;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        try
        {
            _dbContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    internal bool UpdateProfileAction(string authenticatedEmail, UserProfileUpdateDto dto)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == authenticatedEmail);
        if (user == null) return false;

        if (dto.NewEmail != authenticatedEmail)
        {
            var emailTaken = _dbContext.Users.Any(u => u.Email == dto.NewEmail && u.Id != user.Id);
            if (emailTaken) return false;
        }

        user.Username = dto.Username;
        user.Email = dto.NewEmail;
        try
        {
            _dbContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }
}
