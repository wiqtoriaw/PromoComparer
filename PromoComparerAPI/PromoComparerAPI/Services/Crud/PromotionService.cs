using Microsoft.EntityFrameworkCore;
using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Services.Crud;

public class PromotionService : IPromotionService
{
    private readonly ApplicationDbContext _context;

    public PromotionService(ApplicationDbContext context)
    {
        _context = context;
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

    public async Task<IEnumerable<PromotionDto>> GetActivePromotionsAsync()
    {
        var currentDate = DateTime.Now;

        var promotions = await _context.Promotions
            .Where(p => p.StartDate <= currentDate && p.EndDate >= currentDate)
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

        return promotions;
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
}
