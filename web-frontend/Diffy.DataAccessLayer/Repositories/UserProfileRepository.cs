using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class UserProfileRepository
{
    private readonly DiffyDbContext _dbContext;

    public UserProfileRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserProfileEntity?> GetByUserIdAsync(int userId)
    {
        return await _dbContext.UserProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
    }

    public async Task AddAsync(UserProfileEntity profile)
    {
        await _dbContext.UserProfiles.AddAsync(profile);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(UserProfileEntity profile)
    {
        _dbContext.UserProfiles.Update(profile);
        await _dbContext.SaveChangesAsync();
    }
}
