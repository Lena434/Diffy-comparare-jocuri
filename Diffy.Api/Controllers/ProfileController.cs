using AutoMapper;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/profile")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly IUserProfile _userProfile;
    private readonly IMapper _mapper;

    public ProfileController(IUserProfile userProfile, IMapper mapper)
    {
        _userProfile = userProfile;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var profile = await _userProfile.GetByUserIdAsync(userId);
        return Ok(_mapper.Map<UserProfileDto>(profile ?? new UserProfileEntity()));
    }

    [HttpPut]
    public async Task<IActionResult> Upsert([FromBody] UserProfileDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var existing = await _userProfile.GetByUserIdAsync(userId);

        if (existing is null)
        {
            var profile = _mapper.Map<UserProfileEntity>(dto);
            profile.UserId = userId;
            await _userProfile.AddAsync(profile);
        }
        else
        {
            _mapper.Map(dto, existing);
            await _userProfile.UpdateAsync(existing);
        }

        return Ok();
    }
}
