using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
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
            IUserFavorite service = new BusinessLogic().GetUserFavorite();
            var favorites = await service.GetByUserIdAsync(userId.Value);
            return Ok(favorites.Select(uf => new FavoriteDto
            {
                GameId = uf.GameId,
                Title = uf.Game.Title,
                ImageUrl = uf.Game.ImageUrl,
                AddedAt = uf.AddedAt,
            }).ToList());
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
            IUserFavorite service = new BusinessLogic().GetUserFavorite();
            await service.AddAsync(userId.Value, gameId);
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
            IUserFavorite service = new BusinessLogic().GetUserFavorite();
            await service.DeleteAsync(userId.Value, gameId);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while removing the favorite.");
        }
    }
}
