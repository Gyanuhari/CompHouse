using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class BrandConfiguration : IEntityTypeConfiguration<Brand>
{
    public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.Property(b=>b.Name).IsRequired().HasMaxLength(100);
        builder.Property(b=>b.Description).HasMaxLength(500);
        builder.Property(b=>b.LogoUrl).HasMaxLength(200);

        builder.HasMany(b=>b.Types).WithOne(t=>t.Brand).HasForeignKey(t=>t.BrandId).OnDelete(DeleteBehavior.Restrict);
    }
}
