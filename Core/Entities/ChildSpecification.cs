using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class ChildSpecification : TrackableBaseEntity
{
    public required string Name { get; set; }

    public required string Value { get; set; }

    public required int DisplayOrder { get; set; }

    public required int SpecificationId { get; set; }
    public Specification Specification { get; set; }
}
