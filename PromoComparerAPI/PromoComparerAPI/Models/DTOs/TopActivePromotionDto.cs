namespace PromoComparerAPI.Models.DTOs;

public class TopActivePromotionDto
{
    public Guid Id { get; set; }
    public string ProductName { get; set; }
    public decimal? OriginalPrice { get; set; }
    public decimal? PriceAfterPromotion { get; set; }
    public decimal? DiscountAmount { get; set; }
    public decimal? DiscountPercent { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public string CategoryName { get; set; }
    public string StoreName { get; set; }
    public Guid StoreId { get; set; }
}
