import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //Primer pantalla
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

    //Segunda pantalla

    //Tercer pantalla
    dispositivos: [
        { name: "Tablets", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Impresora", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Datáfonos", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Radios", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Hubs", cantidad: '', estado: "Buen Estado", observaciones: "" },
    ],
    seguridad: [
        { name: "Aviso tarifas", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Av. responsabilidad", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Aviso horarios", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Botiquín", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Extintores", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Llaveros", cantidad: '', estado: "Buen Estado", observaciones: "" },
    ],
    infraestructura: [
        { name: "Lamparas", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Bombillos", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Piso", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Techo", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Topellantas", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Demarcación", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Desagues", cantidad: '', estado: "Buen Estado", observaciones: "" },
        { name: "Baños", cantidad: '', estado: "Buen Estado", observaciones: "" },
    ],

    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
};

const openTurnSlice = createSlice({
    name: "openTurn",
    initialState,
    reducers: {
        //Primer pantalla
        //Segunda pantalla
        //Tercer pantalla
        updateCantidad: (state, action) => {
            const { category, index, value } = action.payload;
            state[category][index].cantidad = value;
        },
        updateEstado: (state, action) => {
            const { category, index, value } = action.payload;
            state[category][index].estado = value;
        },
        updateObservation: (state, action) => {
            const { category, index, value } = action.payload;
            state[category][index].observaciones = value;
        },

        nextStep(state) {
            if (state.stepOne) {
                state.stepOne = false;
                state.stepTwo = true;
            } else if (state.stepTwo) {
                state.stepTwo = false;
                state.stepThree = true;
            } else if (state.stepThree) {
                state.stepThree = false;
                state.stepFour = true;
            }
        },
        previousStep(state) {
            if (state.stepFour) {
                state.stepFour = false;
                state.stepThree = true;
            } else if (state.stepThree) {
                state.stepThree = false;
                state.stepTwo = true;
            } else if (state.stepTwo) {
                state.stepTwo = false;
                state.stepOne = true;
            }
        },
        resetOpenTurn: () => initialState,
    }
});

export const {
    //Primer pantalla
    //Segunda pantalla
    //Tercer pantalla
    updateCantidad,
    updateEstado,
    updateObservation,
    
    nextStep,
    previousStep,
    resetOpenTurn
} = openTurnSlice.actions;

export default openTurnSlice.reducer;