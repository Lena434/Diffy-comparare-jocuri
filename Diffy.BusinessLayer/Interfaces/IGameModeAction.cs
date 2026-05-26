using Diffy.Domain.Models.GameMode;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGameModeAction
{
    Task<List<GameModeDto>> GetAllAsync();
    Task<GameModeDto?> GetByIdAsync(int id);
    Task AddAsync(GameModeInputDto dto);
    Task DeleteAsync(int id);
}
