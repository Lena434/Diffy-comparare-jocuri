using Diffy.Domain.Models.Game;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGameAction
{
    Task<List<GameInfoDto>> GetAllAsync();
    Task<GameInfoDto?> GetByIdAsync(int id);
    Task<List<GameInfoDto>> GetByIdsAsync(List<int> ids);
    Task AddAsync(GameCreateDto dto);
    Task UpdateAsync(int id, GameUpdateDto dto);
    Task DeleteAsync(int id);
}
