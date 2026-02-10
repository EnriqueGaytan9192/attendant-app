import * as Network from "expo-network";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import {
    clearPersistentAlerts,
    showAlert,
} from "../../common/components/AlertManager";

const useInternetAlerts = () => {
    const appState = useRef(AppState.currentState);
    const lastStatus = useRef("ok");

    const hasRealInternet = async () => {
        try {
            const res = await fetch(
                "https://clients3.google.com/generate_204",
                {
                    method: "GET",
                    cache: "no-store",
                }
            );
            return res.status === 204;
        } catch {
            return false;
        }
    };

    const runCheck = async () => {
        try {
            const state = await Network.getNetworkStateAsync();

            // ❌ SIN CONEXIÓN
            if (!state.isConnected) {
                if (lastStatus.current !== "no-connection") {
                    showAlert(
                        "error",
                        "Sin conexión. Activa WiFi o datos móviles.",
                        3000,
                        {
                            persistent: true,
                            onClose: () => {
                                // 🔥 reaparece inmediato
                                lastStatus.current =
                                    "closed-no-connection";
                                runCheck();
                            },
                        }
                    );

                    lastStatus.current = "no-connection";
                }
                return;
            }

            // ⚠️ SIN INTERNET REAL
            const internetOk = await hasRealInternet();

            if (!internetOk) {
                if (lastStatus.current !== "no-internet") {
                    showAlert(
                        "warning",
                        "Red conectada pero sin acceso a internet.",
                        3000,
                        {
                            persistent: true,
                            onClose: () => {
                                lastStatus.current =
                                    "closed-no-internet";
                                runCheck();
                            },
                        }
                    );

                    lastStatus.current = "no-internet";
                }
                return;
            }

            // ✅ RESTABLECIDO
            if (lastStatus.current !== "ok") {
                // 🔥 limpia persistentes
                clearPersistentAlerts();

                showAlert(
                    "success",
                    "Conexión restablecida."
                );

                lastStatus.current = "ok";
            }
        } catch (err) {
            console.log("Error verificando red:", err);
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextState) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextState === "active"
                ) {
                    runCheck();
                }
                appState.current = nextState;
            }
        );

        runCheck();
        const mainInterval = setInterval(runCheck, 5000);

        return () => {
            clearInterval(mainInterval);
            subscription.remove();
        };
    }, []);
};

export default useInternetAlerts;
