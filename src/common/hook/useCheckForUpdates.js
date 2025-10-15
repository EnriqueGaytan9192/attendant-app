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
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(30);

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
            setIsDownloading(true);
            setDownloadProgress(0);
            setTimeRemaining(30);

            const progressInterval = setInterval(() => {
                setDownloadProgress((prev) => {
                    if (prev >= 0.95) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 0.01;
                });
            }, 300);

            const timerInterval = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerInterval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            await Updates.fetchUpdateAsync();

            clearInterval(progressInterval);
            clearInterval(timerInterval);
            setDownloadProgress(1);
            setTimeRemaining(0);

            await AsyncStorage.setItem("showUpdatedModal", "true");
            await Updates.reloadAsync();
        } catch (e) {
            console.log('Error al actualizar: ', e);
            showModal(
                'error',
                'Error al actualizar',
                'No se pudo completar la actualización. Inténtalo más tarde.',
            );
        } finally {
            setIsDownloading(false);
        }
    };

    return {
        modalData,
        hideModal,
        handleAcceptUpdate,
        isDownloading,
        downloadProgress,
        timeRemaining
    };
}

export default useCheckForUpdates;