using Diffy.Domain.Models.Genre;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Core;

public class GenreActions
{
    private readonly GenreRepository _repo;

    public GenreActions(GenreRepository repo)
    {
        _repo = repo;
    }

    protected async Task<List<GenreDto>> GetAllActionExecution()
    {
        var entities = await _repo.GetAllAsync();
        return entities.Select(e => new GenreDto { Id = e.Id, Name = e.Name }).ToList();
    }

    protected async Task<GenreDto?> GetByIdActionExecution(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return null;
        return new GenreDto { Id = entity.Id, Name = entity.Name };
    }

    protected Task AddActionExecution(GenreInputDto dto) =>
        _repo.AddAsync(new GenreEntity { Name = dto.Name });

    protected Task DeleteActionExecution(int id) => _repo.DeleteAsync(id);
}