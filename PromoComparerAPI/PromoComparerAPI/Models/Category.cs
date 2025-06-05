using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PromoComparerAPI.Models;

public class Category
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    [StringLength(64)]
    public required string Name { get; set; }
    [JsonIgnore]
    public ICollection<Promotion> Promotions { get; set; } = new List<Promotion>();

}
