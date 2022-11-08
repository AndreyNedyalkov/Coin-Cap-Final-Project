import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletModalOpen: false
};

export const drowerModalSlice = createSlice({
  name: "conditionDrowerAndModals",
  initialState,
  reducers: {
    setWalletModalOpen: (state) => {
      state.walletModalOpen = !state.walletModalOpen;
    }
  }
});

export const { setWalletModalOpen } = drowerModalSlice.actions;
export default drowerModalSlice.reducer;
