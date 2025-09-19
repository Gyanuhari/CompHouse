using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class Specification : TrackableBaseEntity
{
    public required string Title { get; set; }

    public required int DisplayOrder { get; set; }

    public required int ProductId { get; set; }
    public Product Product { get; set; }

    public ICollection<ChildSpecification> ChildSpecifications { get; set; }
}
