import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  //Componente VehicleListCard
  vehiclesList: [],
  selectedVehicle: null,
  scannedData: "",
  scannerVisible: false,
  scannerVisibleParking: false,
  alertMessageQr: "",
  plate: "",
  //Componente VehicleEntryCard
  selectedTab: "addVehicles",
  plateRegister: "",
  owner: "",
  document: "",
  aux: "",
  brand: "",
  color: "",
  selectOptionDoc: [],
  vehicleType: null,
  plateError: "",
  detailsOptions: {
    marco: null,
    frenos: null,
    ruedas: null,
    sillin: null,
    pintura: null,
  },
  photos: {
    photo1: null,
    photo2: null,
  },
  loadingPhotos: {
    photo1: false,
    photo2: false,
  },
  turnoIdEntry: null,

  //Selección de placa para detalle
  selectedDetail: null,

  //Modales Tiquete Perdido y Objetos
  isModalOneVisibleTicket: false,
  photosTicket: {
    idPhoto: null,
    propertyCardPhoto: null,
    driverPhoto: null
  },
  loadingPhotosTicket: {
    idPhoto: false,
    propertyCardPhoto: false,
    driverPhoto: false
  },

  billingSummary: {
    serviceValue: 0,         // Valor del Servicio
    discountBonos: 0,        // Descuento Bonos be parking
    discountValidacion: 0,   // Descuento Validación
    discountAllianceBank: 0, // Descuento Alianza bancos
    valueToPay: 0,           // Valor a Pagar
    appliedAlliance: null,
  },

  isModalTwoVisibleObjects: false,
  turnoIdObjects: null,

  //Parte de Salida de Vehículo
  stepOne: true,
  stepTwo: false,
  stepThree: false,
  stepFour: false,
  isModalThreeVisibleBill: false,
  blockNavigation: false,

  //Aplicar descuentos Salida de Vehiculos
  selectedTabDescounts: "validations",
  vehicleExitData: undefined,
  totals: undefined,
  searchResult: undefined,
  bonusList: [],

  //Redux para firma electronica
  signature: null,
  reload: {
    list: false
  },
  electronicInvoiceNit: "",
};

const movementsSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {

    //Componente VehicleListCard
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
    setScannerVisible: (state, action) => {
      state.scannerVisible = action.payload;
    },
    setScannerVisibleParking: (state, action) => {
      state.scannerVisibleParking = action.payload;
    },
    setElectronicInvoiceNit(state, action) {
      state.electronicInvoiceNit = action.payload;
    },
    setScannedData: (state, action) => {
      state.scannedData = action.payload;
    },
    setVehicleList: (state, action) => {
      state.vehiclesList = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertMessageQr = action.payload;
    },
    setPlate: (state, action) => {
      state.plate = action.payload;
    },

    //Componente VehicleEntryCard
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setPlateRegister: (state, action) => {
      state.plateRegister = action.payload;
    },
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
    setDocument: (state, action) => {
      state.document = action.payload;
    },
    setAux: (state, action) => {
      state.aux = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setSelectOptionDoc: (state, action) => {
      state.selectOptionDoc = action.payload;
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
    setPlateError: (state, action) => {
      state.plateError = action.payload;
    },
    setDetailsOptions(state, action) {
      state.detailsOptions = { ...state.detailsOptions, ...action.payload };
    },
    setPhoto: (state, action) => {
      state.photos[action.payload.photoKey] = action.payload.uri;
    },
    setLoadingPhoto: (state, action) => {
      state.loadingPhotos[action.payload.photoKey] = action.payload.status;
    },

    setVehicleDetail: (state, action) => {
      state.vehicleDetail = action.payload;
    },
    setTurnoIdEntry: (state, action) => {
      state.turnoIdEntry = action.payload;
    },

    //Modales Tiquete Perdido y Objetos
    showLostTicketModal(state, action) {
      state.isModalOneVisibleTicket = action.payload;
    },
    setPhotoTicket: (state, action) => {
      state.photosTicket[action.payload.photoKey] = action.payload.uri;
    },
    setLoadingPhotoTicket: (state, action) => {
      state.loadingPhotosTicket[action.payload.photoKey] = action.payload.status;
    },

    showObjectsModal(state, action) {
      state.isModalTwoVisibleObjects = action.payload;
    },
    setTurnoId: (state, action) => {
      state.turnoIdObjects = action.payload;
    },

    //Redux para firma electronica
    setFirmaSignature(state, action) {
      state.signature = action.payload;
    },

    //Parte de Salida de Vehículo
    nextStep(state) {
      if (state.stepOne) {
        state.stepOne = false;
        state.stepTwo = true;
      } else if (state.stepTwo) {
        state.stepTwo = false;
        state.stepThree = true;
      } else if (state.stepThree) {
        state.stepThree = false;
        state.stepFour = true
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
    setBlockNavigation(state, action) {
      state.blockNavigation = action.payload;
    },
    setStepFour(state) {
      // Forzamos que solo stepFour sea true
      state.stepOne = false;
      state.stepTwo = false;
      state.stepThree = false;
      state.stepFour = true;
    },

    resetSteps(state) {
      return initialState;
      /*state.stepOne = true;
      state.stepTwo = false;
      state.stepThree = false;
      state.stepFour = false;*/
    },

    showElectronicInvoiceModal(state, action) {
      state.isModalThreeVisibleBill = action.payload;
    },

    //Aplicar descuentos Salida de Vehiculos
    setSelectedTabDescounts: (state, action) => {
      state.selectedTabDescounts = action.payload;
    },
    setVehicleExitData(state, action) {
      state.vehicleExitData = action.payload
    },
    setSearchResult(state, action) {
      state.searchResult = action.payload;
    },
    setBonus(state, action) {
      state.bonusList = action.payload;
    },
    onCheckedElement(state, action) {
      const { codigo } = action.payload;

      state.bonusList = state.bonusList.map(e =>
        e.codigo === codigo ? { ...e, checked: !e.checked } : e
      );
    },
    setReload(state, action) {
      state.reload[action.payload.name] = action.payload.value
    },

    setBillingSummary(state, action) {
      state.billingSummary = action.payload;
    },

    // Si prefieres agregar campos individualmente, puedes hacerlo:
    setServiceValue(state, action) {
      state.billingSummary.serviceValue = action.payload;
    },
    setDiscountBonos(state, action) {
      state.billingSummary.discountBonos = action.payload;
    },
    setDiscountValidacion(state, action) {
      const discount = action.payload || 0;
      state.billingSummary.discountValidacion = discount;

      const {
        serviceValue,
        discountBonos,
        discountAllianceBank,
        discountValidacion
      } = state.billingSummary;

      state.billingSummary.valueToPay = Math.max(
        0,
        serviceValue
        - discountBonos
        - discountValidacion
        - discountAllianceBank
      );
    },
    setDiscountAllianceBank(state, action) {
      const discount = action.payload || 0;
      state.billingSummary.discountAllianceBank = discount;

      const {
        serviceValue,
        discountBonos,
        discountValidacion,
        discountAllianceBank,
      } = state.billingSummary;

      state.billingSummary.valueToPay = Math.max(
        0,
        serviceValue
        - discountBonos
        - discountValidacion
        - discountAllianceBank
      );
    },
    setAppliedAlliance(state, action) {
      state.billingSummary.appliedAlliance = action.payload;
    },
    setValueToPay(state, action) {
      state.billingSummary.valueToPay = action.payload;
    },
    resetAuth: () => initialState,
  },
});

export const {
  setSelectedVehicle,
  setScannerVisible,
  setScannerVisibleParking,
  setScannedData,
  setSelectedTab,
  setPlate,
  setPlateRegister,
  setOwner,
  setDocument,
  setBrand,
  setColor,
  setSelectOptionDoc,
  setVehicleType,
  setAux,
  setPlateError,
  setDetailsOptions,
  setPhoto,
  setLoadingPhoto,
  showLostTicketModal,
  setPhotoTicket,
  setLoadingPhotoTicket,
  showObjectsModal,
  nextStep,
  previousStep,
  showElectronicInvoiceModal,
  setElectronicInvoiceNit,
  setVehicleList,
  setAlertMessage,
  setVehicleDetail,
  setSelectedTabDescounts,
  setVehicleExitData,
  setSearchResult,
  setBonus,
  onCheckedElement,
  setTurnoId,
  setFirmaSignature,
  setTurnoIdEntry,
  setReload,
  setBillingSummary,
  setServiceValue,
  setDiscountBonos,
  setDiscountValidacion,
  setValueToPay,
  resetSteps,
  resetAuth,
  setDiscountAllianceBank,
  setAppliedAlliance,
  setBlockNavigation,
  setStepFour
} = movementsSlice.actions;
export default movementsSlice.reducer;
