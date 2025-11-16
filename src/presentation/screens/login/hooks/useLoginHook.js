import * as Application from "expo-application";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useAppSelector } from "../../../../state/hooks";
import { login, setDataForm, showForgotPasswordModal, showForgotUsernameModal } from "../../../../state/slices/authSlice";

const useLoginHook = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const form = useAppSelector((state) => state.auth.form);
    const [deviceId, setDeviceId] = useState("Cargando...");
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const fakeLogin = () => {
        console.log("Logged fake in successfully!");
        dispatch(login());
    };

    useEffect(() => {
        const getDeviceId = async () => {
            try {
                const id =
                    Platform.OS === "android"
                        ? await Application.getAndroidId()
                        : await Application.getIosIdForVendorAsync();

                setDeviceId(id || "ID no disponible.");
            } catch {
                console.error("Error obteniendo ID del dispositivo:", error?.message || "");
                setDeviceId("Error al obtener ID.");
            }
        };

        getDeviceId();
    }, []);

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

            if (isEmailEmpty && emailRef.current?.shake) emailRef.current.shake(600);
            if (isPasswordEmpty && passwordRef.current?.shake) passwordRef.current.shake(600);
            showAlert("error", "Por favor, completa todos los campos obligatorios.");
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
        handleLogin,
        handleDataForm,
        showErrors,
        fakeLogin
    };
};

export default useLoginHook;
