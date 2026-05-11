using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Core;

public class PlatformLogic : PlatformActions, IPlatform
{
    public PlatformLogic(PlatformRepository repo) : base(repo) { }

    public new Task<List<PlatformEntity>> GetAllAsync() => base.GetAllAsync();
    public new Task<PlatformEntity?> GetByIdAsync(int id) => base.GetByIdAsync(id);
    public new Task AddAsync(PlatformEntity platform) => base.AddAsync(platform);
    public new Task DeleteAsync(int id) => base.DeleteAsync(id);
}