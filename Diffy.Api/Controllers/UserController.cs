using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserLogic _userLogic;

    public UserController()
    {
        var bl = new BusinessLogic();
        _userLogic = bl.GetUserLogic();
    }

    [HttpGet("list")]
    public IActionResult GetUserList()
    {
        var result = _userLogic.GetUserList();
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById([FromRoute] int id)
    {
        var result = _userLogic.GetUserById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateUser([FromBody] UserCreateDto userCreateDto)
    {
        var result = _userLogic.CreateUser(userCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser([FromRoute] int id, [FromBody] UserUpdateDto userUpdateDto)
    {
        var result = _userLogic.UpdateUser(id, userUpdateDto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser([FromRoute] int id)
    {
        var result = _userLogic.DeleteUser(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
    
    [HttpPatch("changePassword")]
    public IActionResult ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var result = _userLogic.ChangePassword(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }
    
    [HttpPatch("updateProfile")] 
    public IActionResult UpdateProfile([FromBody] UserProfileUpdateDto userProfileUpdateDto)
    {
        var result = _userLogic.UpdateProfile(userProfileUpdateDto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    
}