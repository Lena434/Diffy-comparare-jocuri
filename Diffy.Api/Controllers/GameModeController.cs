using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.GameMode;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/gamemode")]
public class GameModeController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGameModeAction service = new BusinessLogic().GameModeAction();
            return Ok(await service.GetAllAsync());
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving game modes.");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] GameModeInputDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IGameModeAction service = new BusinessLogic().GameModeAction();
            await service.AddAsync(dto);
            return StatusCode(201);
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the game mode.");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            IGameModeAction service = new BusinessLogic().GameModeAction();
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
