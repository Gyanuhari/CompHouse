using API.DTOs.ProductDtos;
using Core.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
    {
        query = orderBy switch
        {
            "price" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };

        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
    {
        if (searchTerm.IsNullOrEmpty()) return query;

        return query.Where(x => x.Name.ToLower().Contains(searchTerm.Trim().ToLower()));
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
    {
        if (!string.IsNullOrEmpty(brands))
            query = query.Where(x => brands.Count() == 0 || brands.ToList().Contains(x.Brand.Name.ToLower()));

        if (!string.IsNullOrEmpty(types))
            query = query.Where(x => types.Count() == 0 || types.ToList().Contains(x.Type.Name.ToLower()));

        return query;
    }

    public static ProductToReturnDto ToReturnDto(this Product product)
    {
        return new ProductToReturnDto
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
