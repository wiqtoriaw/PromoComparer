using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PromoComparerAPI.Models;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Data;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {

    }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Leaflet> Leaflets { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<Store> Stores { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Call base method to configure identity tables
        base.OnModelCreating(modelBuilder);

        // Custom configurations for your models
        modelBuilder.Entity<Promotion>()
            .Property(p => p.OriginalPrice)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Promotion>()
            .Property(p => p.PriceAfterPromotion)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Leaflet>()
            .HasOne(l => l.Store)
            .WithMany(s => s.Leaflets)
            .HasForeignKey(l => l.StoreId);

        modelBuilder.Entity<Promotion>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Promotions)
            .HasForeignKey(p => p.CategoryId);

        modelBuilder.Entity<Promotion>()
            .HasOne(p => p.Leaflet)
            .WithMany(l => l.Promotions)
            .HasForeignKey(p => p.LeafletId);

        // Additional configurations for the User entity if needed
        modelBuilder.Entity<User>().Property(u => u.Initials).HasMaxLength(5);
    }
}
