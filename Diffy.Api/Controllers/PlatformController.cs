using AutoMapper;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities;
using Diffy.Domain.Models.Platform;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/platform")]
public class PlatformController : ControllerBase
{
    private readonly IPlatform _platform;
    private readonly IMapper _mapper;

    public PlatformController(IPlatform platform, IMapper mapper)
    {
        _platform = platform;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var platforms = await _platform.GetAllAsync();
        return Ok(_mapper.Map<List<PlatformDto>>(platforms));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add([FromBody] PlatformDto dto)
    {
        var entity = _mapper.Map<PlatformEntity>(dto);
        await _platform.AddAsync(entity);
        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _platform.DeleteAsync(id);
        return Ok();
    }
}
