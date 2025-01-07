namespace PromoComparerAPI.Models.DTOs;

public class LeafletDto
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public Guid StoreId { get; set; }
}
