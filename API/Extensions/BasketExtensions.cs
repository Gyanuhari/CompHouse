using API.DTOs.BasketDtos;
using Core.Entities;
using Type = Core.Entities.Type;

namespace API.Extensions;

public static class BasketExtensions
{
    public static BasketDto ToDto(this Basket basket)
    {
        return new BasketDto()
        {
            BasketId = basket.BasketId,
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
}
