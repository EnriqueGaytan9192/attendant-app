import * as Application from "expo-application";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from '../../../../state/hooks';
import { setDataForm, showForgotPasswordModal, showForgotUsernameModal } from "../../../../state/slices/authSlice";

const useLoginHook = () => {
    const dispatch = useDispatch();
    const form = useAppSelector((state) => state.auth.form);
    const [deviceId, setDeviceId] = useState('Cargando...');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    useEffect(() => {
        const getDeviceId = async () => {
            let uniqueId = null;

            if(Platform.OS === 'android') {
                try{
                    uniqueId = await Application.getAndroidId();
                    console.log('Android ID: ', uniqueId);
                } catch (error) {
                    console.error('Error obteniendo el ID de Android: ', error?.message || "");
                }
            } else if (Platform.OS === 'ios') {
                try{
                    uniqueId = await Application.getIosIdForVendorAsync();
                    console.log('iOS ID: ', uniqueId);
                } catch (error) {
                    console.error('Error obteniendo el ID de iOS: ', error?.message || "");
                }
            }
            setDeviceId(uniqueId || 'ID no disponible.');
        };
        getDeviceId();
    }, []);

    const passwordModal = () => dispatch(showForgotPasswordModal(true));
    const userModal = () => dispatch(showForgotUsernameModal(true));

    const handleDataForm = (name, value) => {
        dispatch(setDataForm({name, value}))
    };

    const handleLogin = () => {
        const isEmailEmpty = form.email.trim() === '';
        const isPasswordEmpty = form.password.trim() === '';

        if (isEmailEmpty || isPasswordEmpty) {
            setShowErrors(true);
            setShowSnackbar(true);

            if (isEmailEmpty && emailRef.current?.shake) {
                emailRef.current.shake(600);
            }

            if (isPasswordEmpty && passwordRef.current?.shake) {
                passwordRef.current.shake(600);
            }

            return;
        }
    };

    return{
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
        handleDataForm
    };
};

export default useLoginHook;