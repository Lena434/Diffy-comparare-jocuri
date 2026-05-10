using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.Game;

namespace Diffy.BusinessLayer.Structure;

public class GameRatingActions : IGameRating
{
    private readonly GameRatingRepository _repo;

    public GameRatingActions(GameRatingRepository repo)
    {
        _repo = repo;
    }

    public Task<List<GameRatingEntity>> GetByGameIdAsync(int gameId) => _repo.GetByGameIdAsync(gameId);

    public Task AddAsync(int userId, int gameId, decimal score) => _repo.AddAsync(new GameRatingEntity
    {
        UserId = userId,
        GameId = gameId,
        Score = score,
        CreatedAt = DateTime.UtcNow
    });
}
