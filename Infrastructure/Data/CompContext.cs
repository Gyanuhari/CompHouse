using Core.Entities;
using Infrastructure.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Type = Core.Entities.Type;

namespace Infrastructure.Data;

public class CompContext(DbContextOptions<CompContext> options) : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Type> Types { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Specification> Specifications { get; set; }
    public DbSet<ChildSpecification> ChildSpecifications { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<KeyValue> KeyValues { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<BasketItem> BasketItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seeds initial role data for the application.
        // TODO: Consider moving to separate configuration if this grows beyond 2-3 roles.
        modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "99F28815-823F-4221-A01D-276E23811836",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "150DB4C6-6CA3-4596-8016-3A28AD3301FE",
                    Name = "Member",
                    NormalizedName = "MEMBER",
                }
            );

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProductConfiguration).Assembly);
    }
}
