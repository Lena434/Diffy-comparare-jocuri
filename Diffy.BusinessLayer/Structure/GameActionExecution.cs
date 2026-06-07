using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Models.Game;

namespace Diffy.BusinessLayer.Structure;

public class GameActionExecution : GameActions, IGameAction
{
    public GameActionExecution(GameRepository repo) : base(repo) { }

    public Task<List<GameInfoDto>> GetAllAsync() => GetAllActionExecution();
    public Task<GameInfoDto?> GetByIdAsync(int id) => GetByIdActionExecution(id);
    public Task<List<GameInfoDto>> GetByIdsAsync(List<int> ids) => GetByIdsActionExecution(ids);
    public Task AddAsync(GameCreateDto dto) => AddActionExecution(dto);
    public Task UpdateAsync(int id, GameUpdateDto dto) => UpdateActionExecution(id, dto);
    public Task DeleteAsync(int id) => DeleteActionExecution(id);
}