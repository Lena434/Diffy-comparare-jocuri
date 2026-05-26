using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Models.Rating;

namespace Diffy.BusinessLayer.Structure;

public class GameRatingActionExecution : GameRatingActions, IGameRatingAction
{
    public GameRatingActionExecution(GameRatingRepository repo) : base(repo) { }

    public Task<List<GameRatingDto>> GetByGameIdAsync(int gameId) => GetByGameIdActionExecution(gameId);
    public Task AddAsync(int userId, int gameId, decimal score) => AddActionExecution(userId, gameId, score);
}