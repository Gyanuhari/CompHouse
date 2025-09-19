using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class ProductImage : Image
{
    public required int ProductId { get; set; }
    public Product Product { get; set; }
}
