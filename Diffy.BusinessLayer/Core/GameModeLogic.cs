using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Core;

public class GameModeLogic : GameModeActions, IGameMode
{
    public GameModeLogic(GameModeRepository repo) : base(repo) { }

    public new Task<List<GameModeEntity>> GetAllAsync() => base.GetAllAsync();
    public new Task<GameModeEntity?> GetByIdAsync(int id) => base.GetByIdAsync(id);
    public new Task AddAsync(GameModeEntity gameMode) => base.AddAsync(gameMode);
    public new Task DeleteAsync(int id) => base.DeleteAsync(id);
}