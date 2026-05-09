using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Structure;

public class UserProfileActions : IUserProfile
{
    private readonly UserProfileRepository _repo;

    public UserProfileActions(UserProfileRepository repo)
    {
        _repo = repo;
    }

    public Task<UserProfileEntity?> GetByUserIdAsync(int userId) => _repo.GetByUserIdAsync(userId);

    public Task AddAsync(UserProfileEntity profile) => _repo.AddAsync(profile);

    public Task UpdateAsync(UserProfileEntity profile) => _repo.UpdateAsync(profile);
}
