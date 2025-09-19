using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class SpecificationConfiguration : IEntityTypeConfiguration<Specification>
{
    public void Configure(EntityTypeBuilder<Specification> builder)
    {
        builder.Property(s => s.Title).IsRequired().HasMaxLength(200);

        builder.HasOne(s => s.Product)
            .WithMany(p => p.Specifications)
            .HasForeignKey(s => s.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(s => s.ChildSpecifications)
            .WithOne(cs => cs.Specification)
            .HasForeignKey(cs => cs.SpecificationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
