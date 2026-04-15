using AutoMapper;
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
    private readonly IGenre _genre;
    private readonly IMapper _mapper;

    public GenreController(IGenre genre, IMapper mapper)
    {
        _genre = genre;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var genres = await _genre.GetAllAsync();
        return Ok(_mapper.Map<List<GenreDto>>(genres));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] GenreDto dto)
    {
        var entity = _mapper.Map<GenreEntity>(dto);
        await _genre.AddAsync(entity);
        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _genre.DeleteAsync(id);
        return Ok();
    }
}
