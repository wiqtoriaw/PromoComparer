using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PromoComparerAPI.Models;

public class Store
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [StringLength(64)]
    public required string Name { get; set; } //np. Carrefour Express
    [Required]
    [StringLength(64)]
    public required string Stem { get; set; } //np. carrefour-express
    public ICollection<Leaflet> Leaflets { get; set; } = new List<Leaflet>();
}
