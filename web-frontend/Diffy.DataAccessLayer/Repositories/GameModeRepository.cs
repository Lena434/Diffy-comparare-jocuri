using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class GameModeRepository
{
    private readonly DiffyDbContext _dbContext;

    public GameModeRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<GameModeEntity>> GetAllAsync()
    {
        return await _dbContext.GameModes.ToListAsync();
    }

    public async Task<GameModeEntity?> GetByIdAsync(int id)
    {
        return await _dbContext.GameModes.FirstOrDefaultAsync(gm => gm.Id == id);
    }

    public async Task AddAsync(GameModeEntity gameMode)
    {
        await _dbContext.GameModes.AddAsync(gameMode);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(int id, string name)
    {
        var gameMode = await _dbContext.GameModes.FirstOrDefaultAsync(gm => gm.Id == id);
        if (gameMode == null) return;

        gameMode.Name = name;
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var gameMode = await _dbContext.GameModes.FirstOrDefaultAsync(gm => gm.Id == id);
        if (gameMode == null) return;

        _dbContext.GameModes.Remove(gameMode);
        await _dbContext.SaveChangesAsync();
    }
}
