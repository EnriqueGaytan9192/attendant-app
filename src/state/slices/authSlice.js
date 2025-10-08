import { createSlice } from "@reduxjs/toolkit";

// Estado inicial
const initialState = {
    isAuthenticated: false,
}

// Slice
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});

//Exportar las acciones
export const { login, logout } = authSlice.actions;

// Exportar el reducer
export default authSlice.reducer;