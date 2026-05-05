using AutoMapper;
using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities;
using Diffy.Domain.Models.Platform;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/platform")]
public class PlatformController : ControllerBase
{
    private readonly IMapper _mapper;

    public PlatformController(IMapper mapper)
    {
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IPlatform service = new BusinessLogic().GetPlatform();
            var platforms = await service.GetAllAsync();
            return Ok(_mapper.Map<List<PlatformDto>>(platforms));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving platforms.");
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
            var entity = _mapper.Map<PlatformEntity>(dto);
            await service.AddAsync(entity);
            return StatusCode(201, _mapper.Map<PlatformDto>(entity));
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
