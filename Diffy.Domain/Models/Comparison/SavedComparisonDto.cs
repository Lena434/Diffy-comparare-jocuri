namespace Diffy.Domain.Models.Comparison;

public class SavedComparisonDto
{
    public int Id { get; set; }
    public List<int> GameIds { get; set; } = [];
    public List<string> GameTitles { get; set; } = [];
    public DateTime SavedAt { get; set; }
}