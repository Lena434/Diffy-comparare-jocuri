using AutoMapper;
using Diffy.BusinessLayer;
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
    private readonly IMapper _mapper;

    public GameModeController(IMapper mapper)
    {
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGameMode service = new BusinessLogic().GetGameMode();
            var gameModes = await service.GetAllAsync();
            return Ok(_mapper.Map<List<GameModeDto>>(gameModes));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving game modes.");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] GameModeDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IGameMode service = new BusinessLogic().GetGameMode();
            var entity = _mapper.Map<GameModeEntity>(dto);
            await service.AddAsync(entity);
            return StatusCode(201, _mapper.Map<GameModeDto>(entity));
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the game mode.");
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] GameModeDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IGameMode service = new BusinessLogic().GetGameMode();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            await service.UpdateAsync(id, dto.Name);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while updating the game mode.");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            IGameMode service = new BusinessLogic().GetGameMode();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            await service.DeleteAsync(id);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while deleting the game mode.");
        }
    }
}
