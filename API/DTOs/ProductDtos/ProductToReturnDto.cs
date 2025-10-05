namespace API.DTOs.ProductDtos;

public class ProductToReturnDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public int QuantityInStock { get; set; }
    public string Brand { get; set; }
    public string Type { get; set; }
}
