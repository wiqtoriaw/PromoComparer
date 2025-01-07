using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;
using PromoComparerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PromoComparerAPI.Services.Crud;

public class StoreService : IStoreService
{
    private readonly ApplicationDbContext _context;

    public StoreService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<StoreDto>> GetAllStoresAsync()
    {
        return await _context.Stores
            .Select(store => new StoreDto { Id = store.Id, Name = store.Name, Stem = store.Stem})
            .ToListAsync();
    }

    public async Task<StoreDto> GetStoreByIdAsync(Guid id)
    {
        var store = await _context.Stores.FindAsync(id);
        if (store == null)
        {
            throw new KeyNotFoundException("Store not found.");
        }

        return new StoreDto { Id = store.Id, Name = store.Name, Stem = store.Stem};
    }

    public async Task<StoreDto> CreateStoreAsync(StoreDto storeDto)
    {
        if (await _context.Stores.AnyAsync(s => s.Name.ToLower() == storeDto.Name.ToLower()))
        {
            throw new InvalidOperationException("Store already exists!");
        }

        var store = new Store
        {
            Name = storeDto.Name,
            Stem = storeDto.Stem
        };

        _context.Stores.Add(store);
        await _context.SaveChangesAsync();

        storeDto.Id = store.Id;
        return storeDto;
    }
}
