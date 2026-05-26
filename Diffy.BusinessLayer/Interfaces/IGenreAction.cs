using Diffy.Domain.Models.Genre;

namespace Diffy.BusinessLayer.Interfaces;

public interface IGenreAction
{
    Task<List<GenreDto>> GetAllAsync();
    Task<GenreDto?> GetByIdAsync(int id);
    Task AddAsync(GenreInputDto dto);
    Task DeleteAsync(int id);
}
