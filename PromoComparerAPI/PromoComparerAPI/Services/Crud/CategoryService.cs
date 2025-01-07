using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;
using PromoComparerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PromoComparerAPI.Services.Crud;

public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext _context;

    public CategoryService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        return await _context.Categories
            .Select(category => new CategoryDto
            {
                Id = category.Id,
                Name = category.Name
            })
            .ToListAsync();
    }

    public async Task<CategoryDto> GetCategoryByIdAsync(Guid id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
        {
            throw new KeyNotFoundException("Category not found.");
        }

        return new CategoryDto { Id = category.Id, Name = category.Name };
    }

    public async Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto)
    {
        if (await _context.Categories.AnyAsync(c => c.Name.ToLower() == categoryDto.Name.ToLower()))
        {
            throw new InvalidOperationException("Category already exists!");
        }

        var category = new Category
        {
            Name = categoryDto.Name
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        categoryDto.Id = category.Id;
        return categoryDto;
    }
}
