using API.DTOs.BasketDtos;
using API.Extensions;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(CompContext context) : BaseApiController
{
    private readonly CompContext _context = context;

    [HttpGet()]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();
        if (basket == null) return NoContent();

        return Ok(basket?.ToDto());
    }

    [HttpPost()]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket() ?? CreateBasket();
        var product = await _context.Products.Include(p => p.Brand).Include(p => p.Type).FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null) return BadRequest("Problem adding item to basket");

        basket.AddItem(product, quantity);

        if (await _context.SaveChangesAsync() > 0)
            return CreatedAtAction(nameof(GetBasket), basket.ToDto());

        return BadRequest("Problem adding item to basket");
    }

    [HttpDelete()]
    public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        if (basket == null) return BadRequest("Problem removing item, basket not available");

        basket.RemoveItem(productId, quantity);
        if (await _context.SaveChangesAsync() > 0)
            return Ok();

        return BadRequest("Problem removing item from basket");
    }

    private async Task<Basket> RetrieveBasket()
    {
        return await _context.Baskets
            .Include(b => b.BasketItems)
                .ThenInclude(i => i.Product)
                    .ThenInclude(p => p.Brand)
            .Include(b => b.BasketItems)
                .ThenInclude(i => i.Product)
                    .ThenInclude(p => p.Type)
            .FirstOrDefaultAsync(b => b.BasketId == Request.Cookies["basketId"]);
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30),
        };

        Response.Cookies.Append("basketId", basketId, cookieOptions);

        var basket = new Basket { BasketId = basketId };
        _context.Baskets.Add(basket);

        return basket;
    }
}
