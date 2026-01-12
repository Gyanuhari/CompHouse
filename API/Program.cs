using API.Middlewares;
using Core.Entities;
using Infrastructure.Data;
using Infrastructure.Data.Seeders;
using Infrastructure.Services.Payment;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});
builder.Services.AddDbContext<CompContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("CompConnection"));
});
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddScoped<StripePaymentService>();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>(option =>
{
    option.Password.RequiredLength = 8;
    option.Lockout.MaxFailedAccessAttempts = 5;
    option.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    option.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<CompContext>();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(option =>
{
    option.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/api/test", () => "Hello, I am working!");
app.MapGroup("api").MapIdentityApi<ApplicationUser>();

await DbInitializer.InitializeDb(app);

app.Run();
