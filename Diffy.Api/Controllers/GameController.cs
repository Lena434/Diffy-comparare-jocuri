using AutoMapper;
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
    private readonly IGame _game;
    private readonly IMapper _mapper;

    public GameController(IGame game, IMapper mapper)
    {
        _game = game;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var games = await _game.GetAllAsync();
        return Ok(_mapper.Map<List<GameInfoDto>>(games));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var game = await _game.GetByIdAsync(id);
        if (game == null)
            return NotFound();
        return Ok(_mapper.Map<GameInfoDto>(game));
    }

    [HttpGet("compare")]
    public async Task<IActionResult> Compare([FromQuery] string ids)
    {
        var idList = ids.Split(',').Select(int.Parse).ToList();
        var games = await _game.GetByIdsAsync(idList);
        return Ok(_mapper.Map<List<GameInfoDto>>(games));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] GameCreateDto dto)
    {
        var entity = _mapper.Map<GameEntity>(dto);
        await _game.AddAsync(entity, dto.GenreIds, dto.PlatformIds, dto.GameModeIds);
        return Ok();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] GameUpdateDto dto)
    {
        var entity = _mapper.Map<GameEntity>(dto);
        entity.Id = id;
        await _game.UpdateAsync(entity, dto.GenreIds, dto.PlatformIds, dto.GameModeIds);
        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _game.DeleteAsync(id);
        return Ok();
    }
}
