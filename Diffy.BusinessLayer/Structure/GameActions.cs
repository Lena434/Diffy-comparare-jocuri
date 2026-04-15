using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.Game;

namespace Diffy.BusinessLayer.Structure;

public class GameActions : IGame
{
    private readonly GameRepository _repo;

    public GameActions(GameRepository repo)
    {
        _repo = repo;
    }

    public Task<List<GameEntity>> GetAllAsync() => _repo.GetAllAsync();
    public Task<GameEntity?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    public Task<List<GameEntity>> GetByIdsAsync(List<int> ids) => _repo.GetByIdsAsync(ids);
    public Task AddAsync(GameEntity game, List<int> genreIds, List<int> platformIds, List<int> gameModeIds) => _repo.AddAsync(game, genreIds, platformIds, gameModeIds);
    public Task UpdateAsync(GameEntity game, List<int> genreIds, List<int> platformIds, List<int> gameModeIds) => _repo.UpdateAsync(game, genreIds, platformIds, gameModeIds);
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
}
