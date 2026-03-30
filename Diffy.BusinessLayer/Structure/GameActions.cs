using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Context;
using Diffy.Domain.Entities.Game;
using Diffy.Domain.Models.Game;


namespace Diffy.BusinessLayer.Structure;

public class GameActions
{
    private readonly DiffyDbContext _dbContext;

    public GameActions()
    {
        _dbContext = new DiffyDbContext();
    }
    public bool CreateGameAction(GameCreateDto gameCreateDto)
    {
        var gameEntity = new GameEntity
        {
            Title = gameCreateDto.Title,
            Genre = gameCreateDto.Genre,
            Price = gameCreateDto.Price,
        };

        try
        {
            _dbContext.Games.Add(gameEntity);
            _dbContext.SaveChanges();
            return true;
        } catch  (Exception e)
        {
            return false;
        }
    }

    public GameInfoDto? GetGameByIdAction(int id)
    {
        var gameEntity = _dbContext.Games.FirstOrDefault(g => g.Id == id);
        
        if (gameEntity == null)
            return null;

        var gameInfoDto = new GameInfoDto
        {
            Id = gameEntity.Id,
            Title = gameEntity.Title,
            Genre = gameEntity.Genre,
            Price = gameEntity.Price,
        };
        return gameInfoDto;
    }

    public List<GameInfoDto> GetGameListAction()
    {
        var games = _dbContext.Games.Select(gameEntity => new GameInfoDto
        {
            Id = gameEntity.Id,
            Title = gameEntity.Title,
            Genre = gameEntity.Genre,
            Price = gameEntity.Price,
        }).ToList();
        return games;
    }

    public bool UpdateGameAction(int id, GameUpdateDto gameUpdateDto)
    {
        var game = _dbContext.Games.FirstOrDefault(g => g.Id == id);
        if (game == null) return false;
        
        game.Title = gameUpdateDto.Title;
        game.Genre = gameUpdateDto.Genre;
        game.Price = gameUpdateDto.Price;

        try
        {
            _dbContext.SaveChanges();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public bool DeleteGameAction(int id)
    {
        var game = _dbContext.Games.FirstOrDefault(g => g.Id == id);
        if (game == null) return false;

        try
        {
            _dbContext.Games.Remove(game);
            _dbContext.SaveChanges();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    
    
}