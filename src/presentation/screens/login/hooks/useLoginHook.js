import * as Application from "expo-application";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { loadMenus, login, setDataForm, setToken, showForgotPasswordModal, showForgotUsernameModal } from "../../../../state/slices/authSlice";

const useLoginHook = () => {
    const dispatch = useDispatch();
    const form = useAppSelector((state) => state.auth.form);
    const { getDataFetch, loading } = useLazyFetch();
    const router = useRouter();
    const [deviceId, setDeviceId] = useState("Cargando...");
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

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
            };
        };

        getDeviceId();
    }, [console.log("DeviceId: ", deviceId)]);

    const handleDataForm = (name, value) => {
        dispatch(setDataForm({ name, value }));
    };

    const handledUsernameChange = (text) => {
        const hasSpaces = /\s/.test(text);
        const noSpaces = text.replace(/\s/g, '');
        handleDataForm("email", noSpaces);

        if (hasSpaces) {
            showAlert("warning", "El nombre de usuario no puede contener espacios.");
        }
    };

    const handlePasswordChange = (text) => {
        const hasSpaces = /\s/.test(text);
        const noSpaces = text.replace(/\s/g, '');
        handleDataForm('password', noSpaces);

        if (hasSpaces) {
            showAlert("warning", "La contraseña no puede contener espacios.");
        }
    };

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

    const handleLogin = async () => {
        const email = form.email.trim();
        const password = form.password.trim();

        const isEmailEmpty = email === "";
        const isPasswordEmpty = password === "";

        if (isEmailEmpty || isPasswordEmpty) {
            setShowErrors(true);

            if (isEmailEmpty && emailRef.current?.shake) {
                emailRef.current.shake(600);
            };
            if (isPasswordEmpty && passwordRef.current?.shake) {
                passwordRef.current.shake(600);
            };

            showAlert("error", "Por favor, completa todos los campos obligatorios.");
            return;
        };

        /* =============
            Api login
        ============= */
        const { data: loginData, errorFetch } = await getDataFetch(
            "/api/login",
            "POST",
            {
                rq: {
                    nombreUsuario: email,
                    password,
                }
            },
        );

        if (errorFetch) {
            showAlert("error", errorFetch?.message || "Credenciales inválidas.");
            return;
        };
        if (!loginData?.token) {
            showAlert("error", "No fue posible iniciar sesión.");
            return;
        };

        console.log("Respuesta de api Login: ", loginData);
        const toke = loginData.token.replace("Bearer ", "");
        console.log("Token limpiado: ", toke);

        /* =============
            Api terminal
        ============= */
        const { data: terminalData } = await getDataFetch(
            `/api/ms-terminal-attendant?referencia=${deviceId}&numeroIdentificacion=${loginData.numeroIdentificacion}`,
            "GET",
        );

        if (terminalData?.error) {
            showAlert("error", terminalData.msg || "No se encontró la terminal.");
            return;
        };
        if (!terminalData?.parqueaderoId) {
            showAlert("error", "Parqueadero y terminal no asignados, comunicate con Administración.");
            return;
        };

        console.log("Respuesta de api Terminal: ", terminalData);

        /* =============
            Api user
        ============= */
        const { data: userInfoData, errorFetch: userInfoErrorFetch } = await getDataFetch(
            `/api/user/${loginData.numeroIdentificacion}`,
            "GET",
        );

        if (userInfoErrorFetch) {
            showAlert("error", userInfoErrorFetch?.mensaje || "Usuario no encontrado.")
            return;
        };

        console.log("Respuesta de api User: ", userInfoData);

        /* =============
            Api role (Menus por role)
        ============= */
        const { data: roleData } = await getDataFetch(
            "/api/roleUser",
            "POST",
            {
                rq: {
                    role_id: userInfoData?.datosUsuario?.rolId
                }
            }
        )

        if (!roleData?.permission?.subitems?.length) {
            showAlert("error", "No se logró cargar el menú.");
            return;
        };

        console.log("Menus por role: ", JSON.stringify(roleData?.permission?.subitems, null, 2));
        const menus = roleData?.permission?.subitems.slice();
        
        dispatch(loadMenus(menus));
        dispatch(setToken(toke));
        
        dispatch(login({
            numeroIdentificacion: loginData?.numeroIdentificacion,
            parqueaderoId: terminalData?.parqueaderoId,
            terminal: terminalData?.terminal,
            terminalId: terminalData?.terminal_id,
            exitTurnOpen: loginData?.existTurnOpen,
            nombreParking: terminalData?.name,
        }));

        const loginPayload = {
            numeroIdentificacion: loginData?.numeroIdentificacion,
            parqueaderoId: terminalData?.parqueaderoId,
            terminal: terminalData?.terminal,
            terminalId: terminalData?.terminal_id,
            exitTurnOpen: loginData?.existTurnOpen,
            nombreParking: terminalData?.name,
        };

        console.log("Payload enviado a login:", loginPayload);

        /* =============
            Api migration
        ============ */
        const { data: migrationData, errorFetch: migrationErrorFetch } =
            await getDataFetch(
                "/api/migration/turn",
                "POST",
                {
                    rq: {
                        parqueaderoId: terminalData?.parqueaderoId
                    },
                    tokenTmp: toke,
                },
            );

        if (migrationErrorFetch) {
            showAlert("error", "Error validando migración.");
            return;
        }

        if (migrationData?.error) {
            showAlert("error", migrationData?.msg || "No se pudo validar la migración.");
            return;
        }

        console.log("Respuesta api Migration:", migrationData);
    };

    return {
        form,
        loading,
        deviceId,
        passwordVisible,
        showErrors,
        emailRef,
        passwordRef,
        setPasswordVisible,
        handledUsernameChange,
        handlePasswordChange,
        passwordModal,
        userModal,
        handleLogin,
    };
};

export default useLoginHook;
