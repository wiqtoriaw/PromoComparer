using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers.Crud;


[ApiController]
[Route("api/[controller]")]
public class PromotionController : Controller
{
    private readonly IPromotionService _promotionService;


    public PromotionController(IPromotionService promotionService)
    {
        _promotionService = promotionService;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<PromotionDto>>> GetAllPromotions()
    {
        var promotionDtos = await _promotionService.GetAllPromotionsAsync();
        return Ok(promotionDtos);
    }


    [HttpGet("active")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<PromotionDto>>> GetActivePromotions()
    {
        var activePromotions = await _promotionService.GetActivePromotionsAsync();
        return Ok(activePromotions);
    }


    [HttpGet("{id}", Name = "GetPromotion")]
    public async Task<ActionResult<PromotionDto>> GetPromotion(Guid id)
    {
        var promotionDto = await _promotionService.GetPromotionByIdAsync(id);
        return promotionDto != null ? Ok(promotionDto) : NotFound();
    }


    //[HttpPost]
    //public async Task<ActionResult<PromotionDto>> CreatePromotionAsync([FromBody] PromotionDto promotionDto)
    //{
    //    var createdPromotion = await _promotionService.CreatePromotionAsync(promotionDto);
    //    return CreatedAtRoute("GetPromotion", new { id = createdPromotion.Id }, createdPromotion);
    //}
}
