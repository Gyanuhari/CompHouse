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
        var brandList = new List<string>();
        var typeList = new List<string>();

        if (!string.IsNullOrEmpty(brands))
        {
            brandList = [.. brands.ToLower().Split(",", StringSplitOptions.TrimEntries)];
            query = query.Where(x => brands.Count() == 0 || brandList.Contains(x.Brand.Name.ToLower()));
        }

        if (!string.IsNullOrEmpty(types))
        {
            typeList = [.. types.ToLower().Split(",", StringSplitOptions.TrimEntries)];
            query = query.Where(x => types.Count() == 0 || typeList.Contains(x.Type.Name.ToLower()));
        }

        return query;
    }
}
