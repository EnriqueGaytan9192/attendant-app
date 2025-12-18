import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const movementsSlice = createSlice({
    name: 'movements',
    initialState,
    reducers: {

    },
});

export const {
    
} = movementsSlice.actions;

export default movementsSlice.reducer;