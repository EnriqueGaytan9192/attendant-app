import { useState } from "react";

const useAdvancesSelector = () => {
    const [docType, setDocType] = useState("");
    const turnos = [
        { label: "Turno 1 - 06:00 am - 08:00 am", value: "1" },
        { label: "Turno 2 - 08:00 am - 10:00 am", value: "2" },
        { label: "Turno 3 - 10:00 am - 12:00 pm", value: "3" },
        { label: "Turno 4 - 12:00 pm - 02:00 pm", value: "4" },
        { label: "Turno 5 - 02:00 pm - 04:00 pm", value: "5" },
        { label: "Turno 6 - 04:00 pm - 06:00 pm", value: "6" },
    ];

    return {
        docType,
        setDocType,
        turnos,
    }
}

export default useAdvancesSelector;