using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;
using PromoComparerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PromoComparerAPI.Services.Crud;

public class StoreService : IStoreService
{
    private readonly ApplicationDbContext _context;
    private readonly List<string> _shopsList;


    public StoreService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _shopsList = configuration.GetSection("Shops").Get<List<string>>() ?? throw new ArgumentNullException(nameof(_shopsList), "The 'Shops' section in the configuration is missing or empty.");
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

    public async Task<Guid> GetIdFromStemAsync(string shop_stem)
    {
        var store = await _context.Stores
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Stem.ToLower() == shop_stem.ToLower());

        if (store == null)
        {
            throw new KeyNotFoundException($"Store with stem '{shop_stem}' not found.");
        }

        return store.Id;
    }

    public async Task<List<string>> GetAllStemsAsync()
    {
        var stems = await _context.Stores
            .Select(store => store.Stem)
            .ToListAsync();

        return stems;
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

    public async Task CreateStoresFromConfAsync() //jednorazowe wprowadzenie sklepów do bazy
    {
        foreach (var shop_stem in _shopsList)
        {
            try
            {
                var shopParts = shop_stem.Split('-');

                for (int i = 0; i < shopParts.Length; i++)
                {
                    if (shopParts[i].Length > 0)
                    {
                        var firstChar = char.ToUpper(shopParts[i][0]);
                        var rest = shopParts[i].Substring(1).ToLower();
                        shopParts[i] = firstChar + rest;
                    }
                }

                var shop_name = string.Join(" ", shopParts);

                if (await _context.Stores.AnyAsync(s => s.Name.ToLower() == shop_name.ToLower()))
                {
                    throw new InvalidOperationException($"Store '{shop_name}' already exists!");
                }

                var store = new Store
                {
                    Name = shop_name,
                    Stem = shop_stem
                };

                _context.Stores.Add(store);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Added store: {shop_name}");
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error for store '{shop_stem}': {ex.Message}");
            }
        }
    }
}
