import { createSlice } from "@reduxjs/toolkit";

// Estado inicial
const initialState = {
    isAuthenticated: false,
    isModalOneVisible: false,
    isModalTwoVisible: false,
    form: {
        email: '',
        password: '',
    }
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
        },
        setDataForm(state, action) {
            const { name, value } = action.payload;
            if (!name) return;
            state.form[name] = value;
        },
        changeValueForm(state, action) {
            state.form[action.payload.name] = action.payload.value;
        },
    },
});

//Exportar las acciones
export const { 
    login,
    logout,
    showForgotPasswordModal,
    showForgotUsernameModal,
    setDataForm,
    changeValueForm,
} = authSlice.actions;

// Exportar el reducer
export default authSlice.reducer;