import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += product.price;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          totalPrice: product.price,
        
        });
      }

      state.totalQuantity += 1;
      state.totalAmount += product.price;
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item._id === productId);

      if (item) {
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;

        if (item.quantity === 1) {
          state.items = state.items.filter((item) => item._id !== productId);
        } else {
          item.quantity -= 1;
          item.totalPrice -= item.price;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
