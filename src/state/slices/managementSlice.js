import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pqrs: [],
  siniestros: [],
  solicitudes: [],
};

const managementSlice = createSlice({
  name: "management",
  initialState,
  reducers: {
    setPqrsData: (state, action) => {
      state.pqrs = action.payload;
    },
    setSiniestrosData: (state, action) => {
      state.siniestros = action.payload;
    },
    setSolicitudesData: (state, action) => {
      state.solicitudes = action.payload;
    },
    resetAuth: () => initialState,
  },
});

export const { setPqrsData, setSiniestrosData, setSolicitudesData, resetAuth } = managementSlice.actions;
export default managementSlice.reducer;
