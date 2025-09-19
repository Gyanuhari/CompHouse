using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Extensions;

public static class SoftDeleteExtensions
{
    public static void SoftDelete<T>(this DbSet<T> dbSet, int id, long? deletedBy = null) where T : TrackableBaseEntity
    {
        var entity = dbSet.Find(id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.DeletedAt = DateTime.UtcNow;
            entity.DeletedBy = deletedBy;
        }
    }
}
