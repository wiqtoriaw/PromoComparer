namespace PromoComparerAPI.Models.DTOs;

public class CategoryDto
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }

}
