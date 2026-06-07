using Diffy.Domain.Models.Platform;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Core;

public class PlatformActions
{
    private readonly PlatformRepository _repo;

    public PlatformActions(PlatformRepository repo)
    {
        _repo = repo;
    }

    protected async Task<List<PlatformDto>> GetAllActionExecution()
    {
        var entities = await _repo.GetAllAsync();
        return entities.Select(e => new PlatformDto { Id = e.Id, Name = e.Name }).ToList();
    }

    protected async Task<PlatformDto?> GetByIdActionExecution(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return null;
        return new PlatformDto { Id = entity.Id, Name = entity.Name };
    }

    protected Task AddActionExecution(PlatformInputDto dto) =>
        _repo.AddAsync(new PlatformEntity { Name = dto.Name });

    protected Task DeleteActionExecution(int id) => _repo.DeleteAsync(id);
}