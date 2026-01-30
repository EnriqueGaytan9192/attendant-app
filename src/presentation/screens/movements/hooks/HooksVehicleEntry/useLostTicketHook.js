import * as ImagePicker from "expo-image-picker";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingPhotoTicket, setPhotoTicket, showLostTicketModal } from "../../../../../state/slices/movementsSlice";
import { catalogs } from "./vehicleCatalogs";

// Supongamos que getDataFetch y Alert.alert están disponibles en tu contexto/hook
import { Alert } from "react-native";
import { useFetch, useLazyFetch } from "../../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../../state/hooks";

const useLostTicketHook = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const dispatch = useDispatch();
    const { getDataFetch } = useLazyFetch();
    const { photosTicket, loadingPhotosTicket } = useSelector((state) => state.movements);
    const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);
    // Estados del formulario
    const [plate, setPlate] = useState("");
    const [color, setColor] = useState("");
    const [propertyCard, setPropertyCard] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [dataBrand, setDataBrand] = useState([]);
    const [dataModel, setDataModel] = useState([]);
    const [selectedOptionModel, setSelectedOptionModel] = useState(null);
    const [selectedOptionBrand, setSelectedOptionBrand] = useState(null);

    const [selectedOptionDocument, setSelectedOptionDocument] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [showError, setShowError] = useState(false);
    const [turnId, setTurnId] = useState(null);
    const { numeroIdentificacion, parqueaderoId, terminalId } = useAppSelector((state) => state.auth);

    const turnRequestOptions = useMemo(() => ({
        rq: {
            id: numeroIdentificacion || '',
            parqueaderoId: parqueaderoId
        },
        onComplete: async (turnResponse) => {
            await conCompleteCallBack(turnResponse);
        },
        onError: (errorFetch) => {
            console.log("❌ Error al obtener el turno:", errorFetch);
        }
    }), [numeroIdentificacion, parqueaderoId]);

    useFetch(`/api/turn`, 'POST', turnRequestOptions);

    const conCompleteCallBack = async (turnResponse) => {
        // Suponiendo que la respuesta tiene la propiedad "turn" con el id
        const { turn } = turnResponse;
        // Almacenamos el id del turno
        if (turn && turn.turnoId) {
            setTurnId(turn.turnoId);
        }
    };

    // Datos para dropdowns (dummy)
    /*const dataModel = [
        { label: "Montaña", value: "montaña" },
        { label: "Ruta", value: "ruta" },
        { label: "Urbana", value: "urbana" },
        { label: "Eléctrica", value: "eléctrica" },
    ];
    const dataBrand = [
        { label: "Treck", value: "treck" },
        { label: "Cliff", value: "cliff" },
        { label: "GW Bicycles", value: "gw" },
        { label: "Specialized", value: "specialized" },
        { label: "Giant", value: "giant" },
        { label: "Scott", value: "scott" },
        { label: "Orbea", value: "orbea" },
        { label: "Liv", value: "liv" },
        { label: "Bianchi", value: "bianchi" },
        { label: "Venzo", value: "venzo" },
        { label: "Optimus", value: "optimus" },
        { label: "Roca", value: "roca" },
        { label: "Cube", value: "cube" },
        { label: "Marin", value: "marin" },
    ];*/
    const dataDocument = [
        { label: "Cédula de Ciudadanía", value: "ID" },
        { label: "Pasaporte", value: "PP" }
    ];

    useEffect(() => {
        if (selectedVehicle?.typeVehicle) {
            const type = selectedVehicle.typeVehicle;
            const brandList = Object.keys(catalogs[type] || {}).map(brand => ({
                label: brand,
                value: brand
            }));
            setDataBrand(brandList);
            setDataModel([]); // limpiar modelos al cambiar tipo de vehículo
            setSelectedOptionBrand(null);
            setSelectedOptionModel(null);
        }
    }, [selectedVehicle?.typeVehicle]);

    useEffect(() => {
        if (selectedOptionBrand && selectedVehicle?.typeVehicle) {
            const models = catalogs[selectedVehicle.typeVehicle]?.[selectedOptionBrand] || [];
            setDataModel(models.map(model => ({ label: model, value: model })));
            setSelectedOptionModel(null); // reiniciar modelo seleccionado
        }
    }, [selectedOptionBrand, selectedVehicle?.typeVehicle]);

    // Funciones de navegación entre pasos
    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
    const resetSteps = () => setCurrentStep(1);
    const onCloseModal = () => {
        dispatch(showLostTicketModal(false));
        resetSteps();
    };

    // Manejo de permisos y captura de fotos
    const requestCameraPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        return status === "granted";
    };

    const takePhoto = async (photoKey) => {
        dispatch(setLoadingPhotoTicket({ photoKey, status: true }));
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            dispatch(setLoadingPhotoTicket({ photoKey, status: false }));
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });
        if (!result.canceled) {
            dispatch(setPhotoTicket({ photoKey, uri: result.assets[0].uri }));
        }
        dispatch(setLoadingPhotoTicket({ photoKey, status: false }));
    };

    // Función para subir imágenes del ticket perdido
    const saveLostTicketImages = async () => {
        const requiredKeys = ["idPhoto", "propertyCardPhoto", "driverPhoto"];
        const uploadedUrls = {};
        for (const key of requiredKeys) {
            const imageUri = photosTicket[key];
            if (!imageUri) {
                Alert.alert('Alerta', `La foto para ${key} es obligatoria.`);
                return null;
            }
            const fileType = key === "idPhoto" ? 1 : key === "propertyCardPhoto" ? 2 : 3;
            try {
                const formData = new FormData();
                const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
                const fileName = `${key}_${timestamp}.jpg`;
                const jsonBody = {
                    name_file: fileName,
                    file_type: fileType, // Tipo asignado para ticket perdido
                    id_file_module: 3,
                    destination: 10,
                    fecha_vencimiento: '24/05/2024'
                };
                formData.append('json', JSON.stringify(jsonBody));
                formData.append('file', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: fileName
                });
                console.log(`Subiendo imagen ${key} con nombre ${fileName}`, formData);
                const { data, errorFetch } = await getDataFetch('/api/s3Attendant', 'FILES', { rq: formData });
                console.log(`Respuesta para imagen ${key}:`, data, errorFetch);
                if (data && data.fileUrl) {
                    uploadedUrls[key] = data.fileUrl;
                } else {
                    throw new Error(`Error al subir la imagen ${key}: ${errorFetch?.message || 'Desconocido'}`);
                }
            } catch (error) {
                console.error('Error en la subida de la imagen:', error);
                Alert.alert('ERROR', `Error al subir la imagen ${key}: ${error.message}`);
                return null;
            }
        }
        console.log('URLs de las imágenes subidas:', uploadedUrls);
        return uploadedUrls;
    };

    // Función para consumir el API de ticket perdido
    const submitLostTicket = async () => {
        console.log("submitLostTicket iniciado"); // Log de inicio
        // Primero se suben las imágenes
        const uploadedUrls = await saveLostTicketImages();
        console.log("Resultado de saveLostTicketImages:", uploadedUrls);
        if (!uploadedUrls) return; // Si hubo error en la carga, aborta

        // Armar el body de la solicitud
        const body = {
            turnoId: turnId,
            vehicleEntryId: selectedVehicle?.vehicleId || "",
            typeVehicle: String(selectedVehicle?.typeVehicle) || "",
            brand: selectedOptionBrand || "",
            model: selectedOptionModel || "",
            color: color || "",
            plate: plate || selectedVehicle?.plate || "",
            propertyCardNumber: propertyCard || "",
            clientInfo: {
                name: fullName || "",
                lastName: "", // Puedes agregar un estado para apellido si lo requieres
                documentType: selectedOptionDocument || "",
                documentNumber: documentNumber || "",
                email: email || "",
                cellphone: phone || "",
                address: address || ""
            },
            photos: {
                iDCardPhoto: uploadedUrls["idPhoto"] || "",
                propertyCardPhoto: uploadedUrls["propertyCardPhoto"] || "",
                driverPhoto: uploadedUrls["driverPhoto"] || ""
            }
        };
        console.log("Enviando body del ticket perdido:", body);
        try {
            const { data, errorFetch } = await getDataFetch("/api/ticket/lost", "POST", { rq: body });
            if (errorFetch) {
                console.error("Error al registrar ticket perdido:", errorFetch);
                Alert.alert('ERROR', "Error al registrar ticket perdido: " + (errorFetch.message || errorFetch));
            } else {
                Alert.alert('OK', "Ticket perdido registrado exitosamente.");
                // Limpiar estados del formulario
                setPlate("");
                setColor("");
                setPropertyCard("");
                setDocumentNumber("");
                setFullName("");
                setEmail("");
                setPhone("");
                setAddress("");
                setSelectedOptionModel(null);
                setSelectedOptionBrand(null);
                setSelectedOptionDocument(null);
                dispatch(setPhotoTicket({ photoKey: "idPhoto", uri: "" }));
                dispatch(setPhotoTicket({ photoKey: "propertyCardPhoto", uri: "" }));
                dispatch(setPhotoTicket({ photoKey: "driverPhoto", uri: "" }));
            }
        } catch (error) {
            console.error("Error en submitLostTicket:", error);
            Alert.alert('ERROR', "Se produjo un error inesperado al registrar el ticket perdido.");
        }
    };

    // Funciones del modal (continuar, guardar, etc.)
    const handleContinue = () => {
        if (currentStep === 2 && !isAuthorized) {
            setShowError(true);
        } else {
            setShowError(false);
            nextStep();
        }
    };

    const handleSave = async () => {
        console.log("Guardando ticket perdido...");
        await submitLostTicket();
        dispatch(showLostTicketModal(false));
        resetSteps();
    };

    return {
        // Estados del formulario y setters
        plate, setPlate,
        color, setColor,
        propertyCard, setPropertyCard,
        documentNumber, setDocumentNumber,
        fullName, setFullName,
        email, setEmail,
        phone, setPhone,
        address, setAddress,
        selectedOptionModel, setSelectedOptionModel,
        selectedOptionBrand, setSelectedOptionBrand,
        selectedOptionDocument, setSelectedOptionDocument,
        isAuthorized, setIsAuthorized,
        showError, setShowError,
        // Datos para dropdowns
        dataModel, dataBrand, dataDocument,
        // Funciones de navegación
        currentStep, nextStep, prevStep, resetSteps,
        // Funciones del modal y fotos
        onCloseModal, takePhoto, handleContinue, handleSave,
        // Redux (fotos)
        photosTicket, loadingPhotosTicket,
        // Funciones de envío
        submitLostTicket,
    };
};

export default useLostTicketHook;
