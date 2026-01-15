import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { nextStep } from "../../../../state/slices/openTurnSlice";

const useOpenTurnHook = () => {
    const vehicles = useSelector(state => state.openTurn.vehicles);
    const autos = vehicles.cars;
    const motos = vehicles.motos;
    const bicicletas = vehicles.bicycles;
    const dispatch = useDispatch();
    const [plate, setPlate] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedPlates, setSelectedPlates] = useState({
        car: [],
        moto: [],
        bike: [],
    });
    const plateRef = useRef(null);
    const plateRegex = {
        car: /^[A-Z]{3}[0-9]{3}$/,
        motorcycle: /^[A-Z]{3}[0-9]{2}$/,
        vintageMotorcycle: /^[A-Z]{3}[0-9]{2}[A-Z]$/,
        diplomatic: /^[A-Z]{2}[0-9]{4}$/,
        foreign: /^[A-Z][0-9]{2}[A-Z]{2}[0-9][A-Z]$/,
    };

    const toggleDropdown = (type) => {
        setOpenDropdown(prev => (prev === type ? null : type));
    };

    const togglePlate = (type, plate) => {
        setSelectedPlates(prev => {
            const exists = prev[type].includes(plate);
            return {
                ...prev,
                [type]: exists
                    ? prev[type].filter(p => p !== plate)
                    : [...prev[type], plate],
            };
        });
    };

    const toggleSelectAll = (type, vehicles) => {
        setSelectedPlates(prev => {
            const allPlates = vehicles.map(v => v.placa);
            const allSelected = prev[type].length === allPlates.length;

            return {
                ...prev,
                [type]: allSelected ? [] : allPlates,
            };
        });
    };

    const isAllSelected = (type, vehicles) => vehicles.length > 0 && selectedPlates[type].length === vehicles.length;

    const handlePlateChange = (text) => {
        let value = text;

        if (/\s/.test(value)) {
            showAlert("warning", "No se permite ingresar espacios.");
            value = value.replace(/\s/g, "");
        };
        if (/[^a-zA-Z0-9]/.test(value)) {
            showAlert("warning", "Solo se permiten letras y números.");
            value = value.replace(/[^a-zA-Z0-9]/g, "");
        };

        setPlate(value);
    };

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

    const handleNextStep = async () => {
        dispatch(nextStep());
    };

    return {
        autos,
        motos,
        bicicletas,
        plate,
        showErrors,
        openDropdown,
        selectedPlates,
        plateRef,
        toggleDropdown,
        togglePlate,
        toggleSelectAll,
        isAllSelected,        
        handlePlateChange,
        handleNextStep
    };
}

export default useOpenTurnHook;