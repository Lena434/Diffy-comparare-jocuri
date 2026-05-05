using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Structure;

public class GameModeActions : IGameMode
{
    private readonly GameModeRepository _repo;

    public GameModeActions(GameModeRepository repo)
    {
        _repo = repo;
    }

    public Task<List<GameModeEntity>> GetAllAsync() => _repo.GetAllAsync();
    public Task<GameModeEntity?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    public Task AddAsync(GameModeEntity gameMode) => _repo.AddAsync(gameMode);
    public Task UpdateAsync(int id, string name) => _repo.UpdateAsync(id, name);
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
}
