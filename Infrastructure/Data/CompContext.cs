using Core.Entities;
using Infrastructure.Configuration;
using Microsoft.EntityFrameworkCore;
using Type = Core.Entities.Type;

namespace Infrastructure.Data;

public class CompContext(DbContextOptions<CompContext> options) : DbContext(options)
{
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Type> Types { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Specification> Specifications { get; set; }
    public DbSet<ChildSpecification> ChildSpecifications { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<KeyValue> KeyValues { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProductConfiguration).Assembly);
    }
}
