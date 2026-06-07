using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class SavedComparisonRepository
{
    private readonly DiffyDbContext _dbContext;

    public SavedComparisonRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<SavedComparisonEntity>> GetByUserIdAsync(int userId)
    {
        return await _dbContext.SavedComparisons
            .Include(sc => sc.SavedComparisonGames)
                .ThenInclude(scg => scg.Game)
            .Where(sc => sc.UserId == userId)
            .OrderByDescending(sc => sc.SavedAt)
            .ToListAsync();
    }

    public async Task<SavedComparisonEntity> AddAsync(int userId, List<int> gameIds)
    {
        var comparison = new SavedComparisonEntity
        {
            UserId = userId,
            SavedAt = DateTime.UtcNow,
            SavedComparisonGames = gameIds.Distinct()
                .Select(id => new SavedComparisonGameEntity { GameId = id })
                .ToList()
        };
        await _dbContext.SavedComparisons.AddAsync(comparison);
        await _dbContext.SaveChangesAsync();

        return await _dbContext.SavedComparisons
            .Include(sc => sc.SavedComparisonGames)
                .ThenInclude(scg => scg.Game)
            .FirstAsync(sc => sc.Id == comparison.Id);
    }

    public async Task DeleteAsync(int id, int userId)
    {
        var comparison = await _dbContext.SavedComparisons
            .FirstOrDefaultAsync(sc => sc.Id == id && sc.UserId == userId);
        if (comparison == null) return;

        _dbContext.SavedComparisons.Remove(comparison);
        await _dbContext.SaveChangesAsync();
    }
}