using Coravel;
using Microsoft.EntityFrameworkCore;
using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Interfaces.Crud;
using PromoComparerAPI.Services;
using PromoComparerAPI.Services.Crud;

namespace PromoComparerAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var conString = builder.Configuration.GetConnectionString("DbPromoComparer") ??
            throw new InvalidOperationException("Connection string 'DbPromoComparer'" + " not found.");

        // Add services to the container.

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(conString));
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddTransient<IPdfHandlerService, PdfHandlerService>();
        builder.Services.AddScoped<IPromotionService, PromotionService>();
        builder.Services.AddScoped<IStoreService, StoreService>();
        builder.Services.AddScoped<ILeafletService, LeafletService>();
        builder.Services.AddScoped<ICategoryService, CategoryService>();
        builder.Services.AddTransient<IOpenAIService, OpenAIService>(sp =>
        {
            var apiKey = builder.Configuration["OPENAI_API_KEY"];
            var promotionService = sp.GetRequiredService<IPromotionService>();
            var categoryService = sp.GetRequiredService<ICategoryService>();

            return new OpenAIService(apiKey, promotionService, categoryService);
        });
        builder.Services.AddTransient<Scheduler>();

        // Add Coravel's scheduling services
        builder.Services.AddScheduler();


        var app = builder.Build();

        app.Services.UseScheduler(scheduler =>
        {
            scheduler.Schedule<Scheduler>()
                .DailyAt(0, 0);
        });

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseHttpsRedirection();
        }

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
