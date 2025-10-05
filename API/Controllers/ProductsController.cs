using API.DTOs.ProductDtos;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly CompContext _context;

    public ProductsController(CompContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductToReturnDto>>> GetProducts()
    {
        var products = await _context.Products
            .Include(p => p.Brand)
            .Include(p => p.Type)
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
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products
            .Include(p => p.Brand)
            .Include(p => p.Type)
            .Include(p => p.Specifications)
            .ThenInclude(p => p.ChildSpecifications)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null) return NotFound();

        return product;
    }
}
