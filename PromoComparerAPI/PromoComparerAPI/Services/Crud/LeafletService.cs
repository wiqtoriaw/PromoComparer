using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Models.DTOs;
using PromoComparerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PromoComparerAPI.Services.Crud;

public class LeafletService : ILeafletService
{
    private readonly ApplicationDbContext _context;

    public LeafletService(ApplicationDbContext context)
    {
        _context = context;
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
}
