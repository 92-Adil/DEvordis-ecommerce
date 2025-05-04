import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addWishlistItem: (state, action) => {
      const product = action.payload;
      const existWishlist = state.wishlistItems.find(
        (item) => item._id === product._id
      );
      if (!existWishlist) {
        state.wishlistItems.push({ ...product });
      }
    },
    removeWishlistItem: (state, action) => {
      const product = action.payload;
      const existWishlist = state.wishlistItems.find(
        (item) => item._id === product._id
      );
      if (existWishlist) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== product._id
        );
      }
    },
    clearWishlist: (state) => {
          state.wishlistItems = [];
         
        },
  },
});

export const { addWishlistItem,removeWishlistItem,clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
