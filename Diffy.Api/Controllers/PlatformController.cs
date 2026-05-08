using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities;
using Diffy.Domain.Models.Platform;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/platform")]
[Produces("application/json")]
public class PlatformController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IPlatform service = new BusinessLogic().GetPlatform();
            var platforms = await service.GetAllAsync();
            return Ok(platforms.Select(e => new PlatformDto { Id = e.Id, Name = e.Name }).ToList());
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving platforms.");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (id <= 0)
            return BadRequest("Platform id must be a positive integer.");
        try
        {
            IPlatform service = new BusinessLogic().GetPlatform();
            var platform = await service.GetByIdAsync(id);
            if (platform == null)
                return NotFound();
            return Ok(new PlatformDto { Id = platform.Id, Name = platform.Name });
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving the platform.");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] PlatformDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IPlatform service = new BusinessLogic().GetPlatform();
            var entity = new PlatformEntity { Name = dto.Name };
            await service.AddAsync(entity);
            return StatusCode(201);
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the platform.");
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] PlatformDto dto)
    {
        if (id <= 0)
            return BadRequest("Platform id must be a positive integer.");
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IPlatform service = new BusinessLogic().GetPlatform();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            await service.UpdateAsync(id, dto.Name);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while updating the platform.");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            IPlatform service = new BusinessLogic().GetPlatform();
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
