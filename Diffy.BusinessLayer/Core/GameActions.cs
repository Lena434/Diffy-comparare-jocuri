using Diffy.Domain.Models.Game;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.Game;

namespace Diffy.BusinessLayer.Core;

public class GameActions
{
    private readonly GameRepository _repo;

    public GameActions(GameRepository repo)
    {
        _repo = repo;
    }

    private static GameInfoDto ToDto(GameEntity g) => new()
    {
        Id = g.Id,
        Title = g.Title,
        Description = g.Description,
        Developer = g.Developer,
        Publisher = g.Publisher,
        ReleaseYear = g.ReleaseYear,
        Price = g.Price,
        Imgs = g.Imgs.Select(i => new GameImgDto { Id = i.Id, Url = i.ImgUrl, GameId = i.GameId }).ToList(),
        Genres = g.GameGenres.Select(gg => gg.Genre.Name).ToList(),
        Platforms = g.GamePlatforms.Select(gp => gp.Platform.Name).ToList(),
        GameModes = g.GameModes.Select(gm => gm.GameMode.Name).ToList(),
        AverageRating = g.Ratings.Any() ? (decimal)g.Ratings.Average(r => r.Score) : 0m,
    };

    protected async Task<List<GameInfoDto>> GetAllActionExecution()
    {
        var entities = await _repo.GetAllAsync();
        return entities.Select(ToDto).ToList();
    }

    protected async Task<GameInfoDto?> GetByIdActionExecution(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    protected async Task<List<GameInfoDto>> GetByIdsActionExecution(List<int> ids)
    {
        var entities = await _repo.GetByIdsAsync(ids);
        return entities.Select(ToDto).ToList();
    }

    protected Task AddActionExecution(GameCreateDto dto) =>
        _repo.AddAsync(
            new GameEntity
            {
                Title = dto.Title,
                Description = dto.Description,
                Developer = dto.Developer,
                Publisher = dto.Publisher,
                ReleaseYear = dto.ReleaseYear,
                Price = dto.Price,
                Imgs = dto.Imgs
                    .Where(i => !string.IsNullOrWhiteSpace(i.Url))
                    .Select(i => new GameImgEntity { ImgUrl = i.Url })
                    .ToList(),
            },
            dto.GenreIds, dto.PlatformIds, dto.GameModeIds
        );

    protected Task UpdateActionExecution(int id, GameUpdateDto dto) =>
        _repo.UpdateAsync(
            new GameEntity
            {
                Id = id,
                Title = dto.Title,
                Description = dto.Description,
                Developer = dto.Developer,
                Publisher = dto.Publisher,
                ReleaseYear = dto.ReleaseYear,
                Price = dto.Price,
                Imgs = dto.Imgs
                    .Where(i => !string.IsNullOrWhiteSpace(i.Url))
                    .Select(i => new GameImgEntity { ImgUrl = i.Url })
                    .ToList(),
            },
            dto.GenreIds, dto.PlatformIds, dto.GameModeIds
        );

    protected Task DeleteActionExecution(int id) => _repo.DeleteAsync(id);
}