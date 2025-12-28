using Core.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using static Core.Constants.AppConstants;

namespace Infrastructure.Data.Seeders;

public class DbInitializer
{
    public static async Task InitializeDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<CompContext>()
                ?? throw new InvalidOperationException("Failed to retrieve CompContext");
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>()
                ?? throw new InvalidOperationException("Failed to retrieve user manager");
        await SeedUsers(context, userManager);
    }

    public static async Task SeedUsers(CompContext context, UserManager<ApplicationUser> userManager)
    {
        context.Database.Migrate();

        if (userManager.Users.Any()) return;

        var user = new ApplicationUser
        {
            FullName = "Raju Chettri",
            UserName = "raju@test.com",
            Email = "raju@test.com",
        };

        await userManager.CreateAsync(user, "P@$$w0rd");
        await userManager.AddToRoleAsync(user, Roles.Member);

        var admin = new ApplicationUser
        {
            FullName = "Hari Chettri",
            UserName = "hari@test.com",
            Email = "hari@test.com",
        };

        await userManager.CreateAsync(admin, "P@$$w0rd!!");
        await userManager.AddToRolesAsync(admin, [Roles.Admin, Roles.Member]);
    }
}
