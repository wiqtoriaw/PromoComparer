using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PromoComparerAPI.Models;

public class Promotion
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [StringLength(64)]
    public required string ProductName { get; set; }
    public string UnitType { get; set; } = ""; //kilogram, sztuka
    public decimal OriginalPrice { get; set; }
    public decimal PriceAfterPromotion {  get; set; }
    public string PromotionType { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool UntilOutOfStock { get; set; }
    public string RequiredApp { get; set; } = "";


    [ForeignKey("Leaflet")]
    public Guid LeafletId { get; set; }
    public Leaflet Leaflet { get; set; }


    [ForeignKey("Category")]
    public Guid CategoryId { get; set; }
    public Category Category { get; set; }
}
