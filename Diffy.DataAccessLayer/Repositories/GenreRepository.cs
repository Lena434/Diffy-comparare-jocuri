using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class GenreRepository
{
    private readonly DiffyDbContext _dbContext;

    public GenreRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<GenreEntity>> GetAllAsync()
    {
        return await _dbContext.Genres.ToListAsync();
    }

    public async Task<GenreEntity?> GetByIdAsync(int id)
    {
        return await _dbContext.Genres.FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task AddAsync(GenreEntity genre)
    {
        await _dbContext.Genres.AddAsync(genre);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var genre = await _dbContext.Genres.FirstOrDefaultAsync(g => g.Id == id);
        if (genre == null) return;

        _dbContext.Genres.Remove(genre);
        await _dbContext.SaveChangesAsync();
    }
}
