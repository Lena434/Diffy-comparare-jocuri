using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.Game;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Repositories;

public class GameRepository
{
    private readonly DiffyDbContext _dbContext;

    public GameRepository(DiffyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<GameEntity>> GetAllAsync()
    {
        return await _dbContext.Games
            .Include(g => g.GameGenres).ThenInclude(gg => gg.Genre)
            .Include(g => g.GamePlatforms).ThenInclude(gp => gp.Platform)
            .Include(g => g.GameModes).ThenInclude(gm => gm.GameMode)
            .Include(g => g.Ratings)
            .ToListAsync();
    }

    public async Task<GameEntity?> GetByIdAsync(int id)
    {
        return await _dbContext.Games
            .Include(g => g.GameGenres).ThenInclude(gg => gg.Genre)
            .Include(g => g.GamePlatforms).ThenInclude(gp => gp.Platform)
            .Include(g => g.GameModes).ThenInclude(gm => gm.GameMode)
            .FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<List<GameEntity>> GetByIdsAsync(List<int> ids)
    {
        return await _dbContext.Games
            .Include(g => g.GameGenres).ThenInclude(gg => gg.Genre)
            .Include(g => g.GamePlatforms).ThenInclude(gp => gp.Platform)
            .Include(g => g.GameModes).ThenInclude(gm => gm.GameMode)
            .Where(g => ids.Contains(g.Id))
            .ToListAsync();
    }

    public async Task AddAsync(GameEntity game, List<int> genreIds, List<int> platformIds, List<int> gameModeIds)
    {
        await _dbContext.Games.AddAsync(game);
        await _dbContext.SaveChangesAsync();

        foreach (var genreId in genreIds)
            await _dbContext.GameGenres.AddAsync(new GameGenreEntity { GameId = game.Id, GenreId = genreId });

        foreach (var platformId in platformIds)
            await _dbContext.GamePlatforms.AddAsync(new GamePlatformEntity { GameId = game.Id, PlatformId = platformId });

        foreach (var gameModeId in gameModeIds)
            await _dbContext.GameGameModes.AddAsync(new GameGameModeEntity { GameId = game.Id, GameModeId = gameModeId });

        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(GameEntity game, List<int> genreIds, List<int> platformIds, List<int> gameModeIds)
    {
        var existing = await _dbContext.Games
            .Include(g => g.GameGenres)
            .Include(g => g.GamePlatforms)
            .Include(g => g.GameModes)
            .FirstOrDefaultAsync(g => g.Id == game.Id);

        if (existing == null) return;

        existing.Title = game.Title;
        existing.Description = game.Description;
        existing.Developer = game.Developer;
        existing.Publisher = game.Publisher;
        existing.ReleaseYear = game.ReleaseYear;
        existing.Price = game.Price;
        existing.ImageUrl = game.ImageUrl;

        _dbContext.GameGenres.RemoveRange(existing.GameGenres);
        _dbContext.GamePlatforms.RemoveRange(existing.GamePlatforms);
        _dbContext.GameGameModes.RemoveRange(existing.GameModes);

        foreach (var genreId in genreIds)
            existing.GameGenres.Add(new GameGenreEntity { GameId = existing.Id, GenreId = genreId });

        foreach (var platformId in platformIds)
            existing.GamePlatforms.Add(new GamePlatformEntity { GameId = existing.Id, PlatformId = platformId });

        foreach (var gameModeId in gameModeIds)
            existing.GameModes.Add(new GameGameModeEntity { GameId = existing.Id, GameModeId = gameModeId });

        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.Id == id);
        if (game == null) return;

        _dbContext.Games.Remove(game);
        await _dbContext.SaveChangesAsync();
    }
}
