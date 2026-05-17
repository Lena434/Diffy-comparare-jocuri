using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Core;

public class ActivityLogLogic : ActivityLogActions, IActivityLog
{
    public ActivityLogLogic(ActivityLogRepository repo) : base(repo) { }

    public new Task<List<ActivityLogEntity>> GetByUserIdAsync(int userId) => base.GetByUserIdAsync(userId);
    public new Task LogAsync(int userId, ActivityType activityType, string? details = null) => base.LogAsync(userId, activityType, details);
}