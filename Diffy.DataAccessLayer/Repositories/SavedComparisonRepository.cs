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
            .Where(sc => sc.UserId == userId)
            .OrderByDescending(sc => sc.SavedAt)
            .ToListAsync();
    }

    public async Task<SavedComparisonEntity> AddAsync(SavedComparisonEntity comparison)
    {
        await _dbContext.SavedComparisons.AddAsync(comparison);
        await _dbContext.SaveChangesAsync();
        return comparison;
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