using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer.Core;

public class UserProfileBusinessLogic
{
    public IUserProfile GetUserProfile(UserProfileRepository repo) => new UserProfileActions(repo);
}
