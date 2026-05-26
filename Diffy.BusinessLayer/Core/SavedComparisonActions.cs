using Diffy.Domain.Models.Comparison;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

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
            GameIds = sc.GameIds.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList(),
            GameTitles = sc.GameTitles?.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() ?? [],
            SavedAt = sc.SavedAt,
        }).ToList();
    }

    protected async Task<SavedComparisonDto> AddActionExecution(int userId, List<int> gameIds, List<string> gameTitles)
    {
        var entity = await _repo.AddAsync(new SavedComparisonEntity
        {
            UserId = userId,
            GameIds = string.Join(",", gameIds),
            GameTitles = string.Join(",", gameTitles),
            SavedAt = DateTime.UtcNow,
        });

        return new SavedComparisonDto
        {
            Id = entity.Id,
            GameIds = gameIds,
            GameTitles = gameTitles,
            SavedAt = entity.SavedAt,
        };
    }

    protected Task DeleteActionExecution(int id, int userId) =>
        _repo.DeleteAsync(id, userId);
}