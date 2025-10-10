import * as Application from "expo-application";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const useLoginHook = () => {

    const [deviceId, setDeviceId] = useState('Cargando...');

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

    return{
        deviceId,
    };
};

export default useLoginHook;