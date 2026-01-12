using API.DTOs.BasketDtos;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Type = Core.Entities.Type;

namespace API.Extensions;

public static class BasketExtensions
{
    public static BasketDto ToDto(this Basket basket)
    {
        return new BasketDto()
        {
            BasketId = basket.BasketId,
            PaymentIntentId = basket.PaymentIntentId,
            ClientSecret = basket.ClientSecret,
            Items = basket.BasketItems?.Select(item => new BasketItemDto()
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                Quantity = item.Quantity,
                PictureUrl = item.Product.PrimaryImageUrl,
                Type = item.Product.Type?.Name,
                Brand = item.Product.Brand?.Name,
            }).ToList(),
        };
    }

    public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query, string basketId)
    {
        return await query
            .Include(b => b.BasketItems)
                .ThenInclude(i => i.Product)
                    .ThenInclude(p => p.Brand)
            .Include(b => b.BasketItems)
                .ThenInclude(i => i.Product)
                    .ThenInclude(p => p.Type)
            .FirstOrDefaultAsync(b => b.BasketId == basketId);
    }

    public static decimal GetTotal(this Basket basket)
    {
        var subtotal = basket.BasketItems.Sum(item => item.Quantity * item.Product.Price);
        var deliveryFee = subtotal < 2500 ? 50 : 0;
        return subtotal + deliveryFee;
    }
}
