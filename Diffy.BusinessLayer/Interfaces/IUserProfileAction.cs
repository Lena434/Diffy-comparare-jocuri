using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface IUserProfileAction
{
    Task<UserProfileDto?> GetByUserIdAsync(int userId);
    Task AddAsync(int userId, UserProfileDto dto);
    Task UpdateAsync(int userId, UserProfileDto dto);
}
