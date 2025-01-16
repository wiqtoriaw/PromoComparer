using PromoComparerAPI.Models.DTOs;
namespace PromoComparerAPI.Interfaces.Crud;

public interface ICategoryService
{
    Task<List<string>> GetAllCategoriesListAsync();
    Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
    Task<CategoryDto> GetCategoryByIdAsync(Guid id);
    Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto);
    Task<Guid> GetCategoryIdFromCategoryNameAsync(string categoryName);
    Task CreateCategoryFromListAsync();
}
