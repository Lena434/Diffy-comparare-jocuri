using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.ActivityLog;

namespace Diffy.BusinessLayer.Interfaces;

public interface IActivityLogAction
{
    Task<List<ActivityLogDto>> GetByUserIdAsync(int userId);
    Task LogAsync(int userId, ActivityType activityType, string? details = null);
}