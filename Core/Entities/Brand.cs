namespace Core.Entities;

public class Brand : TrackableBaseEntity
{
    public required string Name { get; set; }

    public string Description { get; set; }

    public string LogoUrl {get; set;}

    public virtual ICollection<Product> Products { get; set; }
    public virtual ICollection<Type> Types { get; set; }
}
