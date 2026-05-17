namespace Diffy.Domain.Models.Comparison;

public class SavedComparisonCreateDto
{
    public List<int> GameIds { get; set; } = [];
    public List<string> GameTitles { get; set; } = [];
}