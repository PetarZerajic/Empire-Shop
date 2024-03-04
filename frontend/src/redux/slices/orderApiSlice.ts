import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../../constants/constants";

const orderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
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
    getMyOrders: build.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: build.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
} = orderSlice;
