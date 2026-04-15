using AutoMapper;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities;
using Diffy.Domain.Models.GameMode;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/gamemode")]
public class GameModeController : ControllerBase
{
    private readonly IGameMode _gameMode;
    private readonly IMapper _mapper;

    public GameModeController(IGameMode gameMode, IMapper mapper)
    {
        _gameMode = gameMode;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var gameModes = await _gameMode.GetAllAsync();
        return Ok(_mapper.Map<List<GameModeDto>>(gameModes));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] GameModeDto dto)
    {
        var entity = _mapper.Map<GameModeEntity>(dto);
        await _gameMode.AddAsync(entity);
        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _gameMode.DeleteAsync(id);
        return Ok();
    }
}
