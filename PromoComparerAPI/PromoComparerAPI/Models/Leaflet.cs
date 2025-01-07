using PromoComparerAPI.Models.DTOs;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PromoComparerAPI.Models;

public class Leaflet
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    [ForeignKey("Store")]
    public Guid StoreId { get; set; }
    public Store Store { get; set; }
    public ICollection<Promotion> Promotions { get; set; } = new List<Promotion>();

}
