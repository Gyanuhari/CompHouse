import { useFetchBasketQuery } from "../../features/basket/basketApi";

export default function useBasket() {
  const { data: basket } = useFetchBasketQuery();

  const subTotal =
    basket?.items.reduce(
      (subTotal, item) => subTotal + item.price * item.quantity,
      0
    ) ?? 0;

  const deliveryFee = subTotal < 2500 ? 50 : 0;
  const total = subTotal + deliveryFee;

  return { basket, subTotal, total, deliveryFee };
}
