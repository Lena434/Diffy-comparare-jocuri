using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Interfaces;

public interface IPlatform
{
    Task<List<PlatformEntity>> GetAllAsync();
    Task<PlatformEntity?> GetByIdAsync(int id);
    Task AddAsync(PlatformEntity platform);
    Task UpdateAsync(int id, string name);
    Task DeleteAsync(int id);
}
