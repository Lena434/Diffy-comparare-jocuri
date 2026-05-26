using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.Platform;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/platform")]
public class PlatformController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IPlatformAction service = new BusinessLogic().PlatformAction();
            return Ok(await service.GetAllAsync());
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving platforms.");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] PlatformInputDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IPlatformAction service = new BusinessLogic().PlatformAction();
            await service.AddAsync(dto);
            return StatusCode(201);
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the platform.");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            IPlatformAction service = new BusinessLogic().PlatformAction();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            await service.DeleteAsync(id);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while deleting the platform.");
        }
    }
}
