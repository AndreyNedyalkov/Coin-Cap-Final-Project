import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchCoins: [],
};

const fetchSlice = createSlice({
  name: "fetchSlice",
  initialState,
  reducers: {
    addToFetchSlice(state, action) {
      state.fetchCoins = action.payload;
    },
  },
});

export const { addToFetchSlice } = fetchSlice.actions;
export default fetchSlice.reducer;
