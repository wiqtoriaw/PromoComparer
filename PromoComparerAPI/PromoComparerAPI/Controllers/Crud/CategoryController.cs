using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers.Crud;

[ApiController]
[Route("api/Categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly ILogger<CategoryController> _logger;

    public CategoryController(ICategoryService categoryService, ILogger<CategoryController> logger)
    {
        _categoryService = categoryService;
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
    {
        try
        {
            var categoryDtos = await _categoryService.GetAllCategoriesAsync();
            return Ok(categoryDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving categories.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving categories.");
        }
    }


    //[HttpGet("{id}", Name = "GetCategory")]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status404NotFound)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<CategoryDto>> GetCategory(Guid id)
    //{
    //    try
    //    {
    //        var categoryDto = await _categoryService.GetCategoryByIdAsync(id);
    //        if (categoryDto != null)
    //        {
    //            return Ok(categoryDto);
    //        }
    //        _logger.LogWarning("Category with ID {CategoryId} was not found.", id);
    //        return NotFound();
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while retrieving the category with ID {CategoryId}.", id);
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the category.");
    //    }
    //}

    //[HttpPost]
    //[ProducesResponseType(StatusCodes.Status201Created)]
    //[ProducesResponseType(StatusCodes.Status400BadRequest)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CategoryDto categoryDto)
    //{
    //    try
    //    {
    //        var createdCategory = await _categoryService.CreateCategoryAsync(categoryDto);
    //        _logger.LogInformation("Category created successfully with ID {CategoryId}.", createdCategory.Id);
    //        return CreatedAtRoute("GetCategory", new { id = createdCategory.Id }, createdCategory);
    //    }
    //    catch (InvalidOperationException ex)
    //    {
    //        _logger.LogWarning(ex, "Failed to create category: {ErrorMessage}", ex.Message);
    //        ModelState.AddModelError("", ex.Message);
    //        return BadRequest(ModelState);
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while creating a category.");
    //        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating a category.");
    //    }
    //}

    [HttpPost("from-list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateCategoryFromList()   // jednorazowe - wprowadza dane z wypisanej listy
    {
        try
        {
            await _categoryService.CreateCategoryFromListAsync();
            _logger.LogInformation("Categories created from the list successfully.");
            return Ok();
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Invalid operation: {ErrorMessage}", ex.Message);
            ModelState.AddModelError("", ex.Message);
            return BadRequest(ModelState);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while creating categories from the list.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating categories from the list.");
        }
    }
}