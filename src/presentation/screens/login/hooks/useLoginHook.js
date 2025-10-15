import * as Application from "expo-application";
import * as Network from "expo-network";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../state/hooks";
import { setDataForm, showForgotPasswordModal, showForgotUsernameModal } from "../../../../state/slices/authSlice";

const useLoginHook = () => {
    const dispatch = useDispatch();
    const form = useAppSelector((state) => state.auth.form);
    const [deviceId, setDeviceId] = useState("Cargando...");
    const [passwordVisible, setPasswordVisible] = useState(true);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    // Estados de red y alertas
    const [alertNetworkVisible, setAlertNetworkVisible] = useState(false);
    const [alertNetworkMessage, setAlertNetworkMessage] = useState("");
    const [alertNetworkType, setAlertNetworkType] = useState("error");
    const [reconnectedAlertVisible, setReconnectedAlertVisible] = useState(false);
    const [reconnectedMessage, setReconnectedMessage] = useState("Conexión restablecida.");
    const [unstableNetworkVisible, setUnstableNetworkVisible] = useState(false);
    const [unstableMessage, setUnstableMessage] = useState("Conexión inestable. Verifica tu red.");

    useEffect(() => {
        const getDeviceId = async () => {
            try {
                const id =
                    Platform.OS === "android"
                        ? await Application.getAndroidId()
                        : await Application.getIosIdForVendorAsync();

                setDeviceId(id || "ID no disponible.");
            } catch (error) {
                console.error("Error obteniendo ID del dispositivo:", error?.message || "");
                setDeviceId("Error al obtener ID.");
            }
        };

        getDeviceId();
    }, []);

    // Monitoreo de conexión usando expo-network
    useEffect(() => {
        let previousConnected = true;
        let previousInternetReachable = true;
        let timestamps = [];

        const checkConnection = async () => {
            try {
                const state = await Network.getNetworkStateAsync();
                const { isConnected, isInternetReachable, type } = state;
                const now = Date.now();

                // Registrar eventos para detectar inestabilidad
                timestamps = timestamps.filter((t) => now - t < 15000);
                timestamps.push(now);

                if (timestamps.length >= 3) {
                    setUnstableNetworkVisible(true);
                    setTimeout(() => setUnstableNetworkVisible(false), 5000);
                }

                // Sin conexión física
                if (!isConnected) {
                    previousConnected = false;
                    setAlertNetworkMessage("Sin conexión. Activa WiFi o datos móviles.");
                    setAlertNetworkType("error");
                    setAlertNetworkVisible(true);
                    return;
                }

                // Conectado pero sin Internet
                if (isConnected && !isInternetReachable) {
                    setAlertNetworkMessage("Red conectada pero sin acceso a internet.");
                    setAlertNetworkType("warning");
                    setAlertNetworkVisible(true);

                    previousConnected = true;
                    previousInternetReachable = false;
                    return;
                }


                // Reconexion detectada
                const wasDisconnected = !previousConnected || !previousInternetReachable;
                if (wasDisconnected) {
                    setReconnectedMessage("Conexión restablecida.");
                    setReconnectedAlertVisible(true);
                    setTimeout(() => setReconnectedAlertVisible(false), 4000);
                }

                setAlertNetworkVisible(false);
                setUnstableNetworkVisible(false);

                previousConnected = true;
                previousInternetReachable = true;
            } catch (error) {
                console.log("Error verificando red:", error);
            }
        };

        // Verifica cada 3 segundos
        const interval = setInterval(checkConnection, 3000);
        checkConnection();

        return () => clearInterval(interval);
    }, []);

    // === Funciones del formulario ===

    const passwordModal = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            dispatch(showForgotPasswordModal(true));
        }, 100);
    };

    const userModal = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            dispatch(showForgotUsernameModal(true));
        }, 100);
    };

    const handleDataForm = (name, value) => {
        dispatch(setDataForm({ name, value }));
    };

    const handleLogin = () => {
        const isEmailEmpty = form.email.trim() === "";
        const isPasswordEmpty = form.password.trim() === "";

        if (isEmailEmpty || isPasswordEmpty) {
            setShowErrors(true);
            setShowSnackbar(true);

            if (isEmailEmpty && emailRef.current?.shake) emailRef.current.shake(600);
            if (isPasswordEmpty && passwordRef.current?.shake) passwordRef.current.shake(600);

            return;
        }

        // Aquí continuarías con tu lógica de login
    };

    return {
        form,
        deviceId,
        passwordVisible,
        setPasswordVisible,
        passwordModal,
        userModal,
        emailRef,
        passwordRef,
        showErrors,
        showSnackbar,
        setShowSnackbar,
        handleLogin,
        handleDataForm,
        alertNetworkVisible,
        setAlertNetworkVisible,
        alertNetworkMessage,
        alertNetworkType,
        reconnectedAlertVisible,
        setReconnectedAlertVisible,
        reconnectedMessage,
        unstableNetworkVisible,
        setUnstableNetworkVisible,
        unstableMessage,
    };
};

export default useLoginHook;
