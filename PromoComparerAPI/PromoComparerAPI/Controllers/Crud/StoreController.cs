using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers.Crud;


[ApiController]
[Route("api/[controller]")]
public class StoreController : Controller
{
    private readonly IStoreService _storeService;


    public StoreController(IStoreService storeService)
    {
        _storeService = storeService;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<StoreDto>>> GetAllStores()
    {
        var storeDtos = await _storeService.GetAllStoresAsync();
        return Ok(storeDtos);
    }


    [HttpGet("{id}", Name = "GetStore")]
    public async Task<ActionResult<StoreDto>> GetStore(Guid id)
    {
        var storeDto = await _storeService.GetStoreByIdAsync(id);
        return storeDto != null ? Ok(storeDto) : NotFound();
    }


    [HttpPost]
    public async Task<ActionResult<StoreDto>> CreateStore([FromBody] StoreDto storeDto)
    {
        try
        {
            var createdStore = await _storeService.CreateStoreAsync(storeDto);
            return CreatedAtRoute("GetStore", new { id = createdStore.Id }, createdStore);
        }
        catch (InvalidOperationException ex)
        {
            ModelState.AddModelError("", ex.Message);
            return BadRequest(ModelState);
        }
    }
}
