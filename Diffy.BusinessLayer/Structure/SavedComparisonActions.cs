using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Structure;

public class SavedComparisonActions : ISavedComparison
{
    private readonly SavedComparisonRepository _repo;

    public SavedComparisonActions(SavedComparisonRepository repo)
    {
        _repo = repo;
    }

    public Task<List<SavedComparisonEntity>> GetByUserIdAsync(int userId) =>
        _repo.GetByUserIdAsync(userId);

    public Task<SavedComparisonEntity> AddAsync(int userId, List<int> gameIds, List<string> gameTitles) =>
        _repo.AddAsync(new SavedComparisonEntity
        {
            UserId = userId,
            GameIds = string.Join(",", gameIds),
            GameTitles = string.Join(",", gameTitles),
            SavedAt = DateTime.UtcNow,
        });

    public Task DeleteAsync(int id, int userId) =>
        _repo.DeleteAsync(id, userId);
}