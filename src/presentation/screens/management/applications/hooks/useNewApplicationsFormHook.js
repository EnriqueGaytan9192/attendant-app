import { useRef, useState } from "react";

const useNewApplicationsFormHook = () => {

    const asuntos = [
        { label: "Infraestructura", value: "1" },
        { label: "Problemas técnicos: equipos de tablets o hubs", value: "2" },
        { label: "Problemas técnicos: equipos equipos automáticos y talanqueras", value: "3" },
        { label: "Suministros", value: "4" },
        { label: "Solicitud recursos humanos", value: "5" },
        { label: "Visitas de autoridades", value: "6" },
        { label: "Denuncias", value: "7" },
        { label: "Servicios públicos", value: "8" }
    ];
    const [docType, setDocType] = useState("");
    const applicationDescriptionRef = useRef(null);

    return {
        asuntos,
        docType,
        applicationDescriptionRef,
        setDocType,
    };
};

export default useNewApplicationsFormHook;