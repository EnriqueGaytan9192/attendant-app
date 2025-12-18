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
            state.selectedOperator = action.payload;
        },

        //Descuento de Nómina: Jefes
        showModalManagers(state, action) {
            state.isModalManagersVisible = action.payload;
        },
        setSelectedManagers(state, action) {
            state.selectedManagers = action.payload;
        },

        resetPayrollDeductions: () => initialState,
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