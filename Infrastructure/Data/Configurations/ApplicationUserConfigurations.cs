using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ApplicationUserConfigurations : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.Property(u => u.FullName)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasOne(u => u.Address)
            .WithMany()
            .HasForeignKey(u => u.AddressId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
