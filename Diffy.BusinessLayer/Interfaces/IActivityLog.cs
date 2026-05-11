using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface IActivityLog
{
    Task<List<ActivityLogEntity>> GetByUserIdAsync(int userId);
    Task LogAsync(int userId, ActivityType activityType, string? details = null);
}