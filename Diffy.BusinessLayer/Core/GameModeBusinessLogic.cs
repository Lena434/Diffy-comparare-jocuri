using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer.Core;

public class GameModeBusinessLogic
{
    public IGameMode GetGameMode(GameModeRepository repo) => new GameModeActions(repo);
}
