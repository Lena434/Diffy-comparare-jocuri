using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Models.Genre;

namespace Diffy.BusinessLayer.Structure;

public class GenreActionExecution : GenreActions, IGenreAction
{
    public GenreActionExecution(GenreRepository repo) : base(repo) { }

    public Task<List<GenreDto>> GetAllAsync() => GetAllActionExecution();
    public Task<GenreDto?> GetByIdAsync(int id) => GetByIdActionExecution(id);
    public Task AddAsync(GenreInputDto dto) => AddActionExecution(dto);
    public Task DeleteAsync(int id) => DeleteActionExecution(id);
}