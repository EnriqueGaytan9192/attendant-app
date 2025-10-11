import { createSlice } from "@reduxjs/toolkit";

// Estado inicial
const initialState = {
    isAuthenticated: false,
    isModalOneVisible: false,
    isModalTwoVisible: false,
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
        showForgotPasswordModal(state, action) {
            state.isModalOneVisible = action.payload;
        },
        showForgotUsernameModal(state, action) {
            state.isModalTwoVisible = action.payload;
        }
    },
});

//Exportar las acciones
export const { 
    login,
    logout,
    showForgotPasswordModal,
    showForgotUsernameModal,
} = authSlice.actions;

// Exportar el reducer
export default authSlice.reducer;