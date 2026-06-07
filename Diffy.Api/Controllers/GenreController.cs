using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.Genre;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/genre")]
public class GenreController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGenreAction service = new BusinessLogic().GenreAction();
            return Ok(await service.GetAllAsync());
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving genres.");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] GenreInputDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IGenreAction service = new BusinessLogic().GenreAction();
            await service.AddAsync(dto);
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
            IGenreAction service = new BusinessLogic().GenreAction();
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
