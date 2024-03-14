import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../../constants/constants";
import { IOrder } from "../../interfaces/IOrder";

const orderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<{ data: { order: IOrder[] } }, void>({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    getOneOrder: build.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: build.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPayPalClientId: build.query<{ clientId: string }, void>({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    payOrder: build.mutation({
      query: ({ id, details }) => ({
        url: `${ORDERS_URL}/${id}/pay `,
        method: "PATCH",
        body: details,
      }),
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
  useGetOrdersQuery,
  useGetOneOrderQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
} = orderSlice;
