using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Models.Platform;

namespace Diffy.BusinessLayer.Structure;

public class PlatformActionExecution : PlatformActions, IPlatformAction
{
    public PlatformActionExecution(PlatformRepository repo) : base(repo) { }

    public Task<List<PlatformDto>> GetAllAsync() => GetAllActionExecution();
    public Task<PlatformDto?> GetByIdAsync(int id) => GetByIdActionExecution(id);
    public Task AddAsync(PlatformInputDto dto) => AddActionExecution(dto);
    public Task DeleteAsync(int id) => DeleteActionExecution(id);
}