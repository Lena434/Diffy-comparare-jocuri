using Diffy.Domain.Models.GameMode;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Core;

public class GameModeActions
{
    private readonly GameModeRepository _repo;

    public GameModeActions(GameModeRepository repo)
    {
        _repo = repo;
    }

    protected async Task<List<GameModeDto>> GetAllActionExecution()
    {
        var entities = await _repo.GetAllAsync();
        return entities.Select(e => new GameModeDto { Id = e.Id, Name = e.Name }).ToList();
    }

    protected async Task<GameModeDto?> GetByIdActionExecution(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return null;
        return new GameModeDto { Id = entity.Id, Name = entity.Name };
    }

    protected Task AddActionExecution(GameModeInputDto dto) =>
        _repo.AddAsync(new GameModeEntity { Name = dto.Name });

    protected Task DeleteActionExecution(int id) => _repo.DeleteAsync(id);
}