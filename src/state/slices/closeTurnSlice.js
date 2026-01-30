import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //Primer pantalla
    reportedValue: "",

    //Segunda pantalla
    //Tercer pantalla
    dispositivos: [
        { name: "Tablets", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Impresora", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Datáfonos", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Radios", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Hub de pagos", cantidad: "", estado: "Buen Estado", observaciones: "" },
    ],
    seguridad: [
        { name: "Aviso tarifas", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Av. responsabilidad", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Aviso horarios", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Botiquín", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Extintores", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Llaveros", cantidad: "", estado: "Buen Estado", observaciones: "" },
    ],
    infraestructura: [
        { name: "Lamparas", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Bombillos", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Piso", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Techo", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Topellantas", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Demarcación", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Desagües", cantidad: "", estado: "Buen Estado", observaciones: "" },
        { name: "Baños", cantidad: "", estado: "Buen Estado", observaciones: "" },
    ],
    reportedValueOverride: "",
    observationClose: "",
    isComplete: true,
    numTicket: "",
    iniTicket: "",
    finTicket: "",
    descuento: 0,
    shifValidatorResponse: null,

    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
    stepFive: false,
    stepSix: false,
    stepSeven: false,
}

const closeTurnSlice = createSlice({
    name: 'closeTurn',
    initialState,
    reducers: {
        //Primer pantalla
        setReportedValue(state, action) {
            state.reportedValue = action.payload;
        },

        //Segunda pantalla
        //Tercer pantalla
        updateObservation: (state, action) => {
            const { category, index, value } = action.payload;
            state[category][index].observaciones = value;
        },
        updateEstado: (state, action) => {
            const { category, index, value } = action.payload;
            state[category][index].estado = value;
        },
        updateCantidad: (state, action) => {
            const { category, index, value } = action.payload;
            state[category][index].cantidad = value;
        },
        addInfrastructure: (state, action) => {
            const grouped = agruparInfraestructura(action.payload);
            state.dispositivos = grouped.dispositivos;
            state.seguridad = grouped.seguridad;
            state.infraestructura = grouped.infraestructura;
        },
        setReportedValueOverride: (state, action) => {
            state.reportedValueOverride = action.payload;
        },
        setObservationClose: (state, action) => {
            state.observationClose = action.payload;
        },
        setIsComplete: (state, action) => {
            state.isComplete = action.payload;
        },
        setNumTicket: (state, action) => {
            state.numTicket = action.payload;
        },
        setIniTicket: (state, action) => {
            state.iniTicket = action.payload;
        },
        setFinTicket: (state, action) => {
            state.finTicket = action.payload;
        },
        setShifValidatorResponse: (state, action) => {
            state.shifValidatorResponse = action.payload;
        },
        setDescuento: (state, action) => {
            state.descuento = action.payload;
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
        setStepOne(state) {
            state.stepOne = true;
            state.stepTwo = false;
            state.stepThree = false;
            state.stepFour = false;
            state.stepFive = false;
            state.stepSeven = false;
        },
        setStepFive(state) {
            state.stepOne = false;
            state.stepTwo = false;
            state.stepThree = false;
            state.stepFour = false;
            state.stepFive = true;
        },
        setStepSix(state) {
            state.stepOne = false;
            state.stepTwo = false;
            state.stepThree = false;
            state.stepFour = false;
            state.stepFive = false;
            state.stepSix = true;
        },
        setStepSeven(state) {
            state.stepOne = false;
            state.stepTwo = false;
            state.stepThree = false;
            state.stepFour = false;
            state.stepFive = false;
            state.stepSix = false;
            state.stepSeven = true;
        },
        resetCloseTurn: () => initialState,
    },
});

const agruparInfraestructura = (infrastructure) => {
    const categorias = {
        dispositivos: ["Tablets", "Impresora", "Datáfonos", "Radios", "Hub de pagos"],
        seguridad: [
            "Aviso Tarifas", "Av. Responsabilidad", "Aviso Horarios",
            "Botiquín", "Extintores", "Llaveros"
        ],
        infraestructura: [
            "Lámparas", "Bombillos", "Piso", "Techo", "Topellantas",
            "Demarcación", "Desagües", "Baños"
        ]
    };

    const result = { dispositivos: [], seguridad: [], infraestructura: [] };
    const seen = new Set();

    infrastructure.forEach(item => {
        const name = item.nombreItems.trim();
        if (seen.has(name)) return;
        seen.add(name);

        const data = {
            id: item.id || 0,
            name,
            cantidad: item.cantidad,
            estado: item.estadoApertura || "Buen Estado",
            observaciones: item.observacionesApertura || ""
        };

        if (categorias.dispositivos.includes(name)) result.dispositivos.push(data);
        else if (categorias.seguridad.includes(name)) result.seguridad.push(data);
        else if (categorias.infraestructura.includes(name)) result.infraestructura.push(data);
    });

    return result;
};


export const {
    //Primer pantalla
    setReportedValue,

    //Segunda pantalla
    //Tercer pantalla
    updateCantidad,
    updateEstado,
    updateObservation,
    addInfrastructure,
    setReportedValueOverride,
    setObservationClose,
    setIsComplete,
    setNumTicket,
    setIniTicket,
    setFinTicket,
    setShifValidatorResponse,
    setDescuento,

    nextStep,
    previousStep,
    setStepOne,
    setStepFive,
    setStepSix,
    setStepSeven,
    resetCloseTurn
} = closeTurnSlice.actions;

export default closeTurnSlice.reducer;