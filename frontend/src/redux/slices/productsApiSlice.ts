import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOADS_URL } from "../../constants/constants";
import { IProducts } from "../../interfaces/IProducts";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      { data: IProducts[]; pages: number; page: number },
      string | unknown
    >({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    getOneProduct: build.query<{ data: IProducts }, string | undefined>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTopProducts: build.query<{ data: IProducts[] }, void>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useGetTopProductsQuery,
} = productsApiSlice;
