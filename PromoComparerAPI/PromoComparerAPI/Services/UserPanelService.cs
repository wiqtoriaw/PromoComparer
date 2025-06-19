using Microsoft.EntityFrameworkCore;
using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Models;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Services
{
    public class UserPanelService : IUserPanelService
    {
        private readonly ApplicationDbContext _context;

        public UserPanelService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ActivePromotionDto>> GetFavouritePromotionsAsync(string userId)
        {
            var favouritePromotions = await _context.Favourites
                .Where(f => f.UserId == userId)
                .Include(f => f.Promotion)
                    .ThenInclude(p => p.Category)
                .Include(f => f.Promotion)
                    .ThenInclude(p => p.Leaflet)
                        .ThenInclude(l => l.Store)
                .Select(f => new ActivePromotionDto
                {
                    Id = f.Promotion.Id,
                    ProductName = f.Promotion.ProductName,
                    UnitType = f.Promotion.UnitType,
                    OriginalPrice = f.Promotion.OriginalPrice,
                    PriceAfterPromotion = f.Promotion.PriceAfterPromotion,
                    PromotionType = f.Promotion.PromotionType,
                    StartDate = f.Promotion.StartDate ?? f.Promotion.Leaflet.StartDate,
                    EndDate = f.Promotion.EndDate ?? f.Promotion.Leaflet.EndDate,
                    UntilOutOfStock = f.Promotion.UntilOutOfStock,
                    RequiredApp = f.Promotion.RequiredApp,
                    CategoryName = f.Promotion.Category.Name,
                    StoreName = f.Promotion.Leaflet.Store.Name
                })
                .ToListAsync();

            return favouritePromotions;
        }

        public async Task AddFavouriteAsync(string userId, Guid promotionId)
        {
            var exists = await _context.Favourites.AnyAsync(f => f.UserId == userId && f.PromotionId == promotionId);
            if (exists)
            {
                return;
            }

            var promotionExists = await _context.Promotions.AnyAsync(p => p.Id == promotionId);
            if (!promotionExists)
            {
                throw new Exception("Nie znaleziono promocji o podanym Id.");
            }

            var favourite = new Favourite
            {
                UserId = userId,
                PromotionId = promotionId
            };

            _context.Favourites.Add(favourite);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveFavouriteAsync(string userId, Guid promotionId)
{
    var favourite = await _context.Favourites
        .FirstOrDefaultAsync(f => f.UserId == userId && f.PromotionId == promotionId);

    if (favourite == null)
    {
        throw new Exception("Nie znaleziono takiej promocji w ulubionych.");
    }

    _context.Favourites.Remove(favourite);
    await _context.SaveChangesAsync();
}
    }
}