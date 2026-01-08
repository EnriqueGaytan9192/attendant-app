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