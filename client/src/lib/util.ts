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

// Return true if the string has any content(non-empty)
export function isNotEmpty(value: string) {
  return value?.trim().length > 0;
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
  return passwordRegex.test(password);
}

// Accpets multiple validators and returns true if all validators pass
export function allOf(...validators: ((value: string) => boolean)[]) {
  return (value: string) => validators.every((vfn) => vfn(value));
}

// Accpets multiple validators and returns true if atleast one validator pass
export function anyOf(...validators: ((value: string) => boolean)[]) {
  return (value: string) => validators.some((vfn) => vfn(value));
}
