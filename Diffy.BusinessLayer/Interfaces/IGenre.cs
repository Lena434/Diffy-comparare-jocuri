using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGenre
{
    Task<List<GenreEntity>> GetAllAsync();
    Task<GenreEntity?> GetByIdAsync(int id);
    Task AddAsync(GenreEntity genre);
    Task DeleteAsync(int id);
}
