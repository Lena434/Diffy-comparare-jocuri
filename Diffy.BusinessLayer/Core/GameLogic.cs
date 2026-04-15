using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities;
using Diffy.Domain.Entities.Game;
using Diffy.Domain.Models.Game;
using Diffy.Domain.Models.Service;
using Microsoft.EntityFrameworkCore;

namespace Diffy.BusinessLayer.Core;

public class GameLogic : IGameLogic
{
    private readonly DiffyDbContext _dbContext;

    public GameLogic()
    {
        _dbContext = new DiffyDbContext();
    }

    public ServiceResponse CreateGame(GameCreateDto gameCreateDto)
    {
        var gameEntity = new GameEntity
        {
            Title = gameCreateDto.Title,
            Price = gameCreateDto.Price,
        };

        try
        {
            _dbContext.Games.Add(gameEntity);
            _dbContext.SaveChanges();
            return new ServiceResponse { IsSuccess = true, Message = "Game created successfully" };
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Game creation failed" };
        }
    }

    public ServiceResponse GetGameById(int id)
    {
        var gameEntity = _dbContext.Games
            .Include(g => g.GameGenres)
                .ThenInclude(gg => gg.Genre)
            .FirstOrDefault(g => g.Id == id);

        if (gameEntity == null)
            return new ServiceResponse { IsSuccess = false, Message = "Game not found" };

        var result = new GameInfoDto
        {
            Id = gameEntity.Id,
            Title = gameEntity.Title,
            Genres = gameEntity.GameGenres.Select(gg => gg.Genre.Name).ToList(),
            Price = gameEntity.Price,
        };

        return new ServiceResponse { IsSuccess = true, Message = "Game found successfully", Data = result };
    }

    public ServiceResponse GetGameList()
    {
        var games = _dbContext.Games
            .Include(g => g.GameGenres)
                .ThenInclude(gg => gg.Genre)
            .Select(g => new GameInfoDto
            {
                Id = g.Id,
                Title = g.Title,
                Genres = g.GameGenres.Select(gg => gg.Genre.Name).ToList(),
                Price = g.Price,
            })
            .ToList();

        return new ServiceResponse { IsSuccess = true, Data = games };
    }

    public ServiceResponse UpdateGame(int id, GameUpdateDto gameUpdateDto)
    {
        var game = _dbContext.Games
            .Include(g => g.GameGenres)
            .FirstOrDefault(g => g.Id == id);

        if (game == null)
            return new ServiceResponse { IsSuccess = false, Message = "Game update failed" };

        game.Title = gameUpdateDto.Title;
        game.Price = gameUpdateDto.Price;

        try
        {
            _dbContext.SaveChanges();
            return new ServiceResponse { IsSuccess = true, Message = "Game updated successfully" };
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Game update failed" };
        }
    }

    public ServiceResponse DeleteGame(int id)
    {
        var game = _dbContext.Games.FirstOrDefault(g => g.Id == id);
        if (game == null)
            return new ServiceResponse { IsSuccess = false, Message = "Game deletion failed" };

        try
        {
            _dbContext.Games.Remove(game);
            _dbContext.SaveChanges();
            return new ServiceResponse { IsSuccess = true, Message = "Game deleted successfully" };
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Game deletion failed" };
        }
    }
}
