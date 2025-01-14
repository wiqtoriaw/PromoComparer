using PromoComparerAPI.Models.DTOs;
namespace PromoComparerAPI.Interfaces.Crud;

public interface IStoreService
{
    Task<IEnumerable<StoreDto>> GetAllStoresAsync();
    Task<StoreDto> GetStoreByIdAsync(Guid id);
    Task<Guid> GetIdFromStemAsync(string shop_stem);
    Task<List<string>> GetAllStemsAsync();
    Task<StoreDto> CreateStoreAsync(StoreDto storeDto);
    Task CreateStoresFromConfAsync();
}

