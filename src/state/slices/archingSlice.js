import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showList: false,
  selectedShift: null,
  value: "",        // Valor del arqueo
  idTurn: null,
  showAlert: {
    flag: false,
    severity: "",
    title: "",
    message: "",
  },
  baseCaja: 0
};

const archingSlice = createSlice({
  name: "arching",
  initialState,
  reducers: {
    // Nuevo reducer para actualizar el valor
    setValue(state, action) {
      state.value = action.payload;
    },
    setTurnId(state, action) {
      state.idTurn = action.payload;
    },
    // Reducer para actualizar el estado del menú (por ejemplo, para ocultarlo o mostrarlo)
    handleMenu(state, action) {
      state.showList = action.payload;
    },
    // Reducer para guardar la descripción del turno seleccionado
    handleSelectedShift(state, action) {
      state.selectedShift = action.payload;
    },
    setLabelTitle(state, action) {
      state.showAlert.title = action.payload;
    },
    setLabelMessage(state, action) {
      state.showAlert.message = action.payload;
    },
    // Actualizamos solo las propiedades que llegan en el payload
    showAlert(state, action) {
      state.showAlert.flag = action.payload.flag;
      state.showAlert.severity = action.payload.severity;
      if (action.payload.title !== undefined) {
        state.showAlert.title = action.payload.title;
      }
      // No tocamos "message" aquí para conservar lo que se asigne por separado.
    },
    hideAlert(state) {
      state.showAlert = {
        flag: false,
        severity: "",
        title: "",
        message: "",
      };
    },
    setBaseCaja(state, action) {
      state.baseCaja = action.payload
    },
    resetAuth: () => initialState, 
  },
});

export const { setValue, showAlert, hideAlert, setTurnId, handleMenu,
  handleSelectedShift, setLabelTitle, setLabelMessage ,setBaseCaja, resetAuth} = archingSlice.actions;

export default archingSlice.reducer;
