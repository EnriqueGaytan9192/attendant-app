import { useState } from "react";

const useAdvancesSelectorHook = () => {
    const [docType, setDocType] = useState("");
    const [avanceValue, setAvanceValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const turnos = [
        { label: "Turno 1 - 06:00 am - 08:00 am", value: "1" },
        { label: "Turno 2 - 08:00 am - 10:00 am", value: "2" },
        { label: "Turno 3 - 10:00 am - 12:00 pm", value: "3" },
        { label: "Turno 4 - 12:00 pm - 02:00 pm", value: "4" },
        { label: "Turno 5 - 02:00 pm - 04:00 pm", value: "5" },
        { label: "Turno 6 - 04:00 pm - 06:00 pm", value: "6" },
    ];

    const formatThousands = (value) => {
        if (!value) return "";
        const numericValue = value.replace(/\D/g, "");
        return new Intl.NumberFormat("es-CO").format(Number(numericValue));
    };
    
    const formatCurrency = (value) => {
        if (!value) return "$ 0.00";

        const numericValue = value.replace(/\D/g, "");
        const number = Number(numericValue);

        return number.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 2
        });
    };

    return {
        docType,
        turnos,
        avanceValue,
        isFocused,
        setDocType,
        setAvanceValue,
        setIsFocused,
        formatThousands,
        formatCurrency
    }
}

export default useAdvancesSelectorHook;