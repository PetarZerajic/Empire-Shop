import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOADS_URL } from "../../constants/constants";
import { IProducts } from "../../interfaces/IProducts";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<{ data: IProducts[]; pages: number; page: number }, string | unknown>({
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
    }),
    getTopProducts: build.query<{ data: IProducts[] }, void>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteOneProdcut: build.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    uploadProductImage: build.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}/products`,
        method: "POST",
        body: data,
      }),
    }),
    createProductReview: build.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCTS_URL}/${id}/reviews`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useGetTopProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteOneProdcutMutation,
  useUploadProductImageMutation,
  useCreateProductReviewMutation,
} = productsApiSlice;
