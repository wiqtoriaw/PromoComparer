using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PromoComparerAPI.Data;

namespace PromoComparerAPI.Models;

public class Favourite
{
    [Key, Column(Order = 0)]
    public string UserId { get; set; }

    [Key, Column(Order = 1)]
    public Guid PromotionId { get; set; }

    public User User { get; set; }
    public Promotion Promotion { get; set; }
}