import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stepOne: true,
    stepTwo: false,
    stepThree: false,
}

const closeTurnSlice = createSlice({
    name: 'closeTurn',
    initialState,
    reducers: {
        nextStep(state) {
            if (state.stepOne) {
                state.stepOne = false;
                state.stepTwo = true;
            } else if (state.stepTwo) {
                state.stepTwo = false;
                state.stepThree = true;
            }
        },
        previousStep(state) {
            if (state.stepThree) {
                state.stepThree = false;
                state.stepTwo = true;
            } else if (state.stepTwo) {
                state.stepTwo = false;
                state.stepOne = true;
            }
        },
        resetCloseTurn: () => initialState,
    },
});

export const {
    nextStep,
    previousStep,
    resetCloseTurn
} = closeTurnSlice.actions;

export default closeTurnSlice.reducer;