using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers.Crud;

[ApiController]
[Route("api/[controller]s")]
public class LeafletController : ControllerBase
{
    private readonly ILeafletService _leafletService;
    private readonly ILogger<LeafletController> _logger;

    public LeafletController(ILeafletService leafletService, ILogger<LeafletController> logger)
    {
        _leafletService = leafletService;
        _logger = logger;
    }

    //[HttpGet]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<IEnumerable<LeafletDto>>> GetAllLeaflets()
    //{
    //    try
    //    {
    //        var leafletDtos = await _leafletService.GetAllLeafletsAsync();
    //        return Ok(leafletDtos);
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while retrieving leaflets.");
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving leaflets.");
    //    }
    //}

    //[HttpGet("{id}", Name = "GetLeaflet")]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status404NotFound)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<LeafletDto>> GetLeaflet(Guid id)
    //{
    //    try
    //    {
    //        var leafletDto = await _leafletService.GetLeafletByIdAsync(id);
    //        if (leafletDto != null)
    //        {
    //            return Ok(leafletDto);
    //        }
    //        _logger.LogWarning("Leaflet with ID {LeafletId} was not found.", id);
    //        return NotFound();
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while retrieving the leaflet with ID {LeafletId}.", id);
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the leaflet.");
    //    }
    //}

    //[HttpPost]
    //[ProducesResponseType(StatusCodes.Status201Created)]
    //[ProducesResponseType(StatusCodes.Status400BadRequest)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<LeafletDto>> CreateLeaflet([FromBody] LeafletDto leafletDto)
    //{
    //    try
    //    {
    //        var createdLeaflet = await _leafletService.CreateLeafletAsync(leafletDto);
    //        _logger.LogInformation("Leaflet created successfully with ID {LeafletId}.", createdLeaflet.Id);
    //        return CreatedAtRoute("GetLeaflet", new { id = createdLeaflet.Id }, createdLeaflet);
    //    }
    //    catch (InvalidOperationException ex)
    //    {
    //        _logger.LogWarning(ex, "Failed to create leaflet: {ErrorMessage}", ex.Message);
    //        ModelState.AddModelError("", ex.Message);
    //        return BadRequest(ModelState);
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while creating a leaflet.");
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating a leaflet.");
    //    }
    //}
}