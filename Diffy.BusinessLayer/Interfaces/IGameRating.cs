using Diffy.Domain.Entities.Game;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGameRating
{
    Task<List<GameRatingEntity>> GetByGameIdAsync(int gameId);
    Task AddAsync(int userId, int gameId, decimal score);
}
