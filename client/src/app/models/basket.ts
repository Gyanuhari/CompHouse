import type { Product } from "./product";

export interface Basket {
  basketId: string;
  items: Item[];
}

export class Item {
  constructor(product: Product, quantity: number) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.quantity = quantity;
    this.pictureUrl = product.imageUrl;
    this.brand = product.brand;
    this.type = product.type;
  }

  productId: number;
  name: string;
  quantity: number;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
}
