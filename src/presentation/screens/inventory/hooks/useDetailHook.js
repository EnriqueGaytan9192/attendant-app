import * as ImagePicker from 'expo-image-picker';
import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import { useSelector } from "react-redux";
import { createSelector } from 'reselect';
import { useLazyFetch } from "../../../../common/hook/useFetch";
import { shallowEqual, useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { changeFlagBy, cleanFormBici, setDataForm } from "../../../../state/slices/inventorySlice";
import {
    setTurnoIdEntry,
} from "../../../../state/slices/movementsSlice";

const useDetailHook = () => {
    const { numeroIdentificacion, parqueaderoId, terminal } = useSelector((state) => state.auth);
    const {
        turnoIdEntry
    } = useSelector(
        (state) => state.movements
    );
    const vehicleTypes = ['Carro', 'Moto']; // Tipos de vehículo
    const optionsList = [
        'Bueno',
        'Regular',
        'Dañado',
        'Roto',
        'No está',
        'No visible',
        'No aplica'
    ];
    const selectImagesBike = createSelector(
        (state) => state.inventory.form.images,
        (images) => images || [null]
    );

    // Dentro de tu hook, lo usas de la siguiente forma:
    const imagesBike = useSelector(selectImagesBike, shallowEqual);
    //const facility_id = useAppSelector(item => item.auth.infoAuth.facility_id);

    const dispatch = useAppDispatch();
    const { getDataFetch } = useLazyFetch();
    const form = useAppSelector((state) => state.inventory.form, shallowEqual);

    const handleSetValueForm = (name, value) => {
        dispatch(setDataForm({ name, value }));
    };

    useEffect(() => {
        const fetchTurnoId = async () => {
            try {
                const { data, errorFetch } = await getDataFetch("/api/turn", "POST", {
                    rq: { id: numeroIdentificacion, parqueaderoId: parqueaderoId },
                });

                if (data?.turn?.turnoId) {
                    dispatch(setTurnoIdEntry(data.turn.turnoId));
                    console.log("Turno Id obtenido en Entrada:", data.turn.turnoId);
                } else {
                    console.error("No se pudo obtener el turnoId de objects useInventoryDetailHook");
                }
            } catch (error) {
                console.error("Error al obtener el turnoIdEntry:", error);
            }
        };

        if (!turnoIdEntry) {
            fetchTurnoId();
        }
    }, [turnoIdEntry, numeroIdentificacion, dispatch, getDataFetch]);

    const transformBikeData = (inputData) => {
        // Validación para asegurar que el input tenga los datos mínimos requeridos
        if (!inputData) {
            throw new Error("El objeto de entrada está vacío o es inválido.");
        }

        const toLowerCase = (value) =>
            typeof value === 'string' ? value.toLowerCase() : value;

        const missingFields = [];

        const transformedData = {
            placa: "LLL120",
            tipoVehiculo: 3,
            estadoVehiculo: "1",
            detalles: {
                modelo: "bueno",
                marca: inputData.brand || (missingFields.push("clientData.brand") && "Sin marca"),
                marco: toLowerCase(inputData.frame) || (missingFields.push("bikeData.frame") && "Marco no especificado"),
                sillin: toLowerCase(inputData.seat) || (missingFields.push("bikeData.saddle") && "Sillín no especificado"),
                pintura: toLowerCase(inputData.paint) || (missingFields.push("bikeData.paint") && "Pintura no especificada"),
                ruedas: toLowerCase(inputData.wheels) || (missingFields.push("bikeData.wheels") && "Ruedas no especificadas"),
                frenos: toLowerCase(inputData.brakes) || (missingFields.push("bikeData.brakes") && "Frenos no especificados"),
            },
            foto: "foto1.jpg",
            observaciones: "Observaciones adicionales",
            fechaHoraInventario: "",
            turnoId: turnoIdEntry,
        };

        return {
            transformedData,
            missingFields: missingFields.length > 0 ? missingFields : null,
        };
    };

    const handleSave = async () => {
        if (form.isEdit) {
            const rq = {
                id: form.id,
                bikeData: {
                    brand: form.brand,
                    color: form.color,
                    frame: form.frame.toLowerCase(),
                    paint: form.paint.toLowerCase(),
                    saddle: form.seat.toLowerCase(),
                    wheels: form.wheels.toLowerCase(),
                    brakes: form.brakes.toLowerCase(),
                }
            };
            const { data, errorFetch } = await getDataFetch('/api/inventoryBicis', 'PUT', { rq });

            if (data) {
                handleCancelBici();
            }

            if (errorFetch) {
                alert(errorFetch.msg || errorFetch.message);
            }

        } else {
            console.log('form', form);
            const rq = transformBikeData(form);
            if (rq.missingFields && rq.missingFields.length > 0) {
                Alert.alert("Aviso",'Favor de completar todos los campos', [{ text: "OK" }]);
                return;
            }
            const url = await saveBikePhoto();
            if (!url) {
                return;
            }
            rq.transformedData.bikeData.bikePhoto = url
            const { data, errorFetch } = await getDataFetch('/api/saveBikeInventory', 'POST', { rq: rq.transformedData });

            if (data) {
                handleCancelBici();
            }

            if (errorFetch) {
                alert(errorFetch.msg || errorFetch.message);
            }
        }
    };

    const renameImage = (image, newName) => {
        return new File([image], newName, { type: image.type });
    };

    const saveBikePhoto = async () => {
        const images = form.images;
        const plate = form.plate;
        let url = null;
        const errors = []; // Array para almacenar las imágenes con error

        const type = 3;

        if (plate.trim() === '') {
            showAlert('Escriba la placa');
            return url;
        }

        if (!images) {
            showAlert('Favor de cargar alguna imagen');
            return url;
        }



        const formData = new FormData();
        const fileName = `${type}_${1}_.jpg`;//const fileName = `${type}_${1}_${facility_id}.jpg`;
        const renamedImage = renameImage(images, fileName);
        formData.append('file', renamedImage);
        try {
            const { data, errorFetch } = await getDataFetch('/api/s3Attendant', 'FILES', {
                rq: formData,
            });

            if (data && data.fileUrl) {
                url = data.fileUrl;
            } else if (errorFetch) {
                console.error(`Error al subir la imagen ${1}:`, errorFetch);
                errors.push({ index: 1, error: errorFetch });
            }
        } catch (error) {
            console.error(`Error al subir la imagen ${1}:`, error);
            errors.push({ index: 1, error });
        }


        if (errors.length > 0) {
            showAlert(`Hubo errores al subir ${errors.length} imagen(es). Verifique e intente nuevamente.`);
            console.log('Errores de imágenes:', errors);
        }

        console.log('URLs de las imágenes subidas:', url);
        return url;
    };

    // Función genérica para mostrar alertas según la plataforma
    const showAlert = (message) => {
        if (Platform.OS === 'web') {
            window.alert(message);
        } else {
            Alert.alert("Error", message, [{ text: "OK" }]);
        }
    };

    const handleCancelBici = () => {
        dispatch(cleanFormBici());
        dispatch(changeFlagBy({ name: 'showTable', value: true }));
        dispatch(changeFlagBy({ name: 'showAddBici', value: false }));
    };

    const handleImagePick = async (index) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const updatedImages = [...images];
            updatedImages[index] = result.assets[0].uri; // Actualiza la imagen en la posición correspondiente

            // Persistir en Redux
            dispatch(setDataForm({ name: 'images', value: updatedImages }));
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...form.images];
        updatedImages[index] = null; // Elimina la imagen en el índice especificado
        dispatch(setDataForm({ name: 'images', value: updatedImages }));
    };


    const handleImagePickBike = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0].uri;
            handleSetValueForm('images', selectedImage);
        }
    };

    const handleRemoveImageBike = () => {
        handleSetValueForm('images', null);
    };

    return {
        handleSave,
        handleCancelBici,
        handleSetValueForm,
        vehicleTypes,
        form,
        optionsList,
        imagesBike,
        turnoIdEntry,
        handleImagePick,
        handleRemoveImage,
        handleImagePickBike,
        handleRemoveImageBike,
        getDataFetch
    };
};

export default useDetailHook;
