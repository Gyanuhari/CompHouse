using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Infrastructure.Configuration;
using Type = Core.Entities.Type;

public class TypeConfiguration : IEntityTypeConfiguration<Type>
{
    public void Configure(EntityTypeBuilder<Type> builder)
    {
        builder.Property(t => t.Name).IsRequired().HasMaxLength(100);

        builder.HasOne(t => t.Brand).WithMany(b => b.Types).HasForeignKey(t => t.BrandId).OnDelete(DeleteBehavior.Restrict);
        builder.HasMany(t => t.Products).WithOne(p => p.Type).HasForeignKey(p => p.TypeId).OnDelete(DeleteBehavior.Restrict);
    }
}
