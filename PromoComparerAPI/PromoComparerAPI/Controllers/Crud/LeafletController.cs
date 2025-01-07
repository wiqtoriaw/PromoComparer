using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers.Crud;

[ApiController]
[Route("api/[controller]")]
public class LeafletController : Controller
{
    private readonly ILeafletService _leafletService;


    public LeafletController(ILeafletService leafletService)
    {
        _leafletService = leafletService;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<LeafletDto>>> GetAllLeaflets()
    {
        var leafletDtos = await _leafletService.GetAllLeafletsAsync();
        return Ok(leafletDtos);
    }


    [HttpGet("{id}", Name = "GetLeaflet")]
    public async Task<ActionResult<LeafletDto>> GetLeaflet(Guid id)
    {
        var leafletDto = await _leafletService.GetLeafletByIdAsync(id);
        return leafletDto != null ? Ok(leafletDto) : NotFound();
    }


    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LeafletDto>> CreateLeaflet([FromBody] LeafletDto leafletDto)
    {
        var createdLeaflet = await _leafletService.CreateLeafletAsync(leafletDto);
        return CreatedAtRoute("GetLeaflet", new { id = createdLeaflet.Id }, createdLeaflet);
    }
}
