using Diffy.Domain.Models.Game;
using Diffy.Domain.Models.Service;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGameLogic
{
    ServiceResponse CreateGame(GameCreateDto gameCreateDto);
    ServiceResponse GetGameById(int id);
    ServiceResponse GetGameList();
    ServiceResponse UpdateGame(int id, GameUpdateDto gameUpdateDto);
    ServiceResponse DeleteGame(int id);
}

public class ProductCreateDto
{
}