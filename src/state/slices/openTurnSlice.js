import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //Primer pantalla
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

    //Segunda pantalla

    //TercerPantalla

    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
};

const openTurnSlice = createSlice({
    name: "openTurn",
    initialState,
    reducers: {
        nextStep(state) {
            if (state.stepOne) {
                state.stepOne = false;
                state.stepTwo = true;
            } else if (state.stepTwo) {
                state.stepTwo = false;
                state.stepThree = true;
            } else if (state.stepThree) {
                state.stepThree = false;
                state.stepFour = true;
            }
        },
        previousStep(state) {
            if (state.stepFour) {
                state.stepFour = false;
                state.stepThree = true;
            } else if (state.stepThree) {
                state.stepThree = false;
                state.stepTwo = true;
            } else if (state.stepTwo) {
                state.stepTwo = false;
                state.stepOne = true;
            }
        },
        resetOpenTurn: () => initialState,
    }
});

export const {
    nextStep,
    previousStep,
    resetOpenTurn
} = openTurnSlice.actions;

export default openTurnSlice.reducer;