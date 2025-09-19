using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
        builder.Property(p => p.Description).IsRequired().HasMaxLength(1000);
        builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
        builder.Property(p=>p.PrimaryImageUrl).HasMaxLength(500);
        builder.Property(p => p.KeyFeatures).HasMaxLength(2000);
        builder.Property(p => p.QuantityInStock).HasDefaultValue(0).HasColumnName("QuantityInStock");


        builder.HasOne(p => p.Brand).WithMany(b => b.Products).HasForeignKey(p => p.BrandId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(p => p.Type).WithMany(b => b.Products).HasForeignKey(p => p.TypeId).OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(p => p.ProductImages).WithOne(i => i.Product).HasForeignKey(i => i.ProductId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(p => p.Specifications).WithOne(s => s.Product).HasForeignKey(s => s.ProductId).OnDelete(DeleteBehavior.Restrict);
    }
}
