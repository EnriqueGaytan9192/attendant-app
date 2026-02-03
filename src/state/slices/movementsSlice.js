const { createSlice } = require("@reduxjs/toolkit")

const initialState = {

}

const movementsSlice = createSlice({
    name: "movements",
    initialState,
    reducers: {
        resetMovements: () => initialState,
    },
});

export const {
    resetMovements,
} = movementsSlice.actions;

export default movementsSlice.reducer;