import { createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../../interfaces/IProducts";
import { addDecimals } from "../../utils/cartUtils";

interface cartSlice {
  cartItems: IProducts[];
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

const initialState: cartSlice = {
  cartItems: [],
  itemPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
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
      state.itemPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );

      //Calculate shipping price (If order is over $100 shipping is free ,esle is 10$)
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

      //Calculate tax price (15% tax)
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

      //Calculate total price
      state.totalPrice = Number(
        (state.itemPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );
    },
    deleteItem: (state, action) => {
      const { _id } = action.payload;
      state.cartItems = state.cartItems.filter((i) => i._id !== _id);

      state.itemPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number((0.1 * state.itemPrice).toFixed(2)));
      state.totalPrice = Number(
        (state.itemPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );
    },
  },
});
export const { addTocart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
