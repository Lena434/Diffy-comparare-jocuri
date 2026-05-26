using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Context;
using Diffy.DataAccessLayer.Repositories;

namespace Diffy.BusinessLayer;

public class BusinessLogic
{
    public IUserAction UserAction() => new UserActionExecution();
    public IUserAuthAction UserAuthAction() => new UserAuthActionExecution();

    public IGameAction GameAction() => new GameActionExecution(new GameRepository(new DiffyDbContext()));
    public IGenreAction GenreAction() => new GenreActionExecution(new GenreRepository(new DiffyDbContext()));
    public IPlatformAction PlatformAction() => new PlatformActionExecution(new PlatformRepository(new DiffyDbContext()));
    public IGameModeAction GameModeAction() => new GameModeActionExecution(new GameModeRepository(new DiffyDbContext()));
    public IUserFavoriteAction UserFavoriteAction() => new UserFavoriteActionExecution(new UserFavoriteRepository(new DiffyDbContext()));
    public ISavedComparisonAction SavedComparisonAction() => new SavedComparisonActionExecution(new SavedComparisonRepository(new DiffyDbContext()));
    public IGameRatingAction GameRatingAction() => new GameRatingActionExecution(new GameRatingRepository(new DiffyDbContext()));
    public IUserProfileAction UserProfileAction() => new UserProfileActionExecution(new UserProfileRepository(new DiffyDbContext()));
    public IActivityLogAction ActivityLogAction() => new ActivityLogActionExecution(new ActivityLogRepository(new DiffyDbContext()));
}