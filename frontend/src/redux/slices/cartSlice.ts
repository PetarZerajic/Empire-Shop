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

const initialState: cartSlice = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "{}")
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const { _id, countInStock, quantity } = action.payload;
      const existItem = state.cartItems.find((i) => i._id === _id);

      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === existItem._id ? action.payload : item
        );
        existItem.countInStock = countInStock;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }

      //Calculate items price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * quantity, 0)
      );

      //Calculate shipping price (If order is over $100 shipping is free ,esle is 10$)
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

      //Calculate tax price (15% tax)
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

      //Calculate total price
      state.totalPrice = Number(
        (state.itemPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addTocart } = cartSlice.actions;
export default cartSlice.reducer;
