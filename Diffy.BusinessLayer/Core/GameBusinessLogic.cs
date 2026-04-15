using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer.Core;

public class GameBusinessLogic
{
    public IGame GetGame(GameRepository repo) => new GameActions(repo);
}
