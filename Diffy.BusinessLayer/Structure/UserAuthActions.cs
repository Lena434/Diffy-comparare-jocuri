using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Structure;

public class UserAuthActions
{
    internal ServiceResponse RegisterAction(UserCreateDto userCreateDto)
    {
        using var db = new DiffyDbContext();
        var exists = db.Users.Any(u => u.Email == userCreateDto.Email);
        if (exists)
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User already exists."
            };

        var user = new UserEntity
        {
            Username = userCreateDto.Username,
            Email = userCreateDto.Email,
            PasswordHash = userCreateDto.Password,
            Role = UserRole.User,
            IsBanned = false,
            RegisteredOn = DateTime.UtcNow
        };
        
        db.Users.Add(user);
        db.SaveChanges();

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Registration successful."
        };
    }

    internal ServiceResponse LoginAction(UserLoginDto userLoginDto)
    {
        using var db = new DiffyDbContext();

        var user = db.Users.FirstOrDefault(u => u.Email == userLoginDto.Email);
        if (user == null || user.PasswordHash != userLoginDto.Password)
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Invalid credentials."
            };
        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Login successful.",
            Data = new UserInfoDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                IsBanned = user.IsBanned,
                RegisteredOn = user.RegisteredOn
            }
        };
    }
}