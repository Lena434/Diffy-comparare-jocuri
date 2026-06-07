using Diffy.Domain.Models.Rating;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGameRatingAction
{
    Task<List<GameRatingDto>> GetByGameIdAsync(int gameId);
    Task AddAsync(int userId, int gameId, decimal score);
}
