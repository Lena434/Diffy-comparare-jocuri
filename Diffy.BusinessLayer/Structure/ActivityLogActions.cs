using Diffy.BusinessLayer.Interfaces;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Structure;

public class ActivityLogActions : IActivityLog
{
    private readonly ActivityLogRepository _repo;

    public ActivityLogActions(ActivityLogRepository repo)
    {
        _repo = repo;
    }

    public Task<List<ActivityLogEntity>> GetByUserIdAsync(int userId) =>
        _repo.GetByUserIdAsync(userId);

    public Task LogAsync(int userId, ActivityType activityType, string? details = null) =>
        _repo.AddAsync(new ActivityLogEntity
        {
            UserId = userId,
            ActivityType = activityType,
            Details = details,
            CreatedAt = DateTime.UtcNow,
        });
}