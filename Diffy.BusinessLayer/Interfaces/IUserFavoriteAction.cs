using Diffy.Domain.Models.Favorite;

namespace Diffy.BusinessLayer.Interfaces;

public interface IUserFavoriteAction
{
    Task<List<FavoriteDto>> GetByUserIdAsync(int userId);
    Task AddAsync(int userId, int gameId);
    Task DeleteAsync(int userId, int gameId);
}
