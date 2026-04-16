using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;

using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Context;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer;

public class BusinessLogic
{
    public IUserLogic GetUserLogic() => new UserLogic();
    public IUserAuthLogic GetUserAuthLogic() => new UserAuthLogic();

    public IGame GetGame() => new GameActions(new GameRepository(new DiffyDbContext()));
    public IGenre GetGenre() => new GenreActions(new GenreRepository(new DiffyDbContext()));
    public IPlatform GetPlatform() => new PlatformActions(new PlatformRepository(new DiffyDbContext()));
    public IGameMode GetGameMode() => new GameModeActions(new GameModeRepository(new DiffyDbContext()));
    public IUserFavorite GetUserFavorite() => new UserFavoriteActions(new UserFavoriteRepository(new DiffyDbContext()));
    public IGameRating GetGameRating() => new GameRatingActions(new GameRatingRepository(new DiffyDbContext()));
    public IUserProfile GetUserProfile() => new UserProfileActions(new UserProfileRepository(new DiffyDbContext()));
}