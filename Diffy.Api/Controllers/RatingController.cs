using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.Rating;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/rating")]
[Produces("application/json")]
public class RatingController : ControllerBase
{
    [HttpGet("game/{gameId}")]
    public async Task<IActionResult> GetByGame(int gameId)
    {
        if (gameId <= 0)
            return BadRequest("Game id must be a positive integer.");
        try
        {
            IGameRating service = new BusinessLogic().GetGameRating();
            var ratings = await service.GetByGameIdAsync(gameId);
            return Ok(ratings.Select(gr => new GameRatingDto
            {
                UserId = gr.UserId,
                GameId = gr.GameId,
                Score = gr.Score,
                CreatedAt = gr.CreatedAt,
            }).ToList());
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
