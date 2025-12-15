
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    //Descuento de Nómina: Operadores
    isModalOperatorsVisible: false,
    selectedOperator: null,    
    
    //Descuento de Nómina: Jefes
    isModalManagersVisible: false,
    selectedManagers: null,
};

const payrollDeductionsSlice = createSlice({
    name: "payrollDeductions",
    initialState,
    reducers: {
        //Descuento de Nómina: Operadores
        showModalOperators(state, action) {
            state.isModalOperatorsVisible = action.payload;
        },
        setSelectedOperator(state, action) {
            //console.log("Operador en Redux: ", action.payload)
            state.selectedOperator = action.payload;
            console.log("Operador en Slice: ", state.selectedOperator);
        },

        //Descuento de Nómina: Jefes
        showModalManagers(state, action) {
            state.isModalManagersVisible = action.payload;
        },
        setSelectedManagers(state, action) {
            state.selectedManagers = action.payload;
            console.log("Jefe en Slice: ", state.selectedManagers);
        },

        resetAuth: () => initialState,
    }
});

export const {
    showModalOperators,
    showModalManagers,
    setSelectedOperator,
    setSelectedManagers,
    resetAuth,
} = payrollDeductionsSlice.actions;

export default payrollDeductionsSlice.reducer;