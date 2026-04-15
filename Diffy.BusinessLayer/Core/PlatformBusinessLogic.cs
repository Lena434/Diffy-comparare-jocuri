using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer.Core;

public class PlatformBusinessLogic
{
    public IPlatform GetPlatform(PlatformRepository repo) => new PlatformActions(repo);
}
