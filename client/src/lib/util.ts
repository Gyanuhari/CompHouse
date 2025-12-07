import type { Item } from "../app/models/basket";
import type { Product } from "../app/models/product";

export function productToItem(product: Product, quantity: number): Item {
  return {
    productId: product.id,
    name: product.name,
    pictureUrl: product.imageUrl,
    price: product.price,
    quantity: quantity,
    type: product.type,
    brand: product.brand,
  };
}
