import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listView: true,
    paymentView: false,
    selectedMonth: null,
    selectedTabProducts: "sinFactura",
    isModalThreeVisibleBill: false,
    electronicInvoiceNit: "",
}

const productPurchasesSlice = createSlice({
    name: 'productPurchases',
    initialState,
    reducers: {
        goToPayment(state, action) {
            state.listView = false;
            state.paymentView = true;
            state.selectedMonth = action.payload;
        },
        backToList(state) {
            state.listView = true;
            state.paymentView = false;
            state.selectedMonth = null;
        },
        setSelectedTabProducts: (state, action) => {
            state.selectedTabProducts = action.payload;
        },
        showElectronicInvoiceModal(state, action) {
            state.isModalThreeVisibleBill = action.payload;
        },
        closeElectronicInvoiceModal(state, action) {
            state.isModalThreeVisibleBill = action.payload;
        },
        setElectronicInvoiceNit(state, action) {
            state.electronicInvoiceNit = action.payload;
        },
    }
});

export const {
    goToPayment,
    backToList,
    setSelectedTabProducts,
    showElectronicInvoiceModal,
    setElectronicInvoiceNit,
    closeElectronicInvoiceModal
} = productPurchasesSlice.actions;

export default productPurchasesSlice.reducer;