using Diffy.Domain.Models.Favorite;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Core;

public class UserFavoriteActions
{
    private readonly UserFavoriteRepository _repo;

    public UserFavoriteActions(UserFavoriteRepository repo)
    {
        _repo = repo;
    }

    protected async Task<List<FavoriteDto>> GetByUserIdActionExecution(int userId)
    {
        var entities = await _repo.GetByUserIdAsync(userId);
        return entities.Select(uf => new FavoriteDto
        {
            GameId = uf.GameId,
            Title = uf.Game.Title,
            ImageUrl = uf.Game.Imgs.FirstOrDefault()?.ImgUrl,
            AddedAt = uf.AddedAt,
        }).ToList();
    }

    protected Task AddActionExecution(int userId, int gameId) =>
        _repo.AddAsync(new UserFavoriteEntity
        {
            UserId = userId,
            GameId = gameId,
            AddedAt = DateTime.UtcNow
        });

    protected Task DeleteActionExecution(int userId, int gameId) =>
        _repo.DeleteAsync(userId, gameId);
}