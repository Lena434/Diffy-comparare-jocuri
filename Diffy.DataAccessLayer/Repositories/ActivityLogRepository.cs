using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class ActivityLogRepository
{
    private readonly DiffyDbContext _dbContext;

    public ActivityLogRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<ActivityLogEntity>> GetByUserIdAsync(int userId, int limit = 20)
    {
        return await _dbContext.ActivityLogs
            .Where(al => al.UserId == userId)
            .OrderByDescending(al => al.CreatedAt)
            .Take(limit)
            .ToListAsync();
    }

    public async Task AddAsync(ActivityLogEntity log)
    {
        await _dbContext.ActivityLogs.AddAsync(log);
        await _dbContext.SaveChangesAsync();
    }
}