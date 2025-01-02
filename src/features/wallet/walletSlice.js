// src/redux/walletSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  address: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.connected = true;
      state.address = action.payload;
    },
    disconnectWallet: (state) => {
      state.connected = false;
      state.address = null;
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
