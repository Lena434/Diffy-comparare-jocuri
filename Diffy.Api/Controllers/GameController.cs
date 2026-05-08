using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities.Game;
using Diffy.Domain.Models.Game;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/game")]
public class GameController : ControllerBase
{
    private static GameInfoDto ToDto(GameEntity g) => new()
    {
        Id = g.Id,
        Title = g.Title,
        Description = g.Description,
        Developer = g.Developer,
        Publisher = g.Publisher,
        ReleaseYear = g.ReleaseYear,
        Price = g.Price,
        ImageUrl = g.ImageUrl,
        Genres = g.GameGenres.Select(gg => gg.Genre.Name).ToList(),
        Platforms = g.GamePlatforms.Select(gp => gp.Platform.Name).ToList(),
        GameModes = g.GameModes.Select(gm => gm.GameMode.Name).ToList(),
        AverageRating = g.Ratings.Any() ? (decimal)g.Ratings.Average(r => r.Score) : 0m,
        RatingCount = g.Ratings.Count,
    };

    private static GameEntity ToEntity(GameCreateDto dto) => new()
    {
        Title = dto.Title,
        Description = dto.Description,
        Developer = dto.Developer,
        Publisher = dto.Publisher,
        ReleaseYear = dto.ReleaseYear,
        Price = dto.Price,
        ImageUrl = dto.ImageUrl,
    };

    private static GameEntity ToEntity(GameUpdateDto dto) => new()
    {
        Title = dto.Title,
        Description = dto.Description,
        Developer = dto.Developer,
        Publisher = dto.Publisher,
        ReleaseYear = dto.ReleaseYear,
        Price = dto.Price,
        ImageUrl = dto.ImageUrl,
    };

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGame service = new BusinessLogic().GetGame();
            var games = await service.GetAllAsync();
            return Ok(games.Select(ToDto).ToList());
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving games.");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (id <= 0)
            return BadRequest("Game id must be a positive integer.");
        try
        {
            IGame service = new BusinessLogic().GetGame();
            var game = await service.GetByIdAsync(id);
            if (game == null)
                return NotFound();
            return Ok(ToDto(game));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving the game.");
        }
    }

    [HttpGet("compare")]
    public async Task<IActionResult> Compare([FromQuery] string ids)
    {
        if (string.IsNullOrWhiteSpace(ids))
            return BadRequest("At least one game id is required.");

        var idList = new List<int>();
        foreach (var part in ids.Split(','))
        {
            if (!int.TryParse(part.Trim(), out var parsed) || parsed <= 0)
                return BadRequest($"Invalid game id: '{part}'");
            idList.Add(parsed);
        }

        try
        {
            IGame service = new BusinessLogic().GetGame();
            var games = await service.GetByIdsAsync(idList);
            return Ok(games.Select(ToDto).ToList());
        }
        catch
        {
            return StatusCode(500, "An error occurred while comparing games.");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] GameCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IGame service = new BusinessLogic().GetGame();
            var entity = ToEntity(dto);
            await service.AddAsync(entity, dto.GenreIds, dto.PlatformIds, dto.GameModeIds);
            return StatusCode(201, new { id = entity.Id });
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the game.");
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] GameUpdateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IGame service = new BusinessLogic().GetGame();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            var entity = ToEntity(dto);
            entity.Id = id;
            await service.UpdateAsync(entity, dto.GenreIds, dto.PlatformIds, dto.GameModeIds);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while updating the game.");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            IGame service = new BusinessLogic().GetGame();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            await service.DeleteAsync(id);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while deleting the game.");
        }
    }
}
