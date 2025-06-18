using Microsoft.EntityFrameworkCore;
using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Models;

namespace PromoComparerAPI.Services
{
    public class UserPanelService : IUserPanelService
    {
        private readonly ApplicationDbContext _context;

        public UserPanelService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Promotion>> GetFavouritePromotionsAsync(string userId)
        {
            var favouritePromotions = await _context.Favourites
                .Where(f => f.UserId == userId)
                .Include(f => f.Promotion)
                    .ThenInclude(p => p.Category)
                .Include(f => f.Promotion)
                    .ThenInclude(p => p.Leaflet)
                .Select(f => f.Promotion)
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
    }
}