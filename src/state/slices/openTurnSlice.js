import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vehicles: {
        cars: [
            { placa: "AAA111" },
            { placa: "AAA222" },
            { placa: "AAA333" },
            { placa: "AAA444" },
            { placa: "AAA555" },
            { placa: "AAA666" },
        ],
        motos: [],
        bicycles: [],
    },
    selectedPlates: {},

    stepOne: true,
    stepTwo: true,
};

const openTurnSlice = createSlice({
    name: "openTurn",
    initialState,
    reducers: {
        nextStep(state) {
            if (state.stepOne) {
                state.stepOne = false;
                state.stepTwo = true
            }
        },
        previousStep(state) {
            if (state.stepOne) {
                state.stepTwo = false;
                state.stepOne = false;
            }
        },
        resetOpenTurn: () => initialState,
    }
});

export const {
    nextStep,
    previousStep,
} = openTurnSlice.actions;

export default openTurnSlice.reducer;