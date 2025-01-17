using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers.Crud;

[ApiController]
[Route("api/[controller]s")]
public class PromotionController : ControllerBase
{
    private readonly IPromotionService _promotionService;
    private readonly ILogger<PromotionController> _logger;

    public PromotionController(IPromotionService promotionService, ILogger<PromotionController> logger)
    {
        _promotionService = promotionService;
        _logger = logger;
    }

    //[HttpGet]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<IEnumerable<PromotionDto>>> GetAllPromotions()
    //{
    //    try
    //    {
    //        var promotionDtos = await _promotionService.GetAllPromotionsAsync();
    //        return Ok(promotionDtos);
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while retrieving all promotions.");
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving all promotions.");
    //    }
    //}

    [HttpGet("active")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<PromotionDto>>> GetActivePromotions()
    {
        try
        {
            var activePromotions = await _promotionService.GetActivePromotionsAsync();
            return Ok(activePromotions);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving active promotions.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving active promotions.");
        }
    }

    [HttpGet("top")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<TopActivePromotionDto>>> GetTopPromotions()
    {
        try
        {
            var promotions = await _promotionService.GetTopPromotionsAsync();
            return Ok(promotions);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching top promotions.");
            return StatusCode(500, "Internal server error");
        }
    }

    // GET: api/Promotions/store/{storeId}
    [HttpGet("store/{storeId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<TopActivePromotionDto>>> GetAllActivePromotionsByStore(Guid storeId)
    {
        try
        {
            var promotions = await _promotionService.GetAllActivePromotionsByStore(storeId);

            if (promotions == null || !promotions.Any())
            {
                _logger.LogInformation("No promotions found for store {StoreId}.", storeId);
                return NotFound($"No promotions found for store with ID {storeId}.");
            }

            return Ok(promotions);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching promotions for store {StoreId}.", storeId);
            return StatusCode(500, "Internal server error");
        }
    }


    // GET: api/promotions/category/{categoryId}
    [HttpGet("category/{categoryId}")]
    public async Task<ActionResult<IEnumerable<TopActivePromotionDto>>> GetAllActivePromotionsByCategory(Guid categoryId)
    {
        try
        {
            var promotions = await _promotionService.GetAllActivePromotionsByCategory(categoryId);

            if (promotions == null || !promotions.Any())
            {
                _logger.LogInformation("No promotions found for category {CategoryId}.", categoryId);
                return NotFound($"No promotions found for category with ID {categoryId}.");
            }

            return Ok(promotions);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching promotions for category {CategoryId}.", categoryId);
            return StatusCode(500, "Internal server error");
        }
    }


    //[HttpGet("{id}", Name = "GetPromotion")]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status404NotFound)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<PromotionDto>> GetPromotion(Guid id)
    //{
    //    try
    //    {
    //        var promotionDto = await _promotionService.GetPromotionByIdAsync(id);
    //        if (promotionDto != null)
    //        {
    //            return Ok(promotionDto);
    //        }
    //        _logger.LogWarning("Promotion with ID {PromotionId} was not found.", id);
    //        return NotFound();
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while retrieving the promotion with ID {PromotionId}.", id);
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the promotion.");
    //    }
    //}

    //[HttpPost]
    //[ProducesResponseType(StatusCodes.Status201Created)]
    //[ProducesResponseType(StatusCodes.Status400BadRequest)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<PromotionDto>> CreatePromotionAsync([FromBody] PromotionDto promotionDto)
    //{
    //    try
    //    {
    //        var createdPromotion = await _promotionService.CreatePromotionAsync(promotionDto);
    //        _logger.LogInformation("Promotion created successfully with ID {PromotionId}.", createdPromotion.Id);
    //        return CreatedAtRoute("GetPromotion", new { id = createdPromotion.Id }, createdPromotion);
    //    }
    //    catch (InvalidOperationException ex)
    //    {
    //        _logger.LogWarning(ex, "Failed to create promotion: {ErrorMessage}", ex.Message);
    //        ModelState.AddModelError("", ex.Message);
    //        return BadRequest(ModelState);
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while creating a promotion.");
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating a promotion.");
    //    }
    //}
}