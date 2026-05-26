using Diffy.Domain.Models.Comparison;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer.Core;

public class SavedComparisonActions
{
    private readonly SavedComparisonRepository _repo;

    public SavedComparisonActions(SavedComparisonRepository repo)
    {
        _repo = repo;
    }

    protected async Task<List<SavedComparisonDto>> GetByUserIdActionExecution(int userId)
    {
        var entities = await _repo.GetByUserIdAsync(userId);
        return entities.Select(sc => new SavedComparisonDto
        {
            Id = sc.Id,
            GameIds = sc.SavedComparisonGames.Select(scg => scg.GameId).ToList(),
            GameTitles = sc.SavedComparisonGames.Select(scg => scg.Game.Title).ToList(),
            SavedAt = sc.SavedAt,
        }).ToList();
    }

    protected async Task<SavedComparisonDto> AddActionExecution(int userId, List<int> gameIds)
    {
        var entity = await _repo.AddAsync(userId, gameIds);
        return new SavedComparisonDto
        {
            Id = entity.Id,
            GameIds = entity.SavedComparisonGames.Select(scg => scg.GameId).ToList(),
            GameTitles = entity.SavedComparisonGames.Select(scg => scg.Game.Title).ToList(),
            SavedAt = entity.SavedAt,
        };
    }

    protected Task DeleteActionExecution(int id, int userId) =>
        _repo.DeleteAsync(id, userId);
}