import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isModalOneVisible: false,
    isModalTwoVisible: false,
    form: {
        email: '',
        password: '',
        usernameOneModal: '',
        emailOneModal: '',
    },
    formTwo: {
        emailTwoModal: '',
    }
}

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
        changeValueFormRecovery(state, action) {
            state.formTwo[action.payload.name] = action.payload.value;
        },
        resetAuth: () => initialState,
    },
});

export const { 
    login,
    logout,
    showForgotPasswordModal,
    showForgotUsernameModal,
    setDataForm,
    changeValueForm,
    changeValueFormRecovery,
    resetAuth,
} = authSlice.actions;

export default authSlice.reducer;