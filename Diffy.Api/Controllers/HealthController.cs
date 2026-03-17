using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController: ControllerBase
{
    
    [HttpGet("check")]
    public IActionResult Get()
    {
        return Ok("Server is up and running.");
    }
    
}