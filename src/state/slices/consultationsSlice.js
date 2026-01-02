import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vehicleType: null,
    plateError: "",
}

const consultationsSlice = createSlice({
    name: 'consultations',
    initialState,
    reducers: {
        setVehicleType(state, action) {
            state.vehicleType = action.payload;
        },
        setPlateError(state, action) {
            state.plateError = action.payload;
        },

        resetConsultations: () => initialState,
    },
});

export const {
    setVehicleType,
    setPlateError,

    resetConsultations,
} = consultationsSlice.actions;

export default consultationsSlice.reducer;