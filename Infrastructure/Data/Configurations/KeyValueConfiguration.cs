using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class KeyValueConfiguration : IEntityTypeConfiguration<KeyValue>
{
    public void Configure(EntityTypeBuilder<KeyValue> builder)
    {
        builder.Property(kv=>kv.Rowversion)
            .IsRowVersion()
            .IsConcurrencyToken()
            .HasColumnName("RowVersion")
            .HasComment("Concurrency token for optimistic locking");
    }
}
