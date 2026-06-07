using Diffy.Domain.Models.ActivityLog;
using Diffy.DataAccessLayer.Repositories;
using Diffy.Domain.Entities.User;

namespace Diffy.BusinessLayer.Core;

public class ActivityLogActions
{
    private readonly ActivityLogRepository _repo;

    public ActivityLogActions(ActivityLogRepository repo)
    {
        _repo = repo;
    }

    protected async Task<List<ActivityLogDto>> GetByUserIdActionExecution(int userId)
    {
        var entities = await _repo.GetByUserIdAsync(userId);
        return entities.Select(al => new ActivityLogDto
        {
            Id = al.Id,
            ActivityType = al.ActivityType.ToString(),
            Details = al.Details,
            CreatedAt = al.CreatedAt,
        }).ToList();
    }

    protected Task LogActionExecution(int userId, ActivityType activityType, string? details = null) =>
        _repo.AddAsync(new ActivityLogEntity
        {
            UserId = userId,
            ActivityType = activityType,
            Details = details,
            CreatedAt = DateTime.UtcNow,
        });
}