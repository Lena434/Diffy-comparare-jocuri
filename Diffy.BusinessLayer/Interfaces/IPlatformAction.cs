using Diffy.Domain.Models.Platform;

namespace Diffy.BusinessLayer.Interfaces;

public interface IPlatformAction
{
    Task<List<PlatformDto>> GetAllAsync();
    Task<PlatformDto?> GetByIdAsync(int id);
    Task AddAsync(PlatformInputDto dto);
    Task DeleteAsync(int id);
}
