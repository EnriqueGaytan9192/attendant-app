import AsyncStorage from '@react-native-async-storage/async-storage'; // Para almacenamiento en React Native
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { advanceReducer, archingReducer, authReducer, closeTurnReducer, consultationsReducer, documentsReducer, inventoryReducer, managementReducer, movementsReducer, openTurnReducer, payrollDeductionsReducer, productPurchasesReducer, profileReducer } from './slices';

// Configuración de persistencia
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [''], // Solo el estado de "auth" será persistido
};

// Combinar reducers
const rootReducer = combineReducers({
    advance: advanceReducer,
    arching: archingReducer,
    auth: authReducer,
    closeTurn: closeTurnReducer,
    consultations: consultationsReducer,
    documents: documentsReducer,
    inventory: inventoryReducer,
    management: managementReducer,
    movements: movementsReducer,
    openTurn: openTurnReducer,
    payrollDeductions: payrollDeductionsReducer,
    productPurchases: productPurchasesReducer,
    profile: profileReducer,
});

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar el store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Desactiva la verificación de serialización para evitar errores
        }),
});

// Persistor para inicializar la persistencia
export const persistor = persistStore(store);

// Tipos personalizados para hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
