using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.Favorite;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/favorite")]
[Authorize]
public class FavoriteController : ControllerBase
{
    private int? GetUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(value, out var id) ? id : null;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyFavorites()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            IUserFavoriteAction service = new BusinessLogic().UserFavoriteAction();
            return Ok(await service.GetByUserIdAsync(userId.Value));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving favorites.");
        }
    }

    [HttpPost("{gameId}")]
    public async Task<IActionResult> Add(int gameId)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            IUserFavoriteAction service = new BusinessLogic().UserFavoriteAction();
            await service.AddAsync(userId.Value, gameId);

            try
            {
                IActivityLogAction logService = new BusinessLogic().ActivityLogAction();
                var game = await new BusinessLogic().GameAction().GetByIdAsync(gameId);
                await logService.LogAsync(userId.Value, ActivityType.FavoriteAdded, game?.Title ?? $"GameId:{gameId}");
            }
            catch { /* ignore */ }

            return StatusCode(201);
        }
        catch
        {
            return StatusCode(500, "An error occurred while adding the favorite.");
        }
    }

    [HttpDelete("{gameId}")]
    public async Task<IActionResult> Delete(int gameId)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            IUserFavoriteAction service = new BusinessLogic().UserFavoriteAction();
            await service.DeleteAsync(userId.Value, gameId);

            try
            {
                IActivityLogAction logService = new BusinessLogic().ActivityLogAction();
                var game = await new BusinessLogic().GameAction().GetByIdAsync(gameId);
                await logService.LogAsync(userId.Value, ActivityType.FavoriteRemoved, game?.Title ?? $"GameId:{gameId}");
            }
            catch { /* ignore */ }

            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while removing the favorite.");
        }
    }
}
