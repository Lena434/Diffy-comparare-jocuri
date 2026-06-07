using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Core;

public class UserProfileActions
{
    private readonly UserProfileRepository _repo;

    public UserProfileActions(UserProfileRepository repo)
    {
        _repo = repo;
    }

    protected async Task<UserProfileDto?> GetByUserIdActionExecution(int userId)
    {
        var entity = await _repo.GetByUserIdAsync(userId);
        if (entity == null) return null;
        return new UserProfileDto
        {
            Platform = entity.Platform,
            PlatformVersion = entity.PlatformVersion,
            CpuModel = entity.CpuModel,
            GpuModel = entity.GpuModel,
            RamGb = entity.RamGb,
            StorageGb = entity.StorageGb,
            OperatingSystem = entity.OperatingSystem,
        };
    }

    protected Task AddActionExecution(int userId, UserProfileDto dto) =>
        _repo.AddAsync(new UserProfileEntity
        {
            UserId = userId,
            Platform = dto.Platform,
            PlatformVersion = dto.PlatformVersion,
            CpuModel = dto.CpuModel,
            GpuModel = dto.GpuModel,
            RamGb = dto.RamGb,
            StorageGb = dto.StorageGb,
            OperatingSystem = dto.OperatingSystem,
        });

    protected async Task UpdateActionExecution(int userId, UserProfileDto dto)
    {
        var existing = await _repo.GetByUserIdAsync(userId);
        if (existing == null) return;
        existing.Platform = dto.Platform;
        existing.PlatformVersion = dto.PlatformVersion;
        existing.CpuModel = dto.CpuModel;
        existing.GpuModel = dto.GpuModel;
        existing.RamGb = dto.RamGb;
        existing.StorageGb = dto.StorageGb;
        existing.OperatingSystem = dto.OperatingSystem;
        await _repo.UpdateAsync(existing);
    }
}