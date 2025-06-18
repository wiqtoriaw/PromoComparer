using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OpenAI.Chat;
using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models;
using PromoComparerAPI.Models.DTOs;
using System.Text.Json;

namespace PromoComparerAPI.Services.Crud;

public class PromotionService : IPromotionService
{
    private readonly ApplicationDbContext _context;
    private readonly ICategoryService _categoryService;
    private readonly ILeafletService _leafletService;

    public PromotionService(ApplicationDbContext context, ICategoryService categoryService, ILeafletService leafletService)
    {
        _context = context;
        _categoryService = categoryService;
        _leafletService = leafletService;
    }
    public async Task<IEnumerable<PromotionDto>> GetAllPromotionsAsync()
    {
        return await _context.Promotions
            .Select(promotion => new PromotionDto
            {
                Id = promotion.Id,
                ProductName = promotion.ProductName,
                UnitType = promotion.UnitType,
                OriginalPrice = promotion.OriginalPrice,
                PriceAfterPromotion = promotion.PriceAfterPromotion,
                PromotionType = promotion.PromotionType,
                StartDate = promotion.StartDate,
                EndDate = promotion.EndDate,
                UntilOutOfStock = promotion.UntilOutOfStock,
                RequiredApp = promotion.RequiredApp,
                CategoryId = promotion.CategoryId,
                LeafletId = promotion.LeafletId
            })
            .ToListAsync();
    }

    public async Task<PromotionDto> GetPromotionByIdAsync(Guid id)
    {
        var promotion = await _context.Promotions.FindAsync(id);
        if (promotion == null)
        {
            throw new KeyNotFoundException("Promotion not found.");
        }

        return new PromotionDto
        {
            Id = promotion.Id,
            ProductName = promotion.ProductName,
            UnitType = promotion.UnitType,
            OriginalPrice = promotion.OriginalPrice,
            PriceAfterPromotion = promotion.PriceAfterPromotion,
            PromotionType = promotion.PromotionType,
            StartDate = promotion.StartDate,
            EndDate = promotion.EndDate,
            UntilOutOfStock = promotion.UntilOutOfStock,
            RequiredApp = promotion.RequiredApp,
            CategoryId = promotion.CategoryId,
            LeafletId = promotion.LeafletId
        };
    }

    public async Task<IEnumerable<ActivePromotionDto>> GetActivePromotionsAsync()
    {
        var currentDate = DateTime.Now;

        var promotions = await _context.Promotions
            .Where(p => (p.StartDate ?? p.Leaflet.StartDate) <= currentDate &&
                        (p.EndDate ?? p.Leaflet.EndDate) >= currentDate)
            .Select(promotion => new ActivePromotionDto
            {
                Id = promotion.Id,
                ProductName = promotion.ProductName,
                UnitType = promotion.UnitType,
                OriginalPrice = promotion.OriginalPrice,
                PriceAfterPromotion = promotion.PriceAfterPromotion,
                PromotionType = promotion.PromotionType,
                StartDate = promotion.StartDate ?? promotion.Leaflet.StartDate,  // Sprawdzamy i przypisujemy datę z Leaflet dla StartDate
                EndDate = promotion.EndDate ?? promotion.Leaflet.EndDate,        // Sprawdzamy i przypisujemy datę z Leaflet dla EndDate
                UntilOutOfStock = promotion.UntilOutOfStock,
                RequiredApp = promotion.RequiredApp,
                CategoryName = promotion.Category.Name,
                StoreName = promotion.Leaflet.Store.Name
            })
            .ToListAsync();

        return promotions;
    }


    public async Task<IEnumerable<TopActivePromotionDto>> GetTopPromotionsAsync()
    {
        var results = new List<TopActivePromotionDto>();

        using (var connection = _context.Database.GetDbConnection())
        {
            await connection.OpenAsync();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "GetTop10LargestPromotions";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var promotion = new TopActivePromotionDto
                        {
                            Id = reader.GetGuid(reader.GetOrdinal("PromotionId")),
                            ProductName = reader.GetString(reader.GetOrdinal("ProductName")),
                            OriginalPrice = reader.IsDBNull(reader.GetOrdinal("OriginalPrice")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("OriginalPrice")),
                            PriceAfterPromotion = reader.IsDBNull(reader.GetOrdinal("PriceAfterPromotion")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("PriceAfterPromotion")),
                            DiscountAmount = reader.IsDBNull(reader.GetOrdinal("DiscountAmount")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("DiscountAmount")),
                            DiscountPercent = reader.IsDBNull(reader.GetOrdinal("DiscountPercent")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("DiscountPercent")),
                            StartDate = reader.GetString(reader.GetOrdinal("StartDate")),
                            EndDate = reader.GetString(reader.GetOrdinal("EndDate")),
                            CategoryName = reader.GetString(reader.GetOrdinal("CategoryName")),
                            StoreName = reader.GetString(reader.GetOrdinal("StoreName")),
                            StoreId = reader.GetGuid(reader.GetOrdinal("StoreId")),
                        };

                        results.Add(promotion);
                    }
                }
            }
        }

        return results;
    }


    public async Task<IEnumerable<ActivePromotionByDto>> GetAllActivePromotionsByStore(Guid storeId)
    {
        var results = new List<ActivePromotionByDto>();

        using (var connection = _context.Database.GetDbConnection())
        {
            await connection.OpenAsync();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "GetPromotionsByStore";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                var storeIdParameter = new SqlParameter("@StoreId", storeId);
                command.Parameters.Add(storeIdParameter);

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var promotion = new ActivePromotionByDto
                        {
                            Id = reader.GetGuid(reader.GetOrdinal("PromotionId")),
                            ProductName = reader.GetString(reader.GetOrdinal("ProductName")),
                            OriginalPrice = reader.IsDBNull(reader.GetOrdinal("OriginalPrice")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("OriginalPrice")),
                            PriceAfterPromotion = reader.IsDBNull(reader.GetOrdinal("PriceAfterPromotion")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("PriceAfterPromotion")),
                            DiscountAmount = reader.IsDBNull(reader.GetOrdinal("DiscountAmount")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("DiscountAmount")),
                            StartDate = reader.GetString(reader.GetOrdinal("StartDate")),
                            EndDate = reader.GetString(reader.GetOrdinal("EndDate")),
                            CategoryName = reader.GetString(reader.GetOrdinal("CategoryName")),
                            StoreName = reader.GetString(reader.GetOrdinal("StoreName")),
                        };

                        results.Add(promotion);
                    }
                }
            }
        }

        return results;
    }


    public async Task<IEnumerable<ActivePromotionByDto>> GetAllActivePromotionsByCategory(Guid categoryId)
    {
        var results = new List<ActivePromotionByDto>();

        using (var connection = _context.Database.GetDbConnection())
        {
            await connection.OpenAsync();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "GetPromotionsByCategory";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                var categoryIdParameter = new SqlParameter("@CategoryId", categoryId);
                command.Parameters.Add(categoryIdParameter);

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var promotion = new ActivePromotionByDto
                        {
                            Id = reader.GetGuid(reader.GetOrdinal("PromotionId")),
                            ProductName = reader.GetString(reader.GetOrdinal("ProductName")),
                            OriginalPrice = reader.IsDBNull(reader.GetOrdinal("OriginalPrice")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("OriginalPrice")),
                            PriceAfterPromotion = reader.IsDBNull(reader.GetOrdinal("PriceAfterPromotion")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("PriceAfterPromotion")),
                            DiscountAmount = reader.IsDBNull(reader.GetOrdinal("DiscountAmount")) ? null : (decimal?)reader.GetDecimal(reader.GetOrdinal("DiscountAmount")),
                            StartDate = reader.GetString(reader.GetOrdinal("StartDate")),
                            EndDate = reader.GetString(reader.GetOrdinal("EndDate")),
                            CategoryName = reader.GetString(reader.GetOrdinal("CategoryName")),
                            StoreName = reader.GetString(reader.GetOrdinal("StoreName")),
                        };

                        results.Add(promotion);
                    }
                }
            }
        }

        return results;
    }


    public async Task<PromotionDto> CreatePromotionAsync(PromotionDto promotionDto)
    {
        var promotion = new Promotion
        {
            ProductName = promotionDto.ProductName,
            UnitType = promotionDto.UnitType,
            OriginalPrice = promotionDto.OriginalPrice,
            PriceAfterPromotion = promotionDto.PriceAfterPromotion,
            PromotionType = promotionDto.PromotionType,
            StartDate = promotionDto.StartDate,
            EndDate = promotionDto.EndDate,
            UntilOutOfStock = promotionDto.UntilOutOfStock,
            RequiredApp = promotionDto.RequiredApp,
            CategoryId = promotionDto.CategoryId,
            LeafletId = promotionDto.LeafletId
        };

        _context.Promotions.Add(promotion);
        await _context.SaveChangesAsync();

        promotionDto.Id = promotion.Id;
        return promotionDto;
    }

    public async Task CreatePromotionsAsync(ChatCompletion completion, Guid guidLeaflet)
    {
        try
        {
            using (JsonDocument structuredJson = JsonDocument.Parse(completion.Content[0].Text))
            {

                JsonElement root = structuredJson.RootElement;

                if (root.ValueKind == JsonValueKind.Object && root.GetProperty("promotions").ValueKind == JsonValueKind.Array)
                {
                    JsonElement promotions = root.GetProperty("promotions");

                    if (promotions.GetArrayLength() == 0)
                    {
                        throw new InvalidOperationException("No promotion data.");
                    }

                    foreach (JsonElement promotion in promotions.EnumerateArray())
                    {

                        string productName = promotion.GetProperty("ProductName").GetString();

                        string? unitType = promotion.GetProperty("UnitType").GetString() ?? null;



                        decimal? originalPrice = promotion.GetProperty("OriginalPrice").ValueKind == JsonValueKind.Number
                            ? promotion.GetProperty("OriginalPrice").GetDecimal()
                            : (decimal?)null;

                        decimal? priceAfterPromotion = promotion.GetProperty("PriceAfterPromotion").ValueKind == JsonValueKind.Number
                            ? promotion.GetProperty("PriceAfterPromotion").GetDecimal()
                            : (decimal?)null;


                        if (priceAfterPromotion == null)
                        {
                            throw new ArgumentNullException(nameof(priceAfterPromotion), "Price after promotion cannot be null.");
                        }


                        if (originalPrice != null && originalPrice <= priceAfterPromotion)
                        {
                            throw new InvalidOperationException($"Promotional price ({priceAfterPromotion}) should be less than the original price ({originalPrice}).");
                        }


                        string? promotionType = promotion.GetProperty("PromotionType").GetString() ?? null;

                        DateTime? startDate = promotion.GetProperty("StartDate").ValueKind == JsonValueKind.String
                            ? (DateTime?)promotion.GetProperty("StartDate").GetDateTime().Date
                            : null;

                        DateTime? endDate = promotion.GetProperty("EndDate").ValueKind == JsonValueKind.String
                            ? (DateTime?)promotion.GetProperty("EndDate").GetDateTime().Date.Add(new TimeSpan(23, 59, 59))
                            : null;


                        bool untilOutOfStock = promotion.GetProperty("UntilOutOfStock").GetBoolean();

                        string? requiredApp = promotion.GetProperty("RequiredApp").GetString() ?? null;

                        string categoryName = promotion.GetProperty("Category").GetString();
                        Guid categoryId = await _categoryService.GetCategoryIdFromCategoryNameAsync(categoryName);

                        var promotionToDatabase = new Promotion
                        {
                            ProductName = productName,
                            UnitType = unitType,
                            OriginalPrice = originalPrice,
                            PriceAfterPromotion = priceAfterPromotion,
                            PromotionType = promotionType,
                            StartDate = startDate,
                            EndDate = endDate,
                            UntilOutOfStock = untilOutOfStock,
                            RequiredApp = requiredApp,
                            CategoryId = categoryId,
                            LeafletId = guidLeaflet
                        };

                        _context.Promotions.Add(promotionToDatabase);
                        await _context.SaveChangesAsync();

                    }
                }
                else
                {
                    throw new InvalidOperationException("Invalid input data.");
                }
            }
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"Error in CreatePromotion: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unexpected error in CreatePromotion: {ex.Message}");
        }
    }
}
