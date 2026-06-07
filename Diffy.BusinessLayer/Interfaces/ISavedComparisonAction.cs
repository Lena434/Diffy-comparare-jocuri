using Diffy.Domain.Models.Comparison;

namespace Diffy.BusinessLayer.Interfaces;

public interface ISavedComparisonAction
{
    Task<List<SavedComparisonDto>> GetByUserIdAsync(int userId);
    Task<SavedComparisonDto> AddAsync(int userId, List<int> gameIds);
    Task DeleteAsync(int id, int userId);
}