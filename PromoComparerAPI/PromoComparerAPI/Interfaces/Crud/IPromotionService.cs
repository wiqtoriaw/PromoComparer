using OpenAI.Chat;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Interfaces.Crud;

public interface IPromotionService
{
    Task<IEnumerable<PromotionDto>> GetActivePromotionsAsync();
    Task<IEnumerable<PromotionDto>> GetAllPromotionsAsync();
    Task<PromotionDto> GetPromotionByIdAsync(Guid id);
    Task<PromotionDto> CreatePromotionAsync(PromotionDto promotionDto);
    void CreatePromotions(ChatCompletion completion, Guid guidLeaflet);
}
