import api from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const res = await api.get("product/getProducts");
      //   console.log("API response in thunk:", res.data);
      return res.data.products;
    } catch (error) {
      console.log("Error in the the fectchAllProduct thunk", error);
      throw error;
    }
  }
);
export const fectchProductById = createAsyncThunk(
  "fectchProductById",
  async (productId) => {
    try {
      const res = await api.get(`product/getProductById/${productId}`);
      return res.data.product;
    } catch (error) {
      console.log("error in fectchSingleProduct thunk", error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: [],
    isError: false,
    product: null,
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
    builder.addCase(fectchProductById.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fectchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fectchProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
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
