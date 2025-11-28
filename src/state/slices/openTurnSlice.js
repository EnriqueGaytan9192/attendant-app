import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expanded: {
        cars: false,
        bikes: false,
        bicycles: false,
    },
    selectedPlates: {},
};

const openTurnSlice = createSlice({
    name: "openTurn",
    initialState,
    reducers: {

    }
});

export const {

} = openTurnSlice.actions;

export default openTurnSlice.reducer;