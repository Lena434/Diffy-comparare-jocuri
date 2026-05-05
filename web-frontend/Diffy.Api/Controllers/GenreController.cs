using AutoMapper;
using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities;
using Diffy.Domain.Models.Genre;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/genre")]
public class GenreController : ControllerBase
{
    private readonly IMapper _mapper;

    public GenreController(IMapper mapper)
    {
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            IGenre service = new BusinessLogic().GetGenre();
            var genres = await service.GetAllAsync();
            return Ok(_mapper.Map<List<GenreDto>>(genres));
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
            var entity = _mapper.Map<GenreEntity>(dto);
            await service.AddAsync(entity);
            return StatusCode(201, _mapper.Map<GenreDto>(entity));
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the genre.");
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] GenreDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IGenre service = new BusinessLogic().GetGenre();
            var existing = await service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();
            await service.UpdateAsync(id, dto.Name);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while updating the genre.");
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
