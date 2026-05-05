using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface IUserFavorite
{
    Task<List<UserFavoriteEntity>> GetByUserIdAsync(int userId);
    Task AddAsync(int userId, int gameId);
    Task DeleteAsync(int userId, int gameId);
}
