namespace Diffy.Domain.Models.User;

public class UserProfileDto
{
    public string? Platform { get; set; }
    public string? PlatformVersion { get; set; }
    public string? CpuModel { get; set; }
    public string? GpuModel { get; set; }
    public int? RamGb { get; set; }
    public int? StorageGb { get; set; }
    public string? OperatingSystem { get; set; }
}
