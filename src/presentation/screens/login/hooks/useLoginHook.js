import * as Application from "expo-application";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { showForgotPasswordModal, showForgotUsernameModal } from "../../../../state/slices/authSlice";

const useLoginHook = () => {

    const [deviceId, setDeviceId] = useState('Cargando...');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const dispatch = useDispatch();

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


    return{
        deviceId,
        passwordVisible,
        setPasswordVisible,
        passwordModal,
        userModal,
    };
};

export default useLoginHook;