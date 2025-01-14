using PromoComparerAPI.Models.DTOs;
namespace PromoComparerAPI.Interfaces.Crud;

public interface ICategoryService
{
    Task<List<string>> GetAllCategoriesAsync();
    Task<CategoryDto> GetCategoryByIdAsync(Guid id);
    Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto);
    Task<Guid> GetCategoryIdFromCategoryNameAsync(string categoryName);
    Task CreateCategoryFromListAsync();
}
