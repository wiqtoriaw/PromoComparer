using Microsoft.AspNetCore.Identity;

namespace PromoComparerAPI.Data;

public class User : IdentityUser
{
    public string? Initials { get; set; }
}
