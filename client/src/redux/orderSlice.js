import api from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOrderOfUser = createAsyncThunk("getOrderOfUser", async () => {
  try {
    const res = await api.get("order/getOrderOfUser");
    return res.data.order;
  } catch (error) {
    console.log("Error in the getOrderOfUser thunk", error);
    throw error;
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    isError: false,
    order: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderOfUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderOfUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrderOfUser.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default orderSlice.reducer;
