import AsyncStorage from '@react-native-async-storage/async-storage'; // Para almacenamiento en React Native
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { authReducer, openTurnReducer } from './slices';

// Configuración de persistencia
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [''], // Solo el estado de "auth" será persistido
};

// Combinar reducers
const rootReducer = combineReducers({
    auth: authReducer,
    openTurn: openTurnReducer
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
