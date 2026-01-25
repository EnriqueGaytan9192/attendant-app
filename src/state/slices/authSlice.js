import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isModalOneVisible: false,
    isModalTwoVisible: false,
    form: {
        email: '',
        password: '',
        passwordVisible: false,
        usernameOneModal: '',
        emailOneModal: '',
    },
    formTwo: {
        emailTwoModal: '',
    },
    token: null,
    numeroIdentificacion: null,
    empleado: null,
    nombreParking: null,
    rol: null,
    parqueaderoId: null,
    terminal: null,
    terminalId: null,
    menus: [],
    exitTurnOpen: null,
    cedulaBeParking: "",
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state, { payload }) {
            state.isAuthenticated = true;
            state.numeroIdentificacion = payload.numeroIdentificacion;
            state.rol = payload.rol;
            state.parqueaderoId = payload.parqueaderoId;
            state.terminal = payload.terminal;
            state.terminalId = payload.terminalId;
            state.exitTurnOpen = payload.existTurnOpen;
            state.nombreParking = payload.nombreParking;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.numeroIdentificacion = null;
            state.rol = null;
            state.token = null;
            state.empleado = null;
            state.parqueaderoId = null;
            state.terminal = null;
            state.exitTurnOpen = null;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setEmpleado(state, action) {
            state.empleado = action.payload;
        },
        loadMenus(state, action) {
            state.menus = action.payload;
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
        setCedulaBeParking(state, action) {
            state.cedulaBeParking = action.payload;
        },

        resetAuth: () => initialState,
    },
});

export const { 
    login,
    logout,
    setToken,
    setEmpleado,
    loadMenus,
    showForgotPasswordModal,
    showForgotUsernameModal,
    setDataForm,
    changeValueForm,
    changeValueFormRecovery,
    setCedulaBeParking,

    resetAuth,
} = authSlice.actions;

export default authSlice.reducer;