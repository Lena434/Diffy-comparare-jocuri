using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Structure;

public class UserFavoriteActions : IUserFavorite
{
    private readonly UserFavoriteRepository _repo;

    public UserFavoriteActions(UserFavoriteRepository repo)
    {
        _repo = repo;
    }

    public Task<List<UserFavoriteEntity>> GetByUserIdAsync(int userId) => _repo.GetByUserIdAsync(userId);

    public Task AddAsync(int userId, int gameId) => _repo.AddAsync(new UserFavoriteEntity
    {
        UserId = userId,
        GameId = gameId,
        AddedAt = DateTime.UtcNow
    });

    public Task DeleteAsync(int userId, int gameId) => _repo.DeleteAsync(userId, gameId);

    public Task<bool> IsFavoriteAsync(int userId, int gameId) => _repo.IsFavoriteAsync(userId, gameId);
}
