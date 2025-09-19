using System.Text.Json.Serialization;
using Core.Interfaces;

namespace Core.Entities;

public class Product : TrackableBaseEntity
{
    public required string Name { get; set; }

    public required string Description { get; set; }

    //[Column(TypeName = "decimal(10,2)")] Configured in fluent-api
    public required decimal Price { get; set; }

    public string PrimaryImageUrl { get; set; }

    public string KeyFeatures { get; set; }

    public required int QuantityInStock { get; set; }

    public required bool IsNewArrival { get; set; }
    public required bool IsOnSale { get; set; }
    public required bool IsOnClearance { get; set; }

    public double AverageRating { get; set; } = 0;

    public required int BrandId { get; set; }
    public Brand Brand { get; set; }

    public required int TypeId { get; set; }
    public Type Type { get; set; }

    public ICollection<ProductImage> ProductImages { get; set; }
    public ICollection<Specification> Specifications { get; set; }
}
