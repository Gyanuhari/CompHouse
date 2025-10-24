import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/product";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ({ url: "products" }),
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => ({ url: `products/${productId}` }),
    }),
  }),
});

export const { useFetchProductDetailsQuery, useFetchProductsQuery } =
  catalogApi;
