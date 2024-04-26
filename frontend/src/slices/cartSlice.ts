import { createSlice } from "@reduxjs/toolkit";

import { IProduct } from "../interface/Product";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: any; type: string }) => {
      const item: IProduct = action.payload;
      const existingItem: IProduct = state.cartItems.find(
        (cardItem: any) => cardItem._id === item._id
      );

      if (existingItem) {
        console.log("existing item : ", existingItem);

        state.cartItems = state.cartItems.map((cardItem: any) =>
          cardItem._id === existingItem._id ? item : cardItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action: { payload: any; type: string }) => {
      state.cartItems = state.cartItems.filter(
        (item: any) => item._id !== action.payload
      );

      return updateCart(state);
    },
    saveShippingAddress: (state, action: { payload: any; type: string }) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action: { payload: any; type: string }) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action: { payload: any; type: string }) => {
      state.cartItems = [];
      return updateCart(state);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
