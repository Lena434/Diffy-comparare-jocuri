using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.Game;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/game")]
public class GameController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGameAction service = new BusinessLogic().GameAction();
            return Ok(await service.GetAllAsync());
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
            IGameAction service = new BusinessLogic().GameAction();
            var game = await service.GetByIdAsync(id);
            if (game == null)
                return NotFound();
            return Ok(game);
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
            IGameAction service = new BusinessLogic().GameAction();
            return Ok(await service.GetByIdsAsync(idList));
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
            IGameAction service = new BusinessLogic().GameAction();
            await service.AddAsync(dto);
            return StatusCode(201);
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
            IGameAction service = new BusinessLogic().GameAction();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            await service.UpdateAsync(id, dto);
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
            IGameAction service = new BusinessLogic().GameAction();
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
