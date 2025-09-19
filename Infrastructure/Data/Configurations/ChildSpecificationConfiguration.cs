using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class ChildSpecificationConfiguration : IEntityTypeConfiguration<ChildSpecification>
{
    public void Configure(EntityTypeBuilder<ChildSpecification> builder)
    {
        builder.Property(cs => cs.Name).IsRequired().HasMaxLength(60);
        builder.Property(cs => cs.Value).IsRequired().HasMaxLength(200);

        builder.HasOne(cs => cs.Specification)
            .WithMany(s => s.ChildSpecifications)
            .HasForeignKey(cs => cs.SpecificationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
