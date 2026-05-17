using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class UserFavoriteRepository
{
    private readonly DiffyDbContext _dbContext;

    public UserFavoriteRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<UserFavoriteEntity>> GetByUserIdAsync(int userId)
    {
        return await _dbContext.UserFavorites
            .Where(uf => uf.UserId == userId)
            .Include(uf => uf.Game).ThenInclude(g => g.Imgs)
            .ToListAsync();
    }

    public async Task AddAsync(UserFavoriteEntity favorite)
    {
        await _dbContext.UserFavorites.AddAsync(favorite);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int userId, int gameId)
    {
        var favorite = await _dbContext.UserFavorites
            .FirstOrDefaultAsync(uf => uf.UserId == userId && uf.GameId == gameId);
        if (favorite == null) return;

        _dbContext.UserFavorites.Remove(favorite);
        await _dbContext.SaveChangesAsync();
    }
}
