using Diffy.Domain.Models.Rating;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.Game;

namespace Diffy.BusinessLayer.Core;

public class GameRatingActions
{
    private readonly GameRatingRepository _repo;

    public GameRatingActions(GameRatingRepository repo)
    {
        _repo = repo;
    }

    protected async Task<List<GameRatingDto>> GetByGameIdActionExecution(int gameId)
    {
        var entities = await _repo.GetByGameIdAsync(gameId);
        return entities.Select(gr => new GameRatingDto
        {
            UserId = gr.UserId,
            GameId = gr.GameId,
            Score = gr.Score,
            CreatedAt = gr.CreatedAt,
        }).ToList();
    }

    protected Task AddActionExecution(int userId, int gameId, decimal score) =>
        _repo.AddAsync(new GameRatingEntity
        {
            UserId = userId,
            GameId = gameId,
            Score = score,
            CreatedAt = DateTime.UtcNow
        });
}