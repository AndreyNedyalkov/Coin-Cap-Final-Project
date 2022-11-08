import { createSlice } from "@reduxjs/toolkit";
import defaultIconUrl from "../components/Icons/QuestionCoin.png";

const initialState = {
  firstCoinIconUrl: defaultIconUrl,
  secondCoinIconUrl: defaultIconUrl,
  myBalance: 0,
  rateFirstCoin: "",
  rateSecondCoin: "",
  firstChosenCoinPrice: 0,
  secondChosenCoinPrice: 0,
  rate: 0,
};

export const coinsForSwapSlice = createSlice({
  name: "swaper",
  initialState,
  reducers: {
    setFirstCoinIconUrl: (state, action) => {
      state.firstCoinIconUrl = action.payload;
    },
    setSecondCoinIconUrl: (state, action) => {
      state.secondCoinIconUrl = action.payload;
    },
    setMyBalance: (state, action) => {
      state.myBalance = action.payload;
    },
    setRateFirstCoin: (state, action) => {
      state.rateFirstCoin = action.payload;
    },
    setRateSecondCoin: (state, action) => {
      state.rateSecondCoin = action.payload;
    },
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    setFirstChosenCoinPrice: (state, action) => {
      state.firstChosenCoinPrice = action.payload;
    },
    setSecondChosenCoinPrice: (state, action) => {
      state.secondChosenCoinPrice = action.payload;
    },
  },
});

export const {
  setFirstCoinIconUrl,
  setSecondCoinIconUrl,
  setMyBalance,
  setRateFirstCoin,
  setRateSecondCoin,
  setFirstChosenCoinPrice,
  setSecondChosenCoinPrice,
  setRate,
} = coinsForSwapSlice.actions;
export default coinsForSwapSlice.reducer;
