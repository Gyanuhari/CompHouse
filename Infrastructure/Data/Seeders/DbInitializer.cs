
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Seeders;

public class DbInitializer
{
    // public void InitializeDb(WebApplication app)
    // {
    //     using var scope = app.Ser
    // }

    public static void SeedData(CompContext context)
    {
        context.Database.Migrate();

        if (context.Products.Any()) return;

    }
}
