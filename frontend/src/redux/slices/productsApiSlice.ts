import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../../constants/constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builde) => ({
    getProducts: builde.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOneProduct: builde.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetOneProductQuery } = productsApiSlice;
