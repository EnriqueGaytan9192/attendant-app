import * as Network from "expo-network";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { showAlert } from "../../common/components/AlertManager";

const useInternetAlerts = () => {

    const appState = useRef(AppState.currentState);

    const noConnectionInterval = useRef(null);
    const noInternetInterval = useRef(null);

    const lastStatus = useRef("ok");

    const hasRealInternet = async () => {
        try {
            const res = await fetch("https://clients3.google.com/generate_204", {
                method: "GET",
                cache: "no-store",
            });
            return res.status === 204;
        } catch {
            return false;
        }
    };

    const clearAllIntervals = () => {
        if (noConnectionInterval.current) {
            clearInterval(noConnectionInterval.current);
            noConnectionInterval.current = null;
        }
        if (noInternetInterval.current) {
            clearInterval(noInternetInterval.current);
            noInternetInterval.current = null;
        }
    };

    const runCheck = async () => {
        try {
            const state = await Network.getNetworkStateAsync();

            if (!state.isConnected) {
                if (lastStatus.current !== "no-connection") {
                    clearAllIntervals();

                    showAlert(
                        "error",
                        "Sin conexión. Activa WiFi o datos móviles.",
                        3000,
                        {persistent: true}
                    );

                    {/*noConnectionInterval.current = setInterval(() => {
                        showAlert("error", "Sin conexión. Activa WiFi o datos móviles.");
                    }, 30000);*/}

                    lastStatus.current = "no-connection";
                }
                return;
            }

            const internetOk = await hasRealInternet();

            if (!internetOk) {
                if (lastStatus.current !== "no-internet") {
                    clearAllIntervals();

                    showAlert(
                        "warning", 
                        "Red conectada pero sin acceso a internet.",
                        3000,
                        {persistent: true}
                    );

                    {/*noInternetInterval.current = setInterval(() => {
                        showAlert("warning", "Red conectada pero sin acceso a internet.");
                    }, 30000);*/}

                    lastStatus.current = "no-internet";
                }
                return;
            }

            if (lastStatus.current !== "ok") {
                clearAllIntervals();
                showAlert("success", "Conexión restablecida.");
                lastStatus.current = "ok";
            }

        } catch (err) {
            console.log("Error verificando red:", err);
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
        const mainInterval = setInterval(runCheck, 5000);

        return () => {
            clearInterval(mainInterval);
            clearAllIntervals();
            subscription.remove();
        };
    }, []);
};

export default useInternetAlerts;
