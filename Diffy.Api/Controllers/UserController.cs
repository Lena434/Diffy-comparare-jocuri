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
    public async Task<IActionResult> GetUserList()
    {
        try
        {
            IUserAction service = new BusinessLogic().UserAction();
            var result = await service.GetUserList();
            return Ok(result.Data);
        }
        catch
        {
            return StatusCode(500, "An error occurred while retrieving users.");
        }
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetUserById([FromRoute] int id)
    {
        try
        {
            IUserAction service = new BusinessLogic().UserAction();
            var result = await service.GetUserById(id);
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
    public async Task<IActionResult> CreateUser([FromBody] UserCreateDto userCreateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IUserAction service = new BusinessLogic().UserAction();
            var result = await service.CreateUser(userCreateDto);
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
    public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] UserUpdateDto userUpdateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        try
        {
            IUserAction service = new BusinessLogic().UserAction();
            var result = await service.UpdateUser(id, userUpdateDto);
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
    public async Task<IActionResult> DeleteUser([FromRoute] int id)
    {
        try
        {
            IUserAction service = new BusinessLogic().UserAction();
            var result = await service.DeleteUser(id);
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
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out var userId))
            return Unauthorized();

        try
        {
            IUserAction service = new BusinessLogic().UserAction();
            var result = await service.ChangePassword(userId, dto);
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
    public async Task<IActionResult> UpdateProfile([FromBody] UserProfileUpdateDto userProfileUpdateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdStr, out var userId))
            return Unauthorized();

        try
        {
            IUserAction service = new BusinessLogic().UserAction();
            var result = await service.UpdateProfile(userId, userProfileUpdateDto);
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
