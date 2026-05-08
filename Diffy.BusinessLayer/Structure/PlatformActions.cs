using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Structure;

public class PlatformActions : IPlatform
{
    private readonly PlatformRepository _repo;

    public PlatformActions(PlatformRepository repo)
    {
        _repo = repo;
    }

    public Task<List<PlatformEntity>> GetAllAsync() => _repo.GetAllAsync();
    public Task<PlatformEntity?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    public Task AddAsync(PlatformEntity platform) => _repo.AddAsync(platform);
    public Task UpdateAsync(int id, string name) => _repo.UpdateAsync(id, name);
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
}
