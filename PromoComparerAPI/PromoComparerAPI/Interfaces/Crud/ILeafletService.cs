using PromoComparerAPI.Models.DTOs;
namespace PromoComparerAPI.Interfaces.Crud;

public interface ILeafletService
{
    Task<IEnumerable<LeafletDto>> GetAllLeafletsAsync();
    Task<LeafletDto> GetLeafletByIdAsync(Guid id);
    Task<LeafletDto> CreateLeafletAsync(LeafletDto leafletDto);
    Task<Guid> CreateLeafletAsync(string dateRange, string shop_stem, string pdfLink);
    Task<DateTime> GetStartDateFromId(Guid guid);
    Task<DateTime> GetEndDateFromId(Guid guid);
}
