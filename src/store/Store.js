import { configureStore } from "@reduxjs/toolkit";
import drowerModalSliceReducer from "./ModalsDrowerSlice"
import  disabler  from "./IsLoginSlice";
import swaper from "./SwapSlice";
import watchlistSlice from "./WatchlistSlice";
import  blueBarAssets  from "./BlueBarAssets";
import fetchSlice from "./FetchSlice";
import portfolioSlice from "./PortfolioSlice"

export const store = configureStore({
    reducer: {
        drowerModalSlice: drowerModalSliceReducer,
        disabler: disabler,
        swaper: swaper,
        watchlistSlice: watchlistSlice,
        blueBarAssets: blueBarAssets,
        fetchSlice: fetchSlice,
        portfolio: portfolioSlice,
    }
});

export default store;
