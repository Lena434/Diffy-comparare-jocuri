using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Structure;

public class GenreActions : IGenre
{
    private readonly GenreRepository _repo;

    public GenreActions(GenreRepository repo)
    {
        _repo = repo;
    }

    public Task<List<GenreEntity>> GetAllAsync() => _repo.GetAllAsync();
    public Task<GenreEntity?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    public Task AddAsync(GenreEntity genre) => _repo.AddAsync(genre);
    public Task UpdateAsync(int id, string name) => _repo.UpdateAsync(id, name);
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
}
