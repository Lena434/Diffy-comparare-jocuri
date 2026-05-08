using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities;
using Diffy.Domain.Models.GameMode;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/gamemode")]
[Produces("application/json")]
public class GameModeController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGameMode service = new BusinessLogic().GetGameMode();
            var gameModes = await service.GetAllAsync();
            return Ok(gameModes.Select(e => new GameModeDto { Id = e.Id, Name = e.Name }).ToList());
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
            var entity = new GameModeEntity { Name = dto.Name };
            await service.AddAsync(entity);
            return StatusCode(201);
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
        if (id <= 0)
            return BadRequest("GameMode id must be a positive integer.");
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
