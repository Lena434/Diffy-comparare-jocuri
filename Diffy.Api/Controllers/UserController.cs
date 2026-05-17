using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/users")]
[Authorize]
public class UserController : ControllerBase
{
    [HttpGet("list")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetUserList()
    {
        try
        {
            IUserLogic service = new BusinessLogic().GetUserLogic();
            var result = service.GetUserList();
            return Ok(result.Data);
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving users.");
        }
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetUserById([FromRoute] int id)
    {
        try
        {
            IUserLogic service = new BusinessLogic().GetUserLogic();
            var result = service.GetUserById(id);
            if (!result.IsSuccess)
                return NotFound(result.Message);
            return Ok(result.Data);
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving the user.");
        }
    }

    [HttpPost("create")]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateUser([FromBody] UserCreateDto userCreateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IUserLogic service = new BusinessLogic().GetUserLogic();
            var result = service.CreateUser(userCreateDto);
            if (!result.IsSuccess)
                return BadRequest(result.Message);
            return StatusCode(201, result.Message);
        }
        catch
        {
            return StatusCode(500, "An error occurred while creating the user.");
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult UpdateUser([FromRoute] int id, [FromBody] UserUpdateDto userUpdateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IUserLogic service = new BusinessLogic().GetUserLogic();
            var result = service.UpdateUser(id, userUpdateDto);
            if (!result.IsSuccess)
                return NotFound(result.Message);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while updating the user.");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteUser([FromRoute] int id)
    {
        try
        {
            IUserLogic service = new BusinessLogic().GetUserLogic();
            var result = service.DeleteUser(id);
            if (!result.IsSuccess)
                return NotFound(result.Message);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while deleting the user.");
        }
    }

    [HttpPatch("changePassword")]
    public IActionResult ChangePassword([FromBody] ChangePasswordDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out var userId))
            return Unauthorized();

        try
        {
            IUserLogic service = new BusinessLogic().GetUserLogic();
            var result = service.ChangePassword(userId, dto);
            if (!result.IsSuccess)
                return BadRequest(result.Message);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while changing the password.");
        }
    }

    [HttpPatch("updateProfile")]
    public IActionResult UpdateProfile([FromBody] UserProfileUpdateDto userProfileUpdateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out var userId))
            return Unauthorized();

        try
        {
            IUserLogic service = new BusinessLogic().GetUserLogic();
            var result = service.UpdateProfile(userId, userProfileUpdateDto);
            if (!result.IsSuccess)
                return NotFound(result.Message);
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "An error occurred while updating the profile.");
        }
    }
}
