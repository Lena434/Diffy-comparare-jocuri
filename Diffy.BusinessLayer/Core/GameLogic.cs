using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.Game;

namespace Diffy.BusinessLayer.Core;

public class GameLogic : GameActions, IGame
{
    public GameLogic(GameRepository repo) : base(repo) { }

    public new Task<List<GameEntity>> GetAllAsync() => base.GetAllAsync();
    public new Task<GameEntity?> GetByIdAsync(int id) => base.GetByIdAsync(id);
    public new Task<List<GameEntity>> GetByIdsAsync(List<int> ids) => base.GetByIdsAsync(ids);
    public new Task AddAsync(GameEntity game, List<int> genreIds, List<int> platformIds, List<int> gameModeIds) => base.AddAsync(game, genreIds, platformIds, gameModeIds);
    public new Task UpdateAsync(GameEntity game, List<int> genreIds, List<int> platformIds, List<int> gameModeIds) => base.UpdateAsync(game, genreIds, platformIds, gameModeIds);
    public new Task DeleteAsync(int id) => base.DeleteAsync(id);
}