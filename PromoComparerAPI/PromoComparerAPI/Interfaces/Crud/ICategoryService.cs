using PromoComparerAPI.Models.DTOs;
namespace PromoComparerAPI.Interfaces.Crud;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
    Task<CategoryDto> GetCategoryByIdAsync(Guid id);
    Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto);
    Guid GetCategoryIdFromCategoryName(string categoryName);
    void CreateCategoryFromList();
}
