import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myPortfolioBalance: JSON.parse(localStorage.getItem("activeUser"))?.myBalance || []
};

export const PortfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setMyPortfolioBalance: (state, action) => {
      state.myPortfolioBalance = action.payload;
    }
  }
});

export const { setMyPortfolioBalance } = PortfolioSlice.actions;
export default PortfolioSlice.reducer;
