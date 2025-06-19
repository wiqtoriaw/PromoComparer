using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Interfaces
{
    public interface IUserPanelService
    {
        Task<IEnumerable<ActivePromotionDto>> GetFavouritePromotionsAsync(string userId);
        Task AddFavouriteAsync(string userId, Guid promotionId);
        Task RemoveFavouriteAsync(string userId, Guid promotionId);

    }
}