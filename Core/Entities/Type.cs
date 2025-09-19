using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Type : TrackableBaseEntity
{
    public required string Name { get; set; }

    public required int BrandId { get; set; }
    public Brand Brand { get; set; }

    public virtual ICollection<Product> Products { get; set; }
}
