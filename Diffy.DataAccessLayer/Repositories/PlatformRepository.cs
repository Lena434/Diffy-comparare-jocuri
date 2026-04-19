using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class PlatformRepository
{
    private readonly DiffyDbContext _dbContext;

    public PlatformRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<PlatformEntity>> GetAllAsync()
    {
        return await _dbContext.Platforms.ToListAsync();
    }

    public async Task<PlatformEntity?> GetByIdAsync(int id)
    {
        return await _dbContext.Platforms.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddAsync(PlatformEntity platform)
    {
        await _dbContext.Platforms.AddAsync(platform);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var platform = await _dbContext.Platforms.FirstOrDefaultAsync(p => p.Id == id);
        if (platform == null) return;

        _dbContext.Platforms.Remove(platform);
        await _dbContext.SaveChangesAsync();
    }
}
