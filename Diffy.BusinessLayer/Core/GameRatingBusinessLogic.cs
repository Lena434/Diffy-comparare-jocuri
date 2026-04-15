using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer.Core;

public class GameRatingBusinessLogic
{
    public IGameRating GetGameRating(GameRatingRepository repo) => new GameRatingActions(repo);
}
