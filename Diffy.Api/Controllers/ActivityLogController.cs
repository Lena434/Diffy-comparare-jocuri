using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.ActivityLog;
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
            IActivityLog service = new BusinessLogic().GetActivityLog();
            var logs = await service.GetByUserIdAsync(userId.Value);
            return Ok(MapLogs(logs));
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
            IActivityLog service = new BusinessLogic().GetActivityLog();
            var logs = await service.GetByUserIdAsync(userId);
            return Ok(MapLogs(logs));
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving activity log.");
        }
    }

    private static List<ActivityLogDto> MapLogs(List<Diffy.Domain.Entities.User.ActivityLogEntity> logs) =>
        logs.Select(al => new ActivityLogDto
        {
            Id = al.Id,
            ActivityType = al.ActivityType.ToString(),
            Details = al.Details,
            CreatedAt = al.CreatedAt,
        }).ToList();
}