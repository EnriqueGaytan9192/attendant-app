import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { showAlertButton } from "../../../../common/components/AlertManagerButton";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { addManualPlate, deselectAll, nextStep, removeManualPlate, selectAll, setEnganchados, setObservaciones, setVehicleInPatioCount, togglePlate } from "../../../../state/slices/openTurnSlice";

const useOpenTurnHook = () => {
    const { parqueaderoId } = useAppSelector((state) => state.auth);
    const { selectedPlates, manualPlates, observaciones } = useAppSelector((state) => state.openTurn);
    const dispatch = useDispatch();
    const { getDataFetch, loading } = useLazyFetch();
    const { data: autosData } = useFetch(
        `/api/vehicles/1/parkingId/${parqueaderoId}`,
        "GET",
        {},
    );
    const { data: motosData } = useFetch(
        `/api/vehicles/2/parkingId/${parqueaderoId}`,
        "GET",
        {},
    );
    const { data: bicicletasData } = useFetch(
        `/api/bicycleEntry/parkingId/${parqueaderoId}`,
        "GET",
        {},
    );
    const [openDropdown, setOpenDropdown] = useState(null);
    const [plate, setPlate] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [plateError, setPlateError] = useState(false);
    const plateRef = useRef(null);
    const plateRegex = {
        car: /^[A-Z]{3}[0-9]{3}$/,
        motorcycle: /^[A-Z]{3}[0-9]{2}$/,
        vintageMotorcycle: /^[A-Z]{3}[0-9]{2}[A-Z]$/,
        diplomatic: /^[A-Z]{2}[0-9]{4}$/,
        foreign: /^[A-Z][0-9]{2}[A-Z]{2}[0-9][A-Z]$/,
    };

    const getColombiaDateTime = () => {
        const now = new Date();

        const dateFormatter = new Intl.DateTimeFormat("es-CO", {
            timeZone: "America/Bogota",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        const timeFormatter = new Intl.DateTimeFormat("es-CO", {
            timeZone: "America/Bogota",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        const [{ value: day }, , { value: month }, , { value: year }] =
            dateFormatter.formatToParts(now);

        const time = timeFormatter
            .format(now)
            .replace("a. m.", "a.m.")
            .replace("p. m.", "p.m.");

        return {
            entry_date: `${day}-${month}-${year}`,
            entry_hour: time,
        };
    };

    const toggleDropdown = (type) => {
        setOpenDropdown(prev => (prev === type ? null : type));
    };

    const togglePlateSelection = (plate) => {
        dispatch(togglePlate(plate));
    };

    const toggleSelectAll = (vehicles = []) => {
        const plates = vehicles.map(v => v.placa);
        const allSelected = plates.every(p => selectedPlates[p]);

        if (allSelected) {
            dispatch(deselectAll(plates));
        } else {
            dispatch(selectAll(plates));
        };
    };

    const isAllSelected = (vehicles = []) => {
        return (
            vehicles.length > 0 && vehicles.every(v => selectedPlates[v.placa])
        );
    };

    const saveEnganchados = () => {
        const platesVehicles = (autosData?.vehicles || []).map(v => ({
            plate: v.placa,
            state: selectedPlates[v.placa] ? 1 : 0,
            parqueaderoId,
        }));

        const platesMotos = (motosData?.vehicles || []).map(v => ({
            plate: v.placa,
            state: selectedPlates[v.placa] ? 1 : 0,
            parqueaderoId,
        }));

        const platesBikes = (bicicletasData?.bikes || []).map(v => ({
            plate: v.placa,
            state: selectedPlates[v.placa] ? 1 : 0,
            parqueaderoId,
        }));

        const payload = {
            platesVehicles,
            platesMotos,
            platesBikes
        };

        console.log("Guardado en estado Enganchados: ", payload);
        dispatch(setEnganchados(payload));
    };

    const handlePlateChange = (text) => {
        let value = text.toUpperCase();

        const hasSpace = /\s/.test(value);
        const hasEmojis = /[\p{Extended_Pictographic}]/u.test(text);
        const hasSpecialChars = /[^A-Z0-9]/.test(value);

        const sanitizedValue = value
            .replace(/\s/g, "")
            .replace(/[\p{Extended_Pictographic}]/gu, "")
            .replace(/[^A-Z0-9]/g, "");

        setPlate(sanitizedValue);

        if (hasSpace) {
            showAlert("warning", "No se permite ingresar espacios.");
        } else if (hasEmojis) {
            showAlert("warning", "No se permite ingresar emojis.");
        } else if (hasSpecialChars) {
            showAlert("warning", "Solo se permiten letras y números.");
        };
    };

    const validatePlate = (plate) => {
        plate = plate.replace(/\s+/g, "").toUpperCase();

        switch (plate.length) {
            case 5:
                return plateRegex.motorcycle.test(plate)
                    ? "motorcycle"
                    : null;

            case 6:
                if (plateRegex.car.test(plate)) {
                    return 'car';
                };

                if (plateRegex.vintageMotorcycle.test(plate)) {
                    return 'motorcycle';
                };

                if (plateRegex.diplomatic.test(plate)) {
                    return 'car';
                };

                return null;

            case 7:
                return plateRegex.foreign.test(plate)
                    ? 'foreign'
                    : null;

            default:
                return null;
        }
    };

    const handleAddPlates = async () => {
        setShowErrors(true);
        setPlateError(false);

        if (!plate) {
            plateRef.current?.shake?.(600);
            setPlateError(true);
            showAlert("warning", "Debes ingresar una placa.");
            return;
        };

        const plateArray = plate.split(",").map(p => p.trim().toUpperCase()).filter(p => p.length > 0);

        const validPlates = plateArray.filter(p => validatePlate(p));
        const invalidPlates = plateArray.filter(p => !validatePlate(p));

        const existingManualPlates = manualPlates.map(p => p.plate);
        const duplicateManual = plateArray.filter(p => existingManualPlates.includes(p));

        const registeredVehicles = [
            ...(autosData?.vehicles || []).map(v => v.placa),
            ...(motosData?.vehicles || []).map(v => v.placa),
            ...(bicicletasData?.bikes || []).map(v => v.placa),
        ];

        const duplicateRegistered = plateArray.filter(p => registeredVehicles.includes(p));

        if (invalidPlates.length > 0) {
            plateRef.current?.shake?.(600);
            setPlateError(true)
            showAlert("error", `Placa inválida: ${invalidPlates.join(", ")}`);
            return;
        };

        if (duplicateManual.length > 0) {
            plateRef.current?.shake?.(600);
            setPlateError(true);
            showAlert("warning", `La placa ya fue agregada en la tabla: ${duplicateManual.join(", ")}`);
            return;
        };

        if (duplicateRegistered.length > 0) {
            plateRef.current?.shake?.(600);
            setPlateError(true);
            showAlert("warning", `La placa ya está registrada en el listado: ${duplicateRegistered.join(", ")}`);
            return;
        };

        if (validPlates.length > 0) {
            const plateValue = validPlates[0];
            const plateType = validatePlate(plateValue);

            try {
                /* =============
                    Api validacion placa Attendant
                ============= */
                const { data: validEntryData, errorFetch: validEntryErrorFetch } = await getDataFetch(
                    `/api/validEntry?plate=${plateValue}`,
                    "GET",
                    {}
                );

                if (!validEntryData.estado) {
                    plateRef.current?.shake?.(600);
                    setPlateError(true);
                    showAlert("error", validEntryData.mensaje)
                    return;
                }

                /* =============
                    Api validacion placa GoPass
                ============= */
                const excludedParqueaderosGoPass = [50, 51, 53, 55, 57, 63, 65, 73, 76, 77, 78, 79, 81];

                if (!excludedParqueaderosGoPass.includes(parqueaderoId)) {
                    const gopassResponse = await fetch(
                        `https://2uj5iipka9.execute-api.us-east-1.amazonaws.com/dev/gopass/rest/main/getPlacasGopass/${plateValue}/999`
                    );
                    const gopassJson = await gopassResponse.json();
                    const mensajeGoPass = gopassJson?.mensaje || "";
                    console.log("Respuesta GoPass:", gopassJson);

                    if (mensajeGoPass.toLowerCase().includes("si es gopass")) {
                        showAlert("warning", "La placa ya está registrada como GoPass. No puede ser ingresada manualmente.");
                        return;
                    };
                };

                /* =============
                    Api validacion placa Ruedaz
                ============= */
                const excludedParqueaderosRuedaz = [65];

                if (!excludedParqueaderosRuedaz.includes(parqueaderoId)) {
                    const ruedazResponse = await fetch(
                        'https://v7l0wews5g.execute-api.us-east-1.amazonaws.com/dev/interoperability/vehicle-subscription-check',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ plate: plateValue }),
                        }
                    );

                    const ruedazJson = await ruedazResponse.json();
                    const { message } = ruedazJson.body;
                    console.log("Respuesta Ruedaz:", ruedazJson);

                    if (message === "Placa encontrada - Suscripción activa") {
                        showAlert("warning", "La placa ya cuenta con un plan activo en Ruedaz y no puede ser ingresada manualmente.");
                        return;
                    }

                    if (message === "Placa encontrada - Suscripción vencida") {
                        showAlertButton(
                            "info",
                            "La placa tiene una suscripción vencida en Ruedaz. ¿Desea continuar con el ingreso?",
                            {
                                onCancel: () => { },
                                onConfirm: () => {
                                    showAlert(
                                        "info",
                                        "Por favor informar al usuario que esta entrada se realizará bajo las tarifas del parqueadero y se aplicará el cobro correspondiente según dichas tarifas.",
                                        10000
                                    );

                                    const typeMapping = {
                                        cars: 1,
                                        diplomatic: 1,
                                        frontier: 1,
                                        motorBikes: 2,
                                        bikes: 3,
                                    };

                                    const type_vehicle = typeMapping[plateType];

                                    const { entry_date, entry_hour } = getColombiaDateTime();

                                    dispatch(addManualPlate({
                                        plate: plateValue,
                                        type_vehicle,
                                        entry_date,
                                        entry_hour,
                                    }));

                                    setPlate("");
                                    setShowErrors(false);
                                    setPlateError(false);
                                },
                            });
                        return;
                    };
                };

                const typeMapping = {
                    cars: 1,
                    diplomatic: 1,
                    frontier: 1,
                    motorBikes: 2,
                    bikes: 3,
                };

                const type_vehicle = typeMapping[plateType];

                const { entry_date, entry_hour } = getColombiaDateTime();

                dispatch(addManualPlate({
                    plate: plateValue,
                    type_vehicle,
                    entry_date,
                    entry_hour,
                }));

                setPlate("");
                setShowErrors(false);
                setPlateError(false);
            } catch (err) {
                console.error(err);
                showAlert("error", "Error al validar la placa, intentalo de nuevo.");
                return;
            };
        };
    };

    const handleRemovePlate = (plate) => {
        dispatch(removeManualPlate(plate));
        console.log("Se eliminó la placa:", plate);
        showAlert("info", `Se eliminó la placa: ${plate}`);
    };

    const handleObservacionChange = (text) => {
        const hasLeadingSpaces = /^\s+/.test(text);
        const hasEmojis = /[\p{Extended_Pictographic}]/u.test(text);
        const hasInvalidChars = /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,;:()\- ]/.test(text);
        const maxLength = 250;

        let sanitizedValue = text
            .replace(/^\s+/, "")
            .replace(/[\p{Extended_Pictographic}]/gu, "")
            .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,;:()\- ]/g, "");

        if (hasLeadingSpaces) {
            showAlert("warning", "No se permiten espacios al inicio.");
        } else if (hasEmojis) {
            showAlert("warning", "No se permiten emojis en las observaciones.");
        } else if (hasInvalidChars) {
            showAlert("warning", "Se eliminaron caracteres no permitidos.");
        } else if (sanitizedValue.length > maxLength) {
            sanitizedValue = sanitizedValue.slice(0, maxLength);
            showAlert("warning", `Las observaciones no pueden exceder ${maxLength} caracteres.`);
        }

        dispatch(setObservaciones(sanitizedValue));
    };

    const handleNextStep = () => {
        dispatch(nextStep());
    };

    const totalVehicles =
        (autosData ? autosData.total : 0)
        + (motosData ? motosData.total : 0)
        + (bicicletasData ? bicicletasData.total : 0);

    const onContinue = async () => {
        await saveEnganchados();

        dispatch(setVehicleInPatioCount(totalVehicles));

        handleNextStep(Object.keys(selectedPlates), observaciones);
    }

    return {
        selectedPlates,
        manualPlates,
        observaciones,
        loading,
        autosData,
        motosData,
        bicicletasData,
        openDropdown,
        plate,
        showErrors,
        plateError,
        plateRef,
        toggleDropdown,
        togglePlateSelection,
        toggleSelectAll,
        isAllSelected,
        handlePlateChange,
        handleAddPlates,
        handleRemovePlate,
        handleObservacionChange,
        onContinue,
    };
};

export default useOpenTurnHook;