using Microsoft.EntityFrameworkCore;
using PromoComparerAPI.Data;

namespace PromoComparerAPI.Extensions;

public static class MigrationExtensions
{
    public static void ApplyMigratons(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        using ApplicationDbContext context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();
    }
}
