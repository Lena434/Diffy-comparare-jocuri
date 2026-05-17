using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.Game;

namespace Diffy.BusinessLayer.Core;

public class GameRatingLogic : GameRatingActions, IGameRating
{
    public GameRatingLogic(GameRatingRepository repo) : base(repo) { }

    public new Task<List<GameRatingEntity>> GetByGameIdAsync(int gameId) => base.GetByGameIdAsync(gameId);
    public new Task AddAsync(int userId, int gameId, decimal score) => base.AddAsync(userId, gameId, score);
}