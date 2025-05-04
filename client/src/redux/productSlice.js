import api from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const res =await api.get("product/getProducts");
    //   console.log("API response in thunk:", res.data);
      return res.data.products;
    } catch (error) {
      console.log("Error in the the fectchAllProduct thunk", error);
      throw error
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      console.log("Error", action.payload);

      state.isError = true;
    });
  },
  // reducers:{
  //     setProduct:(state,action)=>{
  //         state.product=action.payload
  //     }
  // }
});
// export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
