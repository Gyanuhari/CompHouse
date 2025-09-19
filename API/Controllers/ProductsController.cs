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
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return await _context.Products.Include(p => p.Specifications).ThenInclude(p => p.ChildSpecifications).ToListAsync();
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
