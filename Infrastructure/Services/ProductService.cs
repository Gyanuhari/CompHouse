using Infrastructure.Extensions;
using Infrastructure.Data;

namespace Infrastructure.Services;

public class ProductService
{
    private readonly CompContext _context;

    public ProductService(CompContext context)
    {
        _context = context;
    }

    public async Task GetProductList()
    {
        // Get list of product with primary image only

        await Task.CompletedTask;
    }

    public async Task GetProductDetail()
    {
        // Get product details
        await Task.CompletedTask;
    }

    public async Task GetProductImages()
    {
        // Get list of product images
        await Task.CompletedTask;
    }

    public async Task UpdateProductImages()
    {
        // Update image, Set primary image, Delete image/images
        await Task.CompletedTask;
    }

    public async Task SoftDeleteProductAsync(int productId, long deletedBy)
    {
        _context.Products.SoftDelete(productId, deletedBy);
        await _context.SaveChangesAsync();
    }
}
