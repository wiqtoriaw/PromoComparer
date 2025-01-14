using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers.Crud;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : Controller
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
    {
        var categoryDtos = await _categoryService.GetAllCategoriesAsync();
        return Ok(categoryDtos);
    }


    [HttpGet("{id}", Name = "GetCategory")]
    public async Task<ActionResult<CategoryDto>> GetCategory(Guid id)
    {
        var categoryDto = await _categoryService.GetCategoryByIdAsync(id);
        return categoryDto != null ? Ok(categoryDto) : NotFound();
    }


    //[HttpPost]
    //public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CategoryDto categoryDto)
    //{
    //    try
    //    {
    //        var createdCategory = await _categoryService.CreateCategoryAsync(categoryDto);
    //        return CreatedAtRoute("GetCategory", new { id = createdCategory.Id }, createdCategory);
    //    }
    //    catch (InvalidOperationException ex)
    //    {
    //        ModelState.AddModelError("", ex.Message);
    //        return BadRequest(ModelState);
    //    }
    //}

    [HttpPost("from-list")]   // jednorazowe - wprowadza już dane z wypisanej listy
    public async Task<IActionResult> CreateCategoryFromList()
    {
        try
        {
            await _categoryService.CreateCategoryFromListAsync();
            return Ok();
        }
        catch (InvalidOperationException ex)
        {
            ModelState.AddModelError("", ex.Message);
            return BadRequest(ModelState);
        }
    }
}