using System.Security.Cryptography;

namespace Core.Entities;

public class Basket
{
    public int Id { get; set; }
    public required string BasketId { get; set; }
    public string ClientSecret { get; set; }
    public string PaymentIntentId { get; set; }

    public List<BasketItem> BasketItems { get; set; } = [];

    public void AddItem(Product product, int quantity)
    {
        if (product == null) ArgumentNullException.ThrowIfNull(product);
        if (quantity <= 0) throw new ArgumentException("Quantity should be greater than zero", nameof(quantity));

        var item = BasketItems.FirstOrDefault(i => i.ProductId == product.Id);
        if (item == null)
        {
            item = new BasketItem
            {
                ProductId = product.Id,
                Product = product,
                Quantity = quantity,
            };

            BasketItems.Add(item);
        }
        else
        {
            item.Quantity += quantity;
        }

    }

    public void RemoveItem(int productId, int quantity)
    {
        if (quantity <= 0) throw new ArgumentException("Quantity should be greater than zero", nameof(quantity));

        var item = BasketItems.FirstOrDefault(i => i.ProductId == productId);
        if (item == null) return;

        item.Quantity -= quantity;
        if (item.Quantity < 1) BasketItems.Remove(item);
    }
}
