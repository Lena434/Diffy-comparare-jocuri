using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserAuthLogic _userAuthLogic;
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        var bl = new BusinessLogic();
        _userAuthLogic = bl.GetUserAuthLogic();
        _config = config;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserCreateDto userCreateDto)
    {
        var result = _userAuthLogic.Register(userCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto userLoginDto)
    {
        var result = _userAuthLogic.Login(userLoginDto);
        if (!result.IsSuccess)
            return Unauthorized(result.Message);

        var user = (UserInfoDto)result.Data!;
        var token = GenerateJwtToken(user);
        return Ok(new { token, user });
    }

    private string GenerateJwtToken(UserInfoDto user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}