// advanceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  modalType: "",
  modalData: {},
};

const advanceSlice = createSlice({
  name: "advance",
  initialState,
  reducers: {
    showModal(state, action) {
      state.showModal = true;
      state.modalType = action.payload.type;
      state.modalData = action.payload.data;
    },
    hideModal(state) {
      state.showModal = false;
      state.modalType = "";
      state.modalData = {};
    },
    resetAuth: () => initialState, 
  },
});

export const { showModal, hideModal, resetAuth } = advanceSlice.actions;
export default advanceSlice.reducer;