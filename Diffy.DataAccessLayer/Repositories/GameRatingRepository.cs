using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.Game;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class GameRatingRepository
{
    private readonly DiffyDbContext _dbContext;

    public GameRatingRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<GameRatingEntity>> GetByGameIdAsync(int gameId)
    {
        return await _dbContext.GameRatings
            .Where(gr => gr.GameId == gameId)
            .ToListAsync();
    }

    public async Task AddAsync(GameRatingEntity rating)
    {
        var existing = await _dbContext.GameRatings
            .FirstOrDefaultAsync(r => r.UserId == rating.UserId && r.GameId == rating.GameId);

        if (existing != null)
            existing.Score = rating.Score;
        else
            await _dbContext.GameRatings.AddAsync(rating);

        await _dbContext.SaveChangesAsync();
    }
}