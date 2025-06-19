using System.Security.Claims;
using Coravel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PromoComparerAPI.Data;
using PromoComparerAPI.Extensions;
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
        builder.Services.AddScoped<IUserPanelService, UserPanelService>();
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


        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });

        builder.Services.AddAuthentication(options =>
        {
            // domyœlnie u¿ywaj BearerToken do uwierzytelniania
            options.DefaultAuthenticateScheme = IdentityConstants.BearerScheme;
            options.DefaultChallengeScheme = IdentityConstants.BearerScheme;
        })
        .AddCookie(IdentityConstants.ApplicationScheme)           // dla formularza login, logout itp.
        .AddBearerToken(IdentityConstants.BearerScheme);          // obs³uga Authorization: Bearer <token>

        builder.Services.ConfigureApplicationCookie(options =>
        {
            options.Events.OnRedirectToLogin = context =>
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            };
        });

        builder.Services.AddAuthorization();

        builder.Services.AddIdentityCore<User>(options => { /* Identity options if any */ })
            .AddRoles<IdentityRole>() // Add this line to support roles
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddApiEndpoints();

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            EnsureRoles(roleManager); // call the synchronous version
        }

        // Apply the migration in the development environment

        app.Services.UseScheduler(scheduler =>
        {
            scheduler.Schedule<Scheduler>()
                .DailyAt(0, 0);
        });

        app.UseCors("AllowAll");

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.ApplyMigratons();
        }
        else
        {
            app.UseHttpsRedirection();
        }


        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();


        app.MapGet("users/me", async (ClaimsPrincipal claims, ApplicationDbContext context) =>
        {
            string userId = claims.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            return await context.Users.FindAsync(userId);
        })
        .RequireAuthorization();

        app.MapIdentityApi<User>();

        app.Run();

        void EnsureRoles(RoleManager<IdentityRole> roleManager)
        {
            var roles = new[] { "Admin", "User" };

            foreach (var role in roles)
            {
                if (!roleManager.RoleExistsAsync(role).Result)
                {
                    roleManager.CreateAsync(new IdentityRole(role)).Wait();
                }
            }
        }
    }
}
