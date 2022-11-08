import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: JSON.parse(localStorage.getItem("activeUser"))?.watchlistIDs || [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlistRedux(state, action) {
      state.watchlist = action.payload;
    },
    removeFromWatchlistRedux(state, action) {
      state.watchlist = action.payload;
    },
  },
});

export const { addToWatchlistRedux, removeFromWatchlistRedux } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
