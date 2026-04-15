using AutoMapper;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.Rating;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/rating")]
public class RatingController : ControllerBase
{
    private readonly IGameRating _rating;
    private readonly IMapper _mapper;

    public RatingController(IGameRating rating, IMapper mapper)
    {
        _rating = rating;
        _mapper = mapper;
    }

    [HttpGet("game/{gameId}")]
    public async Task<IActionResult> GetByGame(int gameId)
    {
        var ratings = await _rating.GetByGameIdAsync(gameId);
        return Ok(_mapper.Map<List<GameRatingDto>>(ratings));
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Add([FromBody] GameRatingCreateDto dto)
    {
        if (dto.Score < 1.0m || dto.Score > 10.0m)
            return BadRequest("Score must be between 1.0 and 10.0");

        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await _rating.AddAsync(userId, dto.GameId, dto.Score);
        return Ok();
    }
}
