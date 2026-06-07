using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Structure;

public class UserProfileActionExecution : UserProfileActions, IUserProfileAction
{
    public UserProfileActionExecution(UserProfileRepository repo) : base(repo) { }

    public Task<UserProfileDto?> GetByUserIdAsync(int userId) => GetByUserIdActionExecution(userId);
    public Task AddAsync(int userId, UserProfileDto dto) => AddActionExecution(userId, dto);
    public Task UpdateAsync(int userId, UserProfileDto dto) => UpdateActionExecution(userId, dto);
}