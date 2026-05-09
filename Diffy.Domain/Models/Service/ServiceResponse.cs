namespace Diffy.Domain.Models.Service;

public class ServiceResponse
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public object? Data { get; set; }
}

public class ServiceResponse<T> : ServiceResponse
{
    public new T? Data { get; set; }
}