using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer.Core;

public class UserFavoriteBusinessLogic
{
    public IUserFavorite GetUserFavorite(UserFavoriteRepository repo) => new UserFavoriteActions(repo);
}
