using AutoMapper;
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
    private readonly IUserFavorite _favorite;
    private readonly IMapper _mapper;

    public FavoriteController(IUserFavorite favorite, IMapper mapper)
    {
        _favorite = favorite;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyFavorites()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var favorites = await _favorite.GetByUserIdAsync(userId);
        return Ok(_mapper.Map<List<FavoriteDto>>(favorites));
    }

    [HttpPost("{gameId}")]
    public async Task<IActionResult> Add(int gameId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await _favorite.AddAsync(userId, gameId);
        return Ok();
    }

    [HttpDelete("{gameId}")]
    public async Task<IActionResult> Delete(int gameId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await _favorite.DeleteAsync(userId, gameId);
        return Ok();
    }
}
