import api from "@/api/axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";


export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password, navigate }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${USER_API_END_POINT}/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      navigate("/");
      return res.data.user;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      return rejectWithValue(error.response.data);
    }
  }
);



export const signupUser = createAsyncThunk(
  "signupUser",
  async ({name, email, password, navigate }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${USER_API_END_POINT}/register`,
        {name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      navigate("/login");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (navigate, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${USER_API_END_POINT}/logout`,
        
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/login");
      return true;
    } catch (error) {
      toast.error("Logout failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (input, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${USER_API_END_POINT}/profile/update`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile update failed");
      return rejectWithValue(error.response.data);
    }
  }
);





const authSlice= createSlice({
name:"auth",
initialState:{
    loading:false,
    user:null,
    isAuthenticated:false
    
},
reducers:{
    
    // setLoading:(state,action)=>{
    //     state.loading=action.payload
    // },
    // // setUser:(state,action)=>{
    // //     state.user=action.payload;
       
    // // }
    // loginSuccess: (state, action) => {
    //     state.user = action.payload;
    //     state.isAuthenticated = true;   
    //   },
    //   logout: (state) => {
    //     state.user = null;
    //     state.isAuthenticated = false;   
    //   },
},

extraReducers: (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state) => {
      state.loading = false;
    })
    .addCase(signupUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(signupUser.fulfilled, (state) => {
      state.loading = false;
      
    })
    .addCase(signupUser.rejected, (state) => {
      state.loading = false;
    })
    .addCase(logoutUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase(logoutUser.rejected, (state) => {
      state.loading = false;
    })
    .addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(updateUserProfile.rejected, (state) => {
      state.loading = false;
    });
},
})

// export const {setLoading,loginSuccess,logout}=authSlice.actions;
export default authSlice.reducer