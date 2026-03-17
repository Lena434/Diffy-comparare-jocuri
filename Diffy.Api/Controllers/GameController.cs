using Microsoft.AspNetCore.Mvc;
using Diffy.BusinessLayer;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.Game;
using Diffy.Domain.Models.Service;

namespace Diffy.Api.Controllers;

[ApiController]
[Route("api/games")]
public class GameController : ControllerBase
{
    private readonly IGameLogic _gameLogic;

    public GameController()
    {
        var bl = new BusinessLogic();
        _gameLogic = bl.GetGameLogic();
    }

    [HttpGet("list")]
    public IActionResult GetGameList()
    {
        var result =  _gameLogic.GetGameList();
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetGameById([FromRoute] int id)
    {
        var result = _gameLogic.GetGameById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateGame([FromBody] GameCreateDto gameCreateDto)
    {
        var result = _gameLogic.CreateGame(gameCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }
}