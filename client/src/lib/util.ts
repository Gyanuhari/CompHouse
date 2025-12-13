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

export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined &&
        value.length !== 0
    )
  );
}
