using OpenAI.Chat;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Interfaces.Crud;

public interface IPromotionService
{
    Task<IEnumerable<ActivePromotionDto>> GetActivePromotionsAsync();
    Task<IEnumerable<TopActivePromotionDto>> GetTopPromotionsAsync();
    Task<IEnumerable<ActivePromotionByDto>> GetAllActivePromotionsByStore(Guid storeId);
    Task<IEnumerable<ActivePromotionByDto>> GetAllActivePromotionsByCategory(Guid categoryId);
    Task<IEnumerable<PromotionDto>> GetAllPromotionsAsync();
    Task<PromotionDto> GetPromotionByIdAsync(Guid id);
    Task<PromotionDto> CreatePromotionAsync(PromotionDto promotionDto);
    Task CreatePromotionsAsync(ChatCompletion completion, Guid guidLeaflet);
}
