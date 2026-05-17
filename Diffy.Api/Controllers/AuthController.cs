using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserAuthLogic _userAuthLogic = new BusinessLogic().GetUserAuthLogic();

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserCreateDto userCreateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            var result = _userAuthLogic.Register(userCreateDto);
            if (!result.IsSuccess)
                return BadRequest(result.Message);
            return StatusCode(201, result.Message);
        }
        catch
        {
            return StatusCode(500, "An error occurred while registering.");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            var result = _userAuthLogic.Login(userLoginDto);
            if (!result.IsSuccess)
                return Unauthorized(result.Message);

            var user = (UserInfoDto)result.Data!;
            var token = GenerateJwtToken(user);

            try
            {
                IActivityLog logService = new BusinessLogic().GetActivityLog();
                await logService.LogAsync(user.Id, ActivityType.Login);
            }
            catch { /* logging failure should not affect login */ }

            return Ok(new { token, user });
        }
        catch
        {
            return StatusCode(500, "An error occurred while logging in.");
        }
    }

    private static string GenerateJwtToken(UserInfoDto user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppConfig.JwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };
        var token = new JwtSecurityToken(
            issuer: AppConfig.JwtIssuer,
            audience: AppConfig.JwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
