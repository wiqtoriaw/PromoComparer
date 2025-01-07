namespace PromoComparerAPI.Models.DTOs;

public class StoreDto
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string Stem { get; set; }

}
