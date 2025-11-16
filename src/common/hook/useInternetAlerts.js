import * as Network from "expo-network";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { showAlert } from "../../common/components/AlertManager";

const useInternetAlerts = () => {

    const appState = useRef(AppState.currentState);
    const intervalRef = useRef(null);

    const prevConnected = useRef(true);
    const prevInternetReachable = useRef(true);

    const runCheck = async () => {
        try {
            const state = await Network.getNetworkStateAsync();
            const { isConnected, isInternetReachable, type } = state;

            // Sin conexión física
            if (!isConnected) {
                showAlert("error", "Sin conexión. Activa WiFi o datos móviles.");
                prevConnected.current = false;
                return;
            }

            // Conectado pero sin Internet real
            if (isConnected && !isInternetReachable) {
                showAlert("warning", "Red conectada pero sin acceso a internet.");
                prevInternetReachable.current = false;
                return;
            }

            // Reconexión detectada
            if (!prevConnected.current || !prevInternetReachable.current) {
                showAlert("success", "Conexión restablecida.");
            }

            prevConnected.current = true;
            prevInternetReachable.current = true;

        } catch (error) {
            console.log("Error al verificar red:", error);
            showAlert("error", "Error verificando la conexión.");
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextState === "active"
            ) {
                runCheck();
            }
            appState.current = nextState;
        });

        runCheck();

        intervalRef.current = setInterval(runCheck, 5000);

        return () => {
            clearInterval(intervalRef.current);
            subscription.remove();
        };
    }, []);

};

export default useInternetAlerts;
