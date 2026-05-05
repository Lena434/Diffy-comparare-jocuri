using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface IUserProfile
{
    Task<UserProfileEntity?> GetByUserIdAsync(int userId);
    Task AddAsync(UserProfileEntity profile);
    Task UpdateAsync(UserProfileEntity profile);
}
