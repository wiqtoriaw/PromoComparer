namespace PromoComparerAPI.Models.DTOs;

public class PromotionDto
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string ProductName { get; set; }
    public string? UnitType { get; set; } //kilogram, sztuka
    public decimal? OriginalPrice { get; set; }
    public decimal? PriceAfterPromotion { get; set; }
    public string? PromotionType { get; set; } = "";
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool UntilOutOfStock { get; set; }
    public string? RequiredApp { get; set; } = "";
    public Guid CategoryId { get; set; }
    public Guid LeafletId { get; set; }
}
