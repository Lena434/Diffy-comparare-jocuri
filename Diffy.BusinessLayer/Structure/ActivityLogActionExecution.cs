using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.ActivityLog;

namespace Diffy.BusinessLayer.Structure;

public class ActivityLogActionExecution : ActivityLogActions, IActivityLogAction
{
    public ActivityLogActionExecution(ActivityLogRepository repo) : base(repo) { }

    public Task<List<ActivityLogDto>> GetByUserIdAsync(int userId) => GetByUserIdActionExecution(userId);
    public Task LogAsync(int userId, ActivityType activityType, string? details = null) => LogActionExecution(userId, activityType, details);
}