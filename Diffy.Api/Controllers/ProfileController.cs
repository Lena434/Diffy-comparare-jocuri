using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/profile")]
[Authorize]
public class ProfileController : ControllerBase
{
    private int? GetUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(value, out var id) ? id : null;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            IUserProfileAction service = new BusinessLogic().UserProfileAction();
            return Ok(await service.GetByUserIdAsync(userId.Value) ?? new UserProfileDto());
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving the profile.");
        }
    }

    [HttpPut]
    public async Task<IActionResult> Upsert([FromBody] UserProfileDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            IUserProfileAction service = new BusinessLogic().UserProfileAction();
            var existing = await service.GetByUserIdAsync(userId.Value);

            if (existing is null)
                await service.AddAsync(userId.Value, dto);
            else
                await service.UpdateAsync(userId.Value, dto);

            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while saving the profile.");
        }
    }
}
