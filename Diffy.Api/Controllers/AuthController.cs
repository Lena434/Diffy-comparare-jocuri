using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserAuthLogic _userAuthLogic;

    public AuthController()
    {
        var bl = new BusinessLogic();
        _userAuthLogic = bl.GetUserAuthLogic();
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
        return Ok(result.Data);
    }
}