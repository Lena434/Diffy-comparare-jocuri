using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.Rating;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/rating")]
public class RatingController : ControllerBase
{
    [HttpGet("game/{gameId}")]
    public async Task<IActionResult> GetByGame(int gameId)
    {
        try
        {
            IGameRatingAction service = new BusinessLogic().GameRatingAction();
            return Ok(await service.GetByGameIdAsync(gameId));
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
            IGameRatingAction service = new BusinessLogic().GameRatingAction();
            await service.AddAsync(userId, dto.GameId, dto.Score);

            try
            {
                IActivityLogAction logService = new BusinessLogic().ActivityLogAction();
                var game = await new BusinessLogic().GameAction().GetByIdAsync(dto.GameId);
                await logService.LogAsync(userId, ActivityType.RatingGiven, $"{game?.Title ?? $"GameId:{dto.GameId}"}, Score:{dto.Score}");
            }
            catch { /* ignore */ }

            return StatusCode(201);
        }
        catch
        {
            return StatusCode(500, "An error occurred while submitting the rating.");
        }
    }
}
