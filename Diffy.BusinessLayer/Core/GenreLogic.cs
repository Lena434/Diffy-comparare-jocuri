using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities;

namespace Diffy.BusinessLayer.Core;

public class GenreLogic : GenreActions, IGenre
{
    public GenreLogic(GenreRepository repo) : base(repo) { }

    public new Task<List<GenreEntity>> GetAllAsync() => base.GetAllAsync();
    public new Task<GenreEntity?> GetByIdAsync(int id) => base.GetByIdAsync(id);
    public new Task AddAsync(GenreEntity genre) => base.AddAsync(genre);
    public new Task DeleteAsync(int id) => base.DeleteAsync(id);
}