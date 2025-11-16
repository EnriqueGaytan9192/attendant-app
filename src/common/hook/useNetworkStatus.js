import * as Network from "expo-network";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

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
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        checkNetworkStatus();
      }
      appState.current = nextAppState;
    });

    checkNetworkStatus();

    intervalRef.current = setInterval(checkNetworkStatus, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      subscription.remove();
    };
  }, []);

  return networkState;
};

export default useNetworkStatus;
