import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    selectedCategory: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory:(state,action)=>{
        state.selectedCategory=action.payload
    },
    setClearQuery:(state)=>{
        state.searchQuery="",
        state.selectedCategory=""
    }
  },
});

export const { setSearchQuery ,setSelectedCategory,setClearQuery} = searchSlice.actions;
export default searchSlice.reducer;
