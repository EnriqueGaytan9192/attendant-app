import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

const useCheckForUpdates = () => {
    const [modalData, setModalData] = useState({
        visible: false,
        type: null,
        title: '',
        message: '',
    });
    const showModal = (type, title, message) => {
        setModalData({
            visible: true,
            type,
            title,
            message,
        });
    };

    const hideModal = () => {
        setModalData((prev) => ({ ...prev, visible: false }));
    };

    useEffect(() => {
        const checkForUpdates = async () => {
            try {
                const showUpdatedModal = await AsyncStorage.getItem("showUpdatedModal");
                if (showUpdatedModal === "true") {
                    await AsyncStorage.removeItem('showUpdatedModal');
                    showModal(
                        'updated',
                        'Actualización completa',
                        'La aplicación se actualizó correctamente.'
                    );
                    return;
                }

                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {
                    showModal(
                        'success',
                        'Nueva versión disponible',
                        'Hay una nueva versión. ¿Deseas actualizar ahora?'
                    );
                }
            } catch (e) {
                console.log('Error al verificar actualizaciones: ', e);
                showModal(
                    'warning',
                    'No se pudo verificar actualizaciones',
                    'Verificar tu conexión a internet.'
                );
            }
        };
        checkForUpdates();
    }, []);

    const handleAcceptUpdate = async () => {
        try {
            await Updates.fetchUpdateAsync();
            await AsyncStorage.setItem("showUpdatedModal", "true");
            await Updates.reloadAsync();
        } catch (e) {
            console.log('Error al actualizar: ', e);
            showModal(
                'error',
                'Error al actualizar',
                'No se pudo completar la actualización. Inténtalo más tarde.',
            );
        }
    };

    return {
        modalData,
        hideModal,
        handleAcceptUpdate,
    };
}

export default useCheckForUpdates;