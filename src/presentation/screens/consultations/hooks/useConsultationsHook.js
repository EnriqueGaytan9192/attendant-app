import { useRef, useState } from "react";
import { showAlert } from "../../../../common/components/AlertManager";

const useConsultationsHook = () => {

    const [plate, setPlate] = useState("");
    const [result, setResult] = useState(null);
    const [showErrors, setShowErrors] = useState(false);
    const plateRef = useRef(null);

    const dataInfo = [
        { plate: "AAA111", vehicleType: "Carro", entryDate: "10/11/2025 11:52 am", entryProduct: "Horas" },
        { plate: "AAA22", vehicleType: "Motocicleta", entryDate: "10/11/2025 12:05 pm", entryProduct: "Mensualidad Natural" },
        { plate: "AAA33B", vehicleType: "Motocicleta Antigua", entryDate: "09/11/2025 09:30 am", entryProduct: "Mensualidad Juridica" },
        { plate: "AA4444", vehicleType: "Carro Diplomatico", entryDate: "08/11/2025 03:15 pm", entryProduct: "VIP" },
        { plate: "A55AA5A", vehicleType: "Carro Foraneo", entryDate: "07/11/2025 08:45 am", entryProduct: "GoPass" },
    ];

    const handleSearch = () => {
        const isPlateEmpty = plate.trim() === "";

        if (isPlateEmpty) {
            setShowErrors(true);

            if (plateRef.current?.shake) {
                plateRef.current.shake(600);
            }

            showAlert("error", "Debes ingresar una placa para realizar la consulta.");
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
        handleSearch,
    }
}

export default useConsultationsHook;