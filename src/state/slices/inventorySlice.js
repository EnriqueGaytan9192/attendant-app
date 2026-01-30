import { createSlice } from '@reduxjs/toolkit';

/**
 * @author Ing. Daniel Gonzalez
 */

// Estado inicial
const initialState = {
    showAddVehicule: false,
    showAddBici: false,
    showTable: true,
    dataSet: [],
    originalDataSet: [],
    dataSetBicycle: [],
    originalDataSetBicycle: [],
    selectedView: 'vehicles',
    placaInventario: '',
    searchValue: '',
    form: {
        // Campos "generales"
        placa: '',
        vehiculo: '',   // "Carro" o "Moto"
        observaciones: '',

        // Partes del inventario
        chapas: '',
        farolasStop: '',
        copas: '',
        frontal: '',
        emblema: '',
        cauchosLaterales: '',
        tapaLlantas: '',
        espejos: '',
        llantaRepuesto: '',
        radio: '',
        antena: '',
        tapaGasolina: '',
        limpiaBrisas: '',
        bahul: '',

        // Detalles externos
        lateralIzquierdo: '',
        lateralDerecho: '',
        frente: '',
        posterior: '',

        // Fotos
        photos: []
    },
    urls: null
};

// Slice
const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        cleanFormBici(state) {
            state.form = {
                plate: ""
            };
        },
        cleanForm(state) {
            state.form = {
                plate: "",
                vehicle: "",
                bodywork: "",
                mirrors: "",
                brakeLights: "",
                spareWheels: "",
                hubcaps: "",
                radio: "",
                frontPart: "",
                antenna: "",
                emblem: "",
                gasCap: "",
                sideRubbers: "",
                windshieldWipers: "",
                hasTrunk: "",
                wheelCovers: "",
                front: "",
                back: "",
                right: "",
                left: "",
                observations: "",
                photos: []
            };
        },
        setDataForm(state, action) {
            state.form = {
                ...state.form,
                [action.payload.name]: action.payload.value
            };
        },
        // Nueva acción para actualizar el formulario completo de una vez
        setFullForm(state, action) {
            state.form = {
                ...state.form,
                ...action.payload
            };
        },
        changeFlagBy(state, action) {
            state[action.payload.name] = action.payload.value;
        },
        setSelectedView(state, action) {
            state.searchValue = '';
            state.selectedView = action.payload;
        },
        setDataList(state, action) {
            state.dataSet = action.payload;
            state.originalDataSet = action.payload;
        },
        setPlacaInventario(state, action) {
            state.placaInventario = action.payload;
        },
        setDataListBicycle(state, action) {
            state.dataSetBicycle = action.payload;
            state.originalDataSetBicycle = action.payload;
        },
        searchInDataSet(state, action) {
            let searchTerm = action.payload.toUpperCase().trim();
            state.searchValue = action.payload;

            if (!searchTerm) {
                state.dataSet = state.originalDataSet;
                state.dataSetBicycle = state.originalDataSetBicycle;
                return;
            }

            if (state.selectedView === 'vehicles') {
                const filterVehicles = state.originalDataSet.inventory.filter((item) => {
                    const plateMatch = item.plate.toUpperCase().includes(searchTerm);
                    const entryHourMatch = item.entryHour.toUpperCase().includes(searchTerm);
                    const entryDateMatch = item.entryDate.toUpperCase().includes(searchTerm);
                    const vehicleMatch = (item.vehicle === 'Car' ? 'CARRO' : 'MOTO').includes(searchTerm);
                    const stateMatch = (item.state ? 'ACTIVO' : 'INACTIVO').includes(searchTerm);

                    return plateMatch || entryHourMatch || entryDateMatch || vehicleMatch || stateMatch;
                });
                state.dataSet.inventory = filterVehicles;
                return;
            }

            if (state.selectedView === 'bicycles') {
                const filterBicycles = state.originalDataSetBicycle.bikes.filter((item) => {
                    const plateMatch = item.plate.toUpperCase().includes(searchTerm);
                    const entryHourMatch = item.entryAt.split('T')[0].toUpperCase().includes(searchTerm);
                    const entryDateMatch = item.entryAt.split('T')[1].toUpperCase().includes(searchTerm);
                    const stateMatch = (item.state ? 'ACTIVO' : 'INACTIVO').includes(searchTerm);

                    return plateMatch || entryHourMatch || entryDateMatch || stateMatch;
                });
                state.dataSetBicycle.bikes = filterBicycles;
                return;
            }
        },
        setFullFormToEdit(state, action) {
            state.form = {
                ...action.payload,
                isEdit: true
            };
        },
        setFullFormToView(state, action) {
            state.form = {
                ...action.payload,
                isView: true
            };
        },
        setUrls(state, action) {
            state.urls = action.payload;
        },
        resetAuth: () => initialState,
    }
});

// Exportar las acciones
export const {
    setFullFormToEdit,
    setFullFormToView,
    cleanForm,
    changeFlagBy,
    setDataList,
    searchInDataSet,
    setDataListBicycle,
    setSelectedView,
    setDataForm,
    cleanFormBici,
    setUrls,
    setFullForm,
    resetAuth,
    setPlacaInventario
} = inventorySlice.actions;

// Exportar el reducer
export default inventorySlice.reducer;
