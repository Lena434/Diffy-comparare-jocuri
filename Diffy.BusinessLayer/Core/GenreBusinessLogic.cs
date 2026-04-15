using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer.Core;

public class GenreBusinessLogic
{
    public IGenre GetGenre(GenreRepository repo) => new GenreActions(repo);
}
