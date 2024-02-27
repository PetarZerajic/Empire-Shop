import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../../constants/constants";

const orderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...data },
      }),
    }),
    payOrder: build.mutation({
      query: ({ id, details }) => ({
        url: `${ORDERS_URL}/${id}/pay `,
        method: "PATCH",
        body: { ...details },
      }),
    }),
    getPayPalClientId: build.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} = orderSlice;
