import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { setVehicleType } from "../../../../state/slices/consultationsSlice";

const useConsultationsHook = () => {

    const dispatch = useDispatch();
    const [plate, setPlate] = useState("");
    const [result, setResult] = useState(null);
    const [showErrors, setShowErrors] = useState(false);
    const plateRef = useRef(null);

    const plateRegex = {
        car: /^[A-Z]{3}[0-9]{3}$/, // 6
        motorcycle: /^[A-Z]{3}[0-9]{2}$/, // 5
        vintageMotorcycle: /^[A-Z]{3}[0-9]{2}[A-Z]$/, // 6
        diplomatic: /^[A-Z]{2}[0-9]{4}$/, // 6
        foreign: /^[A-Z][0-9]{2}[A-Z]{2}[0-9][A-Z]$/, // 7
    };
    const dataInfo = [
        {
            plate: "AAA111",
            vehicleType: "Carro",
            entryDate: "10/11/2025 11:52 am",
            entryProduct: "Horas",
            products: {
                gopass: {
                    active: true,
                    plan: "GoPass Plus",
                    startDate: "01/12/2025",
                    endDate: "31/12/2025",
                },
                ruedaz: {
                    active: false,
                },
                monthly: {
                    active: true,
                    amount: "$150.000",
                    lastPayment: "01/12/2025",
                    status: "Al día",
                },
                others: [
                    {
                        name: "Reserva Carro",
                        active: true,
                        duration: "2 horas",
                    }
                ]
            }
        },
        { plate: "AAA22", vehicleType: "Motocicleta", entryDate: "10/11/2025 12:05 pm", entryProduct: "Mensualidad Natural" },
        { plate: "AAA33B", vehicleType: "Motocicleta Antigua", entryDate: "09/11/2025 09:30 am", entryProduct: "Mensualidad Juridica" },
        { plate: "AA4444", vehicleType: "Carro Diplomatico", entryDate: "08/11/2025 03:15 pm", entryProduct: "VIP" },
        { plate: "A55AA5A", vehicleType: "Carro Foraneo", entryDate: "07/11/2025 08:45 am", entryProduct: "GoPass" },
    ];

    const validatePlate = (plate) => {
        if (plate.length > 0) {
            if (plate.length === 5) {
                if (plateRegex.motorcycle.test(plate)) {
                    dispatch(setVehicleType("motorcycle"));
                    //dispatch(setPlateError(""));
                    setShowErrors(false);
                    return true;
                } else {
                    showAlert("error", "Placa inválida para motocicletas.")
                    setShowErrors(true);
                    return false;
                };
            } else if (plate.length === 6) {
                if (plateRegex.car.test(plate)) {
                    dispatch(setVehicleType("car"));
                    //dispatch(setPlateError(""));
                    setShowErrors(false);
                    return true;
                } else if (plateRegex.vintageMotorcycle.test(plate)) {
                    dispatch(setVehicleType("vintageMotorcycle"));
                    //dispatch(setPlateError(""));
                    setShowErrors(false);
                    return true;
                } else {
                    showAlert("error", "Placa inválida para carros o motocicletas.")
                    setShowErrors(true);
                    return false;
                };
            } else if (plate.length === 7) {
                if (plateRegex.foreign.test(plate)) {
                    dispatch(setVehicleType("foreign"));
                    //dispatch(setPlateError(""));
                    setShowErrors(false);
                    return true;
                } else {
                    showAlert("error", "Placa inválida. Debe tener el formato: 1 letra, 2 números, 2 letras, 1 números, 1 letra.");
                    setShowErrors(true);
                    return false;
                };
            } else {
                showAlert("error", "Placa no cumple con el formato requerido");
                setShowErrors(true);
                return false;
            };
        };
    };

    const handlePlateChange = (text) => {
        let value = text;

        if (/\s/.test(value)) {
            showAlert("warning", "No se permite ingresar espacios.");
            value = value.replace(/\s/g, "");
        };
        if (/[^a-zA-Z0-9]/.test(value)) {
            showAlert("warning", "Solo se permiten letras y números.");
            value = value.replace(/[^a-zA-Z0-9]/g, "");
        }

        setPlate(value);
        //validatePlate(value);
        if ([5, 6, 7].includes(value.length)) {
            validatePlate(value);
        } else {
            setShowErrors(false);
        }
    };

    const handleSearch = () => {
        const isPlateEmpty = plate.trim() === "";

        if (isPlateEmpty) {
            setShowErrors(true);
            showAlert("warning", "Debes ingresar una placa para realizar la consulta.");

            if (plateRef.current?.shake) {
                plateRef.current.shake(600);
            }
            return;
        }

        const found = dataInfo.find(
            item => item.plate.toUpperCase() === plate.toUpperCase().trim()
        );

        if (!found) {
            setShowErrors(true);

            if (plateRef.current?.shake) {
                plateRef.current.shake(600);
            }

            showAlert("error", "No se encontró información para la placa ingresada.");
            setResult(null);
            return;
        }

        setShowErrors(false);
        setResult(found);
    };

    return {
        plate,
        result,
        showErrors,
        plateRef,
        dataInfo,
        setPlate,
        handlePlateChange,
        handleSearch,
    }
}

export default useConsultationsHook;