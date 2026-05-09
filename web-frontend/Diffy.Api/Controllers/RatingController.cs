using AutoMapper;
using Diffy.BusinessLayer;
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
    private readonly IMapper _mapper;

    public RatingController(IMapper mapper)
    {
        _mapper = mapper;
    }

    [HttpGet("game/{gameId}")]
    public async Task<IActionResult> GetByGame(int gameId)
    {
        try
        {
            IGameRating service = new BusinessLogic().GetGameRating();
            var ratings = await service.GetByGameIdAsync(gameId);
            return Ok(_mapper.Map<List<GameRatingDto>>(ratings));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving ratings.");
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Add([FromBody] GameRatingCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(value, out var userId))
            return Unauthorized();

        try
        {
            IGameRating service = new BusinessLogic().GetGameRating();
            await service.AddAsync(userId, dto.GameId, dto.Score);
            return StatusCode(201);
        }
        catch
        {
            return StatusCode(500, "An error occurred while submitting the rating.");
        }
    }
}
