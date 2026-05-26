using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Models.Comparison;

namespace Diffy.BusinessLayer.Structure;

public class SavedComparisonActionExecution : SavedComparisonActions, ISavedComparisonAction
{
    public SavedComparisonActionExecution(SavedComparisonRepository repo) : base(repo) { }

    public Task<List<SavedComparisonDto>> GetByUserIdAsync(int userId) => GetByUserIdActionExecution(userId);
    public Task<SavedComparisonDto> AddAsync(int userId, List<int> gameIds) => AddActionExecution(userId, gameIds);
    public Task DeleteAsync(int id, int userId) => DeleteActionExecution(id, userId);
}