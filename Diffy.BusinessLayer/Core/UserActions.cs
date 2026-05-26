using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.User;
using Diffy.Domain.Models.Service;
using Microsoft.EntityFrameworkCore;

namespace Diffy.BusinessLayer.Core;

public class UserActions
{
    private readonly DiffyDbContext _dbContext;

    public UserActions()
    {
        _dbContext = new DiffyDbContext();
    }

    protected async Task<ServiceResponse> CreateUserActionExecution(UserCreateDto userCreateDto)
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
            await _dbContext.SaveChangesAsync();
            return new ServiceResponse { IsSuccess = true, Message = "User created successfully" };
        }
        catch
        {
            return new ServiceResponse { IsSuccess = false, Message = "User creation failed" };
        }
    }

    protected async Task<ServiceResponse> GetUserByIdActionExecution(int id)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "User found successfully",
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

    protected async Task<ServiceResponse> GetUserListActionExecution()
    {
        var users = await _dbContext.Users.Select(user => new UserInfoDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            IsBanned = user.IsBanned,
            RegisteredOn = user.RegisteredOn
        }).ToListAsync();

        return new ServiceResponse { IsSuccess = true, Data = users };
    }

    protected async Task<ServiceResponse> UpdateUserActionExecution(int id, UserUpdateDto dto)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User update failed" };

        user.Username = dto.Username;
        user.Email = dto.Email;
        user.Role = dto.Role;
        user.IsBanned = dto.IsBanned;

        try
        {
            await _dbContext.SaveChangesAsync();
            return new ServiceResponse { IsSuccess = true, Message = "User updated successfully" };
        }
        catch
        {
            return new ServiceResponse { IsSuccess = false, Message = "User update failed" };
        }
    }

    protected async Task<ServiceResponse> DeleteUserActionExecution(int id)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        try
        {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
            return new ServiceResponse { IsSuccess = true, Message = "User deleted successfully" };
        }
        catch
        {
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };
        }
    }

    protected async Task<ServiceResponse> ChangePasswordActionExecution(int userId, ChangePasswordDto dto)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash))
            return new ServiceResponse { IsSuccess = false, Message = "Incorrect old password." };

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        try
        {
            await _dbContext.SaveChangesAsync();
            return new ServiceResponse { IsSuccess = true, Message = "Password changed successfully." };
        }
        catch
        {
            return new ServiceResponse { IsSuccess = false, Message = "Incorrect old password." };
        }
    }

    protected async Task<ServiceResponse> UpdateProfileActionExecution(int userId, UserProfileUpdateDto dto)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found." };

        if (!string.Equals(dto.NewEmail, user.Email, StringComparison.OrdinalIgnoreCase)
            && await _dbContext.Users.AnyAsync(u => u.Email == dto.NewEmail))
            return new ServiceResponse { IsSuccess = false, Message = "Email already in use." };

        user.Username = dto.Username;
        user.Email = dto.NewEmail;
        try
        {
            await _dbContext.SaveChangesAsync();
            return new ServiceResponse { IsSuccess = true, Message = "Profile updated successfully." };
        }
        catch
        {
            return new ServiceResponse { IsSuccess = false, Message = "User not found." };
        }
    }
}