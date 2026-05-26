using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Models.Favorite;

namespace Diffy.BusinessLayer.Structure;

public class UserFavoriteActionExecution : UserFavoriteActions, IUserFavoriteAction
{
    public UserFavoriteActionExecution(UserFavoriteRepository repo) : base(repo) { }

    public Task<List<FavoriteDto>> GetByUserIdAsync(int userId) => GetByUserIdActionExecution(userId);
    public Task AddAsync(int userId, int gameId) => AddActionExecution(userId, gameId);
    public Task DeleteAsync(int userId, int gameId) => DeleteActionExecution(userId, gameId);
}