using AutoMapper;
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
    private readonly IMapper _mapper;

    public GameController(IMapper mapper)
    {
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGame service = new BusinessLogic().GetGame();
            var games = await service.GetAllAsync();
            return Ok(_mapper.Map<List<GameInfoDto>>(games));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving games.");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            IGame service = new BusinessLogic().GetGame();
            var game = await service.GetByIdAsync(id);
            if (game == null)
                return NotFound();
            return Ok(_mapper.Map<GameInfoDto>(game));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving the game.");
        }
    }

    [HttpGet("compare")]
    public async Task<IActionResult> Compare([FromQuery] string ids)
    {
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
            return Ok(_mapper.Map<List<GameInfoDto>>(games));
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
            var entity = _mapper.Map<GameEntity>(dto);
            await service.AddAsync(entity, dto.GenreIds, dto.PlatformIds, dto.GameModeIds);
            var created = await service.GetByIdAsync(entity.Id);
            if (created == null)
                return StatusCode(500, "Game created but could not be retrieved.");
            return StatusCode(201, _mapper.Map<GameInfoDto>(created));
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
            var entity = _mapper.Map<GameEntity>(dto);
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
