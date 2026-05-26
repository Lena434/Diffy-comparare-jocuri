using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Models.GameMode;

namespace Diffy.BusinessLayer.Structure;

public class GameModeActionExecution : GameModeActions, IGameModeAction
{
    public GameModeActionExecution(GameModeRepository repo) : base(repo) { }

    public Task<List<GameModeDto>> GetAllAsync() => GetAllActionExecution();
    public Task<GameModeDto?> GetByIdAsync(int id) => GetByIdActionExecution(id);
    public Task AddAsync(GameModeInputDto dto) => AddActionExecution(dto);
    public Task DeleteAsync(int id) => DeleteActionExecution(id);
}