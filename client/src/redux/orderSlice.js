import api from "@/api/axios";
import { ORDER_API_END_POINT, PURCHASE_API_END_POINT } from "@/utils/constant";
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

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const orderRes = await api.post(
        `${ORDER_API_END_POINT}/createOrder`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (orderRes.data.success) {
        const stripeRes = await api.post(
          `${PURCHASE_API_END_POINT}/create-checkout-session`,
          orderRes.data.order,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("Stripe response:", stripeRes.data);
        return stripeRes.data.url;
      } else {
        return rejectWithValue("Order creation failed");
      }
    } catch (error) {
      console.error("Order Error:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId) => {
    try {
      const res = await api.get(
        `${ORDER_API_END_POINT}/getOrderById/${orderId}`
      );
      return res.data.order;
    } catch (error) {
      console.log("Error in the getOrderById is", error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, isDelivered }) => {
    try {
      const res = await api.put(
        `${ORDER_API_END_POINT}/updateOrderStatus/${orderId}`,
        { isDelivered },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error in the updateOrderStatus is", error);
    }
  }
);

export const getAllOrders = createAsyncThunk("orders/getAll", async () => {
  try {
    const response = await api.get(`${ORDER_API_END_POINT}/getAllOrders`);
    return response.data.orders;
  } catch (error) {
    console.log("Error in the getAllOrders is", error);
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
    builder.addCase(getOrderOfUser.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(placeOrder.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.order = [];
    });
    builder.addCase(placeOrder.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getOrderById.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    builder.addCase(updateOrderStatus.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    });
    builder.addCase(updateOrderStatus.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAllOrders.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.updateSuccess = true;
      state.order = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllOrders.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default orderSlice.reducer;
