import { createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../../interfaces/IProducts";
import { addDecimals } from "../../utils/cartUtils";

interface cartSlice {
  cartItems: IProducts[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

const initialState: cartSlice = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: { address: "", city: "", postalCode: "", country: "" },
  paymentMethod: "PayPal",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const { _id, quantity } = action.payload;
      const existItem = state.cartItems.find((i) => i._id === _id);

      if (existItem) {
        existItem.quantity = quantity;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }

      //Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );

      //Calculate shipping price (If order is over $100 shipping is free ,esle is 10$)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      //Calculate tax price (15% tax)
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );

      //Calculate total price
      state.totalPrice = Number(
        (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );
    },
    deleteItem: (state, action) => {
      const { _id } = action.payload;
      state.cartItems = state.cartItems.filter((i) => i._id !== _id);

      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number((0.1 * state.itemsPrice).toFixed(2)));
      state.totalPrice = Number(
        (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },
  },
});
export const {
  addTocart,
  deleteItem,
  setShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
