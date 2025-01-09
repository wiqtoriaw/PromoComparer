using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;
using PromoComparerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PromoComparerAPI.Services.Crud;

public class LeafletService : ILeafletService
{
    private readonly ApplicationDbContext _context;
    private readonly IStoreService _storeService;


    public LeafletService(ApplicationDbContext context, IStoreService storeService)
    {
        _context = context;
        _storeService = storeService;
    }

    public async Task<IEnumerable<LeafletDto>> GetAllLeafletsAsync()
    {
        return await _context.Leaflets
            .Select(leaflet => new LeafletDto 
            { 
                Id = leaflet.Id, 
                StartDate = leaflet.StartDate,
                EndDate = leaflet.EndDate,
                StoreId = leaflet.StoreId
            })
            .ToListAsync();
    }


    public async Task<LeafletDto> GetLeafletByIdAsync(Guid id)
    {
        var leaflet = await _context.Leaflets.FindAsync(id);
        if (leaflet == null)
        {
            throw new KeyNotFoundException("Leaflet not found.");
        }

        return new LeafletDto
        {
            Id = leaflet.Id,
            StartDate = leaflet.StartDate,
            EndDate = leaflet.EndDate,
            StoreId = leaflet.StoreId
        };
    }

    public async Task<LeafletDto> CreateLeafletAsync(LeafletDto leafletDto)
    {
        var leaflet = new Leaflet
        {
            StartDate = leafletDto.StartDate,
            EndDate = leafletDto.EndDate,
            StoreId = leafletDto.StoreId
        };

        _context.Leaflets.Add(leaflet);
        await _context.SaveChangesAsync();

        leafletDto.Id = leaflet.Id;
        return leafletDto;
    }

    //

    public Guid CreateLeaflet(string dateRange, string shop_stem)
    {
        var dates = dateRange.Split('–');

        if (dates.Length == 2)
        {
            var startDateString = dates[0].Trim();
            var endDateString = dates[1].Trim();

            DateTime startDate = DateTime.ParseExact(startDateString, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            DateTime endDate = DateTime.ParseExact(endDateString, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);

            startDate = startDate.Date; // ustawia czas na północ (00:00:00)
            endDate = endDate.Date.AddDays(1).AddTicks(-1); // ustawia czas na koniec dnia (23:59:59.9999999)

            var storeId = _storeService.GetIdFromStem(shop_stem);

            var leaflet = new Leaflet
            {
                StartDate = startDate,
                EndDate = endDate,
                StoreId = storeId
            };

            _context.Leaflets.Add(leaflet);
            _context.SaveChanges();

            return leaflet.Id;

        }
        else
        {
            throw new ArgumentException("Date range format is incorrect.", nameof(dateRange));
        }
    }
}
