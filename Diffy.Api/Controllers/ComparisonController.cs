using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.Comparison;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/comparison")]
[Authorize]
public class ComparisonController : ControllerBase
{
    private int? GetUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(value, out var id) ? id : null;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyComparisons()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            ISavedComparison service = new BusinessLogic().GetSavedComparison();
            var comparisons = await service.GetByUserIdAsync(userId.Value);
            return Ok(comparisons.Select(sc => new SavedComparisonDto
            {
                Id = sc.Id,
                GameIds = sc.GameIds.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList(),
                GameTitles = sc.GameTitles?.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() ?? [],
                SavedAt = sc.SavedAt,
            }).ToList());
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving comparisons.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Save([FromBody] SavedComparisonCreateDto dto)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            ISavedComparison service = new BusinessLogic().GetSavedComparison();
            var result = await service.AddAsync(userId.Value, dto.GameIds, dto.GameTitles);

            try
            {
                IActivityLog logService = new BusinessLogic().GetActivityLog();
                await logService.LogAsync(userId.Value, ActivityType.ComparisonSaved, string.Join(" vs ", dto.GameTitles));
            }
            catch { /* ignore */ }

            return StatusCode(201, new SavedComparisonDto
            {
                Id = result.Id,
                GameIds = dto.GameIds,
                GameTitles = dto.GameTitles,
                SavedAt = result.SavedAt,
            });
        }
        catch
        {
            return StatusCode(500, "An error occurred while saving the comparison.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            ISavedComparison service = new BusinessLogic().GetSavedComparison();
            await service.DeleteAsync(id, userId.Value);

            try
            {
                IActivityLog logService = new BusinessLogic().GetActivityLog();
                await logService.LogAsync(userId.Value, ActivityType.ComparisonRemoved);
            }
            catch { /* ignore */ }

            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while deleting the comparison.");
        }
    }
}