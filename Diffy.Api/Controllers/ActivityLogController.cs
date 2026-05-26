using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/activitylog")]
[Authorize]
public class ActivityLogController : ControllerBase
{
    private int? GetUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(value, out var id) ? id : null;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyActivity()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            IActivityLogAction service = new BusinessLogic().ActivityLogAction();
            return Ok(await service.GetByUserIdAsync(userId.Value));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving activity log.");
        }
    }

    [HttpGet("{userId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetUserActivity(int userId)
    {
        try
        {
            IActivityLogAction service = new BusinessLogic().ActivityLogAction();
            return Ok(await service.GetByUserIdAsync(userId));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving activity log.");
        }
    }
}