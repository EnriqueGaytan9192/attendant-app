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
    manualPlates: [],
    enganchados: {
        platesVehicles: [],
        platesMotos: [],
        platesBikes: [],
    },
    observaciones: "",
    vehicleInPatioCount: 0,

    //Segunda pantalla
    baseCaja: 0,
    isComplete: true,

    //Tercer pantalla
    dispositivos: [
        { name: "Tablets", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Impresora", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Datáfonos", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Radios", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Hub de pagos", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
    ],
    seguridad: [
        { name: "Aviso tarifas", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Av. responsabilidad", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Aviso horarios", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Botiquín", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Extintores", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Llaveros", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
    ],
    infraestructura: [
        { name: "Lamparas", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Bombillos", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Piso", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Techo", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Topellantas", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Demarcación", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Desagues", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
        { name: "Baños", cantidad: '', estado: "Buen Estado", observaciones: "", cantidadError: false, estadoError: false },
    ],
    loadingInfrastructure: false,
    errorInfrastructure: null,
    candidadError: false,
    estadoError: false,

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
        togglePlate(state, action) {
            const plate = action.payload;
            state.selectedPlates[plate] = !state.selectedPlates[plate];
        },
        selectAll(state, action) {
            const plates = action.payload;
            plates.forEach(p => {
                state.selectedPlates[p] = true;
            });
        },
        deselectAll(state, action) {
            const plates = action.payload;
            plates.forEach(p => {
                state.selectedPlates[p] = false;
            });
        },
        addManualPlate(state, action) {
            const { plate, type_vehicle, entry_date, entry_hour } = action.payload;
            const exists = state.manualPlates.some(p => p.plate === plate);

            if (!exists) {
                state.manualPlates.push({
                    plate,
                    type_vehicle,
                    entry_date,
                    entry_hour,
                });
            };
        },
        removeManualPlate(state, action) {
            state.manualPlates = state.manualPlates.filter(
                p => p.plate !== action.payload
            );
        },
        setEnganchados(state, action) {
            state.enganchados = action.payload;
        },
        setObservaciones(state, action) {
            state.observaciones = action.payload;
        },
        setVehicleInPatioCount(state, action) {
            state.vehicleInPatioCount = action.payload;
        },

        //Segunda pantalla
        setBaseCaja(state, action) {
            state.baseCaja = action.payload;
        },
        setIsComplete(state, action) {
            state.isComplete = action.payload;
        },

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
        addInfrastructure(state, action) {
            const resultado = agruparInfraestructura(action.payload);
            state.dispositivos = resultado.dispositivos;
            state.seguridad = resultado.seguridad;
            state.infraestructura = resultado.infraestructura;
        },
        setLoadingInfrastructure(state, action) {
            state.loadingInfrastructure = action.payload;
        },
        setErrorInfrastructure(state, action) {
            state.errorInfrastructure = action.payload;
        },
        setFieldError: (state, action) => {
            const { category, index, field, value } = action.payload;
            state[category][index][`${field}Error`] = value;
        },
        clearFieldErrors: (state, action) => {
            const { category } = action.payload;
            state[category].forEach(item => {
                item.cantidadError = false;
                item.estadoError = false;
            });
        },


        setStepFour(state) {
            // Forzamos que solo stepFour sea true
            state.stepOne = false;
            state.stepTwo = false;
            state.stepThree = false;
            state.stepFour = true;
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
        resetOpenTurn: () => ({
            ...initialState,
            loadingInfrastructure: false,
            errorInfrastructure: null,
        }),
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
            "Lámparas", "Bombillos", "Piso", "Techo",
            "Topellantas", "Demarcación", "Desagües", "Baños"
        ]
    };

    const resultado = {
        dispositivos: [],
        seguridad: [],
        infraestructura: []
    };

    const encontrados = new Set();

    infrastructure.forEach(item => {
        const nombre = item.nombreItems?.trim();
        if (!nombre || encontrados.has(nombre)) return;

        encontrados.add(nombre);

        const data = {
            id: item.id ?? 0,
            name: nombre,
            cantidad: item.cantidad ?? "",
            estado: item.estadoApertura ?? "Buen Estado",
            observaciones: item.observacionesApertura ?? ""
        };

        if (categorias.dispositivos.includes(nombre)) resultado.dispositivos.push(data);
        else if (categorias.seguridad.includes(nombre)) resultado.seguridad.push(data);
        else if (categorias.infraestructura.includes(nombre)) resultado.infraestructura.push(data);
    });

    return resultado;
};


export const {
    //Primer pantalla
    togglePlate,
    selectAll,
    deselectAll,
    addManualPlate,
    removeManualPlate,
    setEnganchados,
    setObservaciones,
    setVehicleInPatioCount,

    //Segunda pantalla
    setBaseCaja,
    setIsComplete,

    //Tercer pantalla
    updateCantidad,
    updateEstado,
    updateObservation,
    addInfrastructure,
    setFieldError,
    clearFieldErrors,

    setStepFour,
    nextStep,
    previousStep,
    resetOpenTurn
} = openTurnSlice.actions;

export default openTurnSlice.reducer;