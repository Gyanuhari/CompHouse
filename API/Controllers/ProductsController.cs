using API.DTOs.ProductDtos;
using API.Extensions;
using API.Helpers.RequestHelpers;
using Core.Entities;
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
        var query = _context.Products
            .Sort(prodParams.OrderBy)
            .Search(prodParams.SearchTerm)
            .Include(p => p.Brand)
            .Include(p => p.Type)
            .Filter(prodParams.Brands, prodParams.Types)
            .AsQueryable();

        var pagedProducts = await PagedList<Product>.ToPagedList(query, prodParams.PageNumber, prodParams.PageSize);
        Response.AddPaginationHeader(pagedProducts.Metadata);

        return pagedProducts.Select(product => product.ToReturnDto()).ToList();
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

        return product.ToReturnDto();
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await _context.Brands.Select(b => b.Name).Distinct().ToListAsync();
        var types = await _context.Types.Select(t => t.Name).Distinct().ToListAsync();

        return Ok(new { brands = brands, types = types });
    }
}
