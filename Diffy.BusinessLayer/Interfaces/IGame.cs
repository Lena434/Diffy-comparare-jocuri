using Diffy.Domain.Entities.Game;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGame
{
    Task<List<GameEntity>> GetAllAsync();
    Task<GameEntity?> GetByIdAsync(int id);
    Task<List<GameEntity>> GetByIdsAsync(List<int> ids);
    Task AddAsync(GameEntity game, List<int> genreIds, List<int> platformIds, List<int> gameModeIds);
    Task UpdateAsync(GameEntity game, List<int> genreIds, List<int> platformIds, List<int> gameModeIds);
    Task DeleteAsync(int id);
}
