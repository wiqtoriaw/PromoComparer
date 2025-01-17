using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers.Crud;


[ApiController]
[Route("api/[controller]s")]
public class StoreController : ControllerBase
{
    private readonly IStoreService _storeService;
    private readonly ILogger<StoreController> _logger;

    public StoreController(IStoreService storeService, ILogger<StoreController> logger)
    {
        _storeService = storeService;
        _logger = logger;
    }


    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<StoreDto>>> GetAllStores()
    {
        try
        {
            var storeDtos = await _storeService.GetAllStoresAsync();
            return storeDtos != null ? Ok(storeDtos) : NotFound();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving stores.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving stores.");
        }
    }


    //[HttpGet("{id}", Name = "GetStore")]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status404NotFound)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<StoreDto>> GetStore(Guid id)
    //{
    //    try
    //    {
    //        var storeDto = await _storeService.GetStoreByIdAsync(id);
    //        return storeDto != null ? Ok(storeDto) : NotFound();
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, $"An error occurred while retrieving the store with ID {id}.");
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the store.");
    //    }
    //}


    //[HttpPost]
    //[ProducesResponseType(StatusCodes.Status201Created)]
    //[ProducesResponseType(StatusCodes.Status400BadRequest)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<StoreDto>> CreateStore([FromBody] StoreDto storeDto)
    //{
    //    try
    //    {
    //        var createdStore = await _storeService.CreateStoreAsync(storeDto);
    //        return CreatedAtRoute("GetStore", new { id = createdStore.Id }, createdStore);
    //    }
    //    catch (InvalidOperationException ex)
    //    {
    //        ModelState.AddModelError("", ex.Message);
    //        return BadRequest(ModelState);
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while creating a store.");
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating a store.");
    //    }
    //}

    [HttpPost("all")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateStoresFromConf() //jednorazowe wywołanie
    {
        try
        {
            await _storeService.CreateStoresFromConfAsync();
            return Created();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while creating stores from configuration.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating stores from configuration.");
        }
    }
}