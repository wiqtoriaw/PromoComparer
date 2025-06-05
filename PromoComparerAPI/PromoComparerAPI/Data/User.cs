using Microsoft.AspNetCore.Identity;
using PromoComparerAPI.Models;

namespace PromoComparerAPI.Data;

public class User : IdentityUser
{
    public string? Initials { get; set; }
    public ICollection<Favourite> Favourites { get; set; } = new List<Favourite>();
}
