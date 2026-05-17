using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Core;

public class UserProfileLogic : UserProfileActions, IUserProfile
{
    public UserProfileLogic(UserProfileRepository repo) : base(repo) { }

    public new Task<UserProfileEntity?> GetByUserIdAsync(int userId) => base.GetByUserIdAsync(userId);
    public new Task AddAsync(UserProfileEntity profile) => base.AddAsync(profile);
    public new Task UpdateAsync(UserProfileEntity profile) => base.UpdateAsync(profile);
}