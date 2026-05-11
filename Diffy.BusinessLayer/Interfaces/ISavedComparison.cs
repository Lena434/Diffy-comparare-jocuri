using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface ISavedComparison
{
    Task<List<SavedComparisonEntity>> GetByUserIdAsync(int userId);
    Task<SavedComparisonEntity> AddAsync(int userId, List<int> gameIds, List<string> gameTitles);
    Task DeleteAsync(int id, int userId);
}