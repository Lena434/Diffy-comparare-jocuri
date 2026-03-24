using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;

namespace Diffy.BusinessLayer;

public class BusinessLogic
{
    public BusinessLogic()
    {
        
    }

    public IGameLogic GetGameLogic()
    {
        return new GameLogic();
    }

    public IUserLogic GetUserLogic()
    {
        return new UserLogic();
    }
}