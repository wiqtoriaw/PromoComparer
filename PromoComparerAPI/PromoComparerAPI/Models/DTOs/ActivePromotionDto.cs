namespace PromoComparerAPI.Models.DTOs;

public class ActivePromotionDto
{
    public Guid Id { get; set; }
    public string ProductName { get; set; }
    public string UnitType { get; set; }
    public decimal? OriginalPrice { get; set; }
    public decimal? PriceAfterPromotion { get; set; }
    public string PromotionType { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool UntilOutOfStock { get; set; }
    public string RequiredApp { get; set; }
    public string CategoryName { get; set; }
    public string StoreName { get; set; }
}

