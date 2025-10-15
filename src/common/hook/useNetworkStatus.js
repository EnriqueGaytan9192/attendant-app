import * as Network from "expo-network";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

/**
 * Hook avanzado para detectar el estado de red en tiempo real.
 * Utiliza AppState para disparar chequeos inmediatos y un intervalo como respaldo.
 */
const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState({
    isOffline: false,
    reason: null,
  });

  const appState = useRef(AppState.currentState);
  const intervalRef = useRef(null);

  const checkNetworkStatus = async () => {
    try {
      const state = await Network.getNetworkStateAsync();
      const { isConnected, isInternetReachable, type } = state;

      if (!isConnected) {
        setNetworkState({
          isOffline: true,
          reason: type === "airplane" ? "airplane-mode" : "no-connection",
        });
      } else if (!isInternetReachable) {
        setNetworkState({
          isOffline: true,
          reason: "no-internet",
        });
      } else {
        setNetworkState({
          isOffline: false,
          reason: null,
        });
      }
    } catch (error) {
      console.log("Error al verificar la conexión:", error);
    }
  };

  useEffect(() => {
    // 1️⃣ Escucha cambios en AppState (por ejemplo, al volver a la app)
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // Revisa conexión al volver a la app
        checkNetworkStatus();
      }
      appState.current = nextAppState;
    });

    // 2️⃣ Verifica red al iniciar
    checkNetworkStatus();

    // 3️⃣ Intervalo de respaldo cada 5 segundos
    intervalRef.current = setInterval(checkNetworkStatus, 5000);

    // 4️⃣ Limpieza
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      subscription.remove();
    };
  }, []);

  return networkState;
};

export default useNetworkStatus;
