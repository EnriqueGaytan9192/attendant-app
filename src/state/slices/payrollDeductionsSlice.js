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
        closeOperatorsModal(state) {
            state.isModalOperatorsVisible = false;
            state.selectedOperator = null;
        },

        //Descuento de Nómina: Jefes
        showModalManagers(state, action) {
            state.isModalManagersVisible = action.payload;
        },
        setSelectedManagers(state, action) {
            state.selectedManagers = action.payload;
        },
        closeManagersModal(state) {
            state.isModalManagersVisible = false;
            state.selectedManagers = null;
        },

        resetPayrollDeductions: () => initialState,
    }
});

export const {
    //Descuento de Nómina: Operadores
    showModalOperators,
    setSelectedOperator,
    closeOperatorsModal,
    
    //Descuento de Nómina: Jefes
    showModalManagers,
    setSelectedManagers,
    closeManagersModal,

    resetPayrollDeductions,
} = payrollDeductionsSlice.actions;

export default payrollDeductionsSlice.reducer;