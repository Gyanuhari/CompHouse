using API.DTOs.ProductDtos;
using API.Extensions;
using API.Helpers.RequestHelpers;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly CompContext _context;

    public ProductsController(CompContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductToReturnDto>>> GetProducts([FromQuery] ProductParams prodParams)
    {
        var products = await _context.Products
            .Sort(prodParams.OrderBy)
            .Search(prodParams.SearchTerm)
            .Include(p => p.Brand)
            .Include(p => p.Type)
            .Filter(prodParams.Brands, prodParams.Types)
            .ToListAsync();

        return products.Select(product => new ProductToReturnDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            ImageUrl = product.PrimaryImageUrl,
            Brand = product.Brand?.Name,
            Type = product.Type?.Name,
            QuantityInStock = product.QuantityInStock,
        }).ToList();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {
        var product = await _context.Products
            .Include(p => p.Brand)
            .Include(p => p.Type)
            .Include(p => p.Specifications)
            .ThenInclude(p => p.ChildSpecifications)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null) return NotFound();

        return new ProductToReturnDto()
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            ImageUrl = product.PrimaryImageUrl,
            Brand = product.Brand?.Name,
            Type = product.Type?.Name,
            QuantityInStock = product.QuantityInStock,
        };
    }
}
