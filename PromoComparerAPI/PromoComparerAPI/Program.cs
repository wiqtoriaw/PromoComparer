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
        builder.Services.AddScoped<IPdfHandlerService, PdfHandlerService>();
        builder.Services.AddScoped<IPromotionService, PromotionService>();
        builder.Services.AddScoped<IStoreService, StoreService>();
        builder.Services.AddScoped<ILeafletService, LeafletService>();
        builder.Services.AddScoped<ICategoryService, CategoryService>();
        builder.Services.AddTransient<IOpenAIService, OpenAIService>(sp => new OpenAIService(builder.Configuration["OPENAI_API_KEY"]));

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

        var app = builder.Build();

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
