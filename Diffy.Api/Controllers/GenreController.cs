using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities;
using Diffy.Domain.Models.Genre;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/genre")]
[Produces("application/json")]
public class GenreController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGenre service = new BusinessLogic().GetGenre();
            var genres = await service.GetAllAsync();
            return Ok(genres.Select(e => new GenreDto { Id = e.Id, Name = e.Name }).ToList());
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving genres.");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] GenreDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IGenre service = new BusinessLogic().GetGenre();
            var entity = new GenreEntity { Name = dto.Name };
            await service.AddAsync(entity);
            return StatusCode(201);
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the genre.");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            IGenre service = new BusinessLogic().GetGenre();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            await service.DeleteAsync(id);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while deleting the genre.");
        }
    }
}
