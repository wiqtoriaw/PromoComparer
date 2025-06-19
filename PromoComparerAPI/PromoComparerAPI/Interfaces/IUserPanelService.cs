using PromoComparerAPI.Models;

namespace PromoComparerAPI.Interfaces
{
    public interface IUserPanelService
    {
        Task<IEnumerable<Promotion>> GetFavouritePromotionsAsync(string userId);
        Task AddFavouriteAsync(string userId, Guid promotionId);
        Task RemoveFavouriteAsync(string userId, Guid promotionId);

    }
}