using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.Domain.Models.Game;
using Diffy.Domain.Models.Service;

namespace Diffy.BusinessLayer.Core;

public class GameLogic: GameActions, IGameLogic
{
    public ServiceResponse CreateGame(GameCreateDto gameCreateDto)
    {
        var result = CreateGameAction(gameCreateDto);
        if (!result)
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Game creation failed"
            };
        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Game created successfully"
        };
    }

    public ServiceResponse GetGameById(int id)
    {
        var result = GetGameByIdAction(id);
        if (result == null)
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Game not found"
            };
        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Game found successfully",
            Data = result
        };
    }

    public ServiceResponse GetGameList()
    {
        var games = GetGameListAction();
        return new ServiceResponse
        {
            IsSuccess = true,
            Data = games
        };
    }

    public ServiceResponse UpdateGame(int id, GameUpdateDto gameUpdateDto)
    {
        var result = UpdateGameAction(id, gameUpdateDto);
        if (!result)
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Game update failed"
            };
        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Game updated successfully"
        };
    }

    public ServiceResponse DeleteGame(int id)
    {
        var result = DeleteGameAction(id);
        if (!result)
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Game deletion failed"
            };
        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Game deleted successfully"
        };
    }
}