export interface Basket {
  basketId: string;
  items: Item[];
  clientSecret?: string;
  paymentIntentId?: string;
}

export interface Item {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
}
