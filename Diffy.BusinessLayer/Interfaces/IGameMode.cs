using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGameMode
{
    Task<List<GameModeEntity>> GetAllAsync();
    Task<GameModeEntity?> GetByIdAsync(int id);
    Task AddAsync(GameModeEntity gameMode);
    Task DeleteAsync(int id);
}
