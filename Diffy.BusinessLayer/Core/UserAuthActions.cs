using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Diffy.BusinessLayer.Core;

public class UserAuthActions
{
    protected async Task<ServiceResponse> RegisterActionExecution(UserCreateDto userCreateDto)
    {
        using var db = new DiffyDbContext();
        var exists = await db.Users.AnyAsync(u => u.Email == userCreateDto.Email);
        if (exists)
            return new ServiceResponse { IsSuccess = false, Message = "User already exists." };

        var user = new UserEntity
        {
            Username = userCreateDto.Username,
            Email = userCreateDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(userCreateDto.Password),
            Role = UserRole.User,
            IsBanned = false,
            RegisteredOn = DateTime.UtcNow
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return new ServiceResponse { IsSuccess = true, Message = "Registration successful." };
    }

    protected async Task<ServiceResponse> LoginActionExecution(UserLoginDto userLoginDto)
    {
        using var db = new DiffyDbContext();

        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == userLoginDto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(userLoginDto.Password, user.PasswordHash))
            return new ServiceResponse { IsSuccess = false, Message = "Invalid credentials." };

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