import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../../constants/constants";
import { IOrder } from "../../interfaces/IOrder";

const orderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<{ data: { order: IOrder[] } }, void>({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),

    getOneOrder: build.query<{ data: { order: IOrder } }, string | undefined>({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),

    getMyOrders: build.query<{ data: IOrder[] }, void>({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
    }),
    getPayPalClientId: build.query<{ clientId: string }, void>({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "DELETE",
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
  useDeleteOrderMutation,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
} = orderSlice;
