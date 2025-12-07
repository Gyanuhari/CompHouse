import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { type Item, type Basket } from "../../app/models/basket";
import type { Product } from "../../app/models/product";
import { productToItem } from "../../lib/util";

const isBasketItem = (item: Product | Item): item is Item => {
  return (item as Item).quantity !== undefined;
};

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => ({ url: "basket" }),
      providesTags: ["Basket"],
    }),
    addBasketItem: builder.mutation<
      Basket,
      { item: Product | Item; quantity: number }
    >({
      query: ({ item, quantity }) => {
        const productId = isBasketItem(item) ? item.productId : item.id;
        return {
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: "POST",
        };
      },
      onQueryStarted: async (
        { item, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const productId = isBasketItem(item) ? item.productId : item.id;
            const existingItem = draft.items.find(
              (item) => item.productId === productId
            );
            if (existingItem) existingItem.quantity += quantity;
            else {
              const itemToPush = isBasketItem(item)
                ? item
                : productToItem(item, quantity);
              draft.items.push(itemToPush);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    removeBasketItem: builder.mutation<
      void,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const existingItemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );
            if (existingItemIndex >= 0) {
              draft.items[existingItemIndex].quantity -= quantity;
              if (draft.items[existingItemIndex].quantity <= 0)
                draft.items.splice(existingItemIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApi;
