using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities.User;
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

    private static UserProfileDto ToDto(UserProfileEntity p) => new()
    {
        Platform = p.Platform,
        PlatformVersion = p.PlatformVersion,
        CpuModel = p.CpuModel,
        GpuModel = p.GpuModel,
        RamGb = p.RamGb,
        StorageGb = p.StorageGb,
        OperatingSystem = p.OperatingSystem,
    };

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        try
        {
            IUserProfile service = new BusinessLogic().GetUserProfile();
            var profile = await service.GetByUserIdAsync(userId.Value);
            return Ok(ToDto(profile ?? new UserProfileEntity()));
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
            IUserProfile service = new BusinessLogic().GetUserProfile();
            var existing = await service.GetByUserIdAsync(userId.Value);

            if (existing is null)
            {
                var profile = new UserProfileEntity
                {
                    UserId = userId.Value,
                    Platform = dto.Platform,
                    PlatformVersion = dto.PlatformVersion,
                    CpuModel = dto.CpuModel,
                    GpuModel = dto.GpuModel,
                    RamGb = dto.RamGb,
                    StorageGb = dto.StorageGb,
                    OperatingSystem = dto.OperatingSystem,
                };
                await service.AddAsync(profile);
            }
            else
            {
                existing.Platform = dto.Platform;
                existing.PlatformVersion = dto.PlatformVersion;
                existing.CpuModel = dto.CpuModel;
                existing.GpuModel = dto.GpuModel;
                existing.RamGb = dto.RamGb;
                existing.StorageGb = dto.StorageGb;
                existing.OperatingSystem = dto.OperatingSystem;
                await service.UpdateAsync(existing);
            }

            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while saving the profile.");
        }
    }
}
