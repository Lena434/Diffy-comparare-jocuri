using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Core;

public class UserFavoriteLogic : UserFavoriteActions, IUserFavorite
{
    public UserFavoriteLogic(UserFavoriteRepository repo) : base(repo) { }

    public new Task<List<UserFavoriteEntity>> GetByUserIdAsync(int userId) => base.GetByUserIdAsync(userId);
    public new Task AddAsync(int userId, int gameId) => base.AddAsync(userId, gameId);
    public new Task DeleteAsync(int userId, int gameId) => base.DeleteAsync(userId, gameId);
}