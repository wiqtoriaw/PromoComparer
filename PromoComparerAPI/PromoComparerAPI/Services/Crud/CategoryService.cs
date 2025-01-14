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

    public async Task<List<string>> GetAllCategoriesAsync() // wykorzystane w OpenAIService
    {
        return await _context.Categories
            .Select(category => category.Name)
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

    public async Task<Guid> GetCategoryIdFromCategoryNameAsync(string categoryName) // wykorzystane w PromotionService
    {
        var category = await _context.Categories
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Name.ToLower() == categoryName.ToLower());

        if (category == null)
        {
            throw new KeyNotFoundException($"Category with name '{categoryName}' not found.");
        }

        return category.Id;
    }

    public async Task CreateCategoryFromListAsync() //jednorazowe wywołanie
    {
        var categoryNames = new List<string>
        {
            "Artykuły spożywcze",
            "Chemia gospodarcza i artykuły higieniczne",
            "Produkty dla dzieci",
            "Artykuły domowe i dekoracje",
            "Elektronika",
            "Odzież i obuwie",
            "Produkty związane z sezonowymi potrzebami",
            "Artykuły ogrodowe i DIY",
            "Zwierzęta domowe"
        };

        foreach (var categoryName in categoryNames)
        {
            try
            {

                if (await _context.Categories.AnyAsync(s => s.Name.ToLower() == categoryName.ToLower()))
                {
                    throw new InvalidOperationException($"Category '{categoryName}' already exists!");
                }

                var category = new Category
                {
                    Name = categoryName
                };

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error for category '{categoryName}': {ex.Message}");
            }
        }
    }
}
