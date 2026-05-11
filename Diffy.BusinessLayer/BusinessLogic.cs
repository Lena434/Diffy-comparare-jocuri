using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Context;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer;

public class BusinessLogic
{
    public IUserLogic GetUserLogic() => new UserLogic();
    public IUserAuthLogic GetUserAuthLogic() => new UserAuthLogic();

    public IGame GetGame() => new GameLogic(new GameRepository(new DiffyDbContext()));
    public IGenre GetGenre() => new GenreLogic(new GenreRepository(new DiffyDbContext()));
    public IPlatform GetPlatform() => new PlatformLogic(new PlatformRepository(new DiffyDbContext()));
    public IGameMode GetGameMode() => new GameModeLogic(new GameModeRepository(new DiffyDbContext()));
    public IUserFavorite GetUserFavorite() => new UserFavoriteLogic(new UserFavoriteRepository(new DiffyDbContext()));
    public ISavedComparison GetSavedComparison() => new SavedComparisonLogic(new SavedComparisonRepository(new DiffyDbContext()));
    public IGameRating GetGameRating() => new GameRatingLogic(new GameRatingRepository(new DiffyDbContext()));
    public IUserProfile GetUserProfile() => new UserProfileLogic(new UserProfileRepository(new DiffyDbContext()));
}