using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Core;

public class SavedComparisonLogic : SavedComparisonActions, ISavedComparison
{
    public SavedComparisonLogic(SavedComparisonRepository repo) : base(repo) { }

    public new Task<List<SavedComparisonEntity>> GetByUserIdAsync(int userId) => base.GetByUserIdAsync(userId);
    public new Task<SavedComparisonEntity> AddAsync(int userId, List<int> gameIds, List<string> gameTitles) => base.AddAsync(userId, gameIds, gameTitles);
    public new Task DeleteAsync(int id, int userId) => base.DeleteAsync(id, userId);
}