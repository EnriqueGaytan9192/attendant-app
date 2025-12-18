import { useEffect, useRef, useState } from "react";
import { showAlert } from "../../../../../common/components/AlertManager";

const useApplicationsScreenHook = () => {
    const [selectedTabApplications, setSelectedTabApplications] = useState("applications");
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const tableRef = useRef(null);
    const searchInputRef = useRef(null);

    const dataInfo = [
        {
            fecha: "10/01/2025 21:01",
            numSolicitud: 1,
            asunto: "Infraestructura",
            status: "Enviada",
            claim: "Se evidencian daños en la infraestructura del parqueadero que afectan la operación.",
            answer: "La novedad fue registrada y será evaluada por el área de mantenimiento del parqueadero."
        },
        {
            fecha: "01/05/2025 19:10",
            numSolicitud: 2,
            asunto: "Problemas técnicos: equipos de tablets o hubs",
            status: "Respondida",
            claim: "Las tablets y hubs del parqueadero presentan fallas de conexión y funcionamiento.",
            answer: "Se realizó soporte técnico y los equipos del parqueadero quedaron operativos."
        },
        {
            fecha: "20/08/2025 10:15",
            numSolicitud: 3,
            asunto: "Problemas técnicos: equipos automáticos y talanqueras",
            status: "Enviada",
            claim: "Las talanqueras y equipos automáticos del parqueadero no funcionan correctamente.",
            answer: "El requerimiento fue asignado al área técnica para su revisión en sitio."
        },
        {
            fecha: "14/11/2025 13:21",
            numSolicitud: 4,
            asunto: "Suministros",
            status: "Respondida",
            claim: "El parqueadero presenta escasez de insumos operativos.",
            answer: "Los suministros solicitados fueron entregados y se normalizó la operación."
        },
        {
            fecha: "10/01/2025 21:01",
            numSolicitud: 5,
            asunto: "Solicitud recursos humanos",
            status: "Enviada",
            claim: "Se requiere personal adicional para cubrir los turnos del parqueadero.",
            answer: "La solicitud fue enviada al área de talento humano para su validación."
        },
        {
            fecha: "01/05/2025 19:10",
            numSolicitud: 6,
            asunto: "Visitas de autoridades",
            status: "Respondida",
            claim: "Se notifica visita de autoridades al parqueadero para inspección.",
            answer: "La visita fue atendida conforme a los protocolos establecidos."
        },
        {
            fecha: "20/08/2025 10:15",
            numSolicitud: 7,
            asunto: "Denuncias",
            status: "Enviada",
            claim: "Se reporta una situación irregular ocurrida dentro del parqueadero.",
            answer: "El reporte fue recibido y se inició el proceso de verificación correspondiente."
        },
        {
            fecha: "14/11/2025 13:21",
            numSolicitud: 8,
            asunto: "Servicios públicos",
            status: "Respondida",
            claim: "Se presentan fallas en los servicios públicos que afectan el parqueadero.",
            answer: "El inconveniente fue gestionado y el servicio quedó restablecido."
        }
    ];

    const filteredData = dataInfo.filter((item) =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    useEffect(() => {
        if (search.length > 0 && filteredData.length === 0) {
            showAlert("warning", "No se encontraron coincidencias.");

            if (tableRef?.current?.shake) {
                tableRef.current.shake(600);
            }
            if (searchInputRef?.current?.shake) {
                searchInputRef.current.shake(600);
            }
        }
    }, [search, filteredData]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, filteredData.length);
    const paginatedData = filteredData.slice(from, to);

    const statusStyles = {
        Activo: { bg: "#90D400", dot: "#80C300" },
        Inactivo: { bg: "#FF6B6B", dot: "#CC3B3B" },
        Justificado: { bg: "#FFA000", dot: "#FF7D00" },
        Enviada: { bg: "#FFA000", dot: "#FF7D00" },
        Respondida: { bg: "#90D400", dot: "#80C300" },
    };
    const getStatusBg = (status) => statusStyles[status]?.bg || "#999";
    const getStatusDot = (status) => statusStyles[status]?.dot || "#777";

    return {
        selectedTabApplications,
        selectedApplication,
        search,
        page,
        itemsPerPage,
        dataInfo,
        paginatedData,
        totalPages,
        tableRef,
        searchInputRef,
        from,
        to,
        filteredData,
        setSelectedTabApplications,
        setSelectedApplication,
        setSearch,
        setPage,
        setItemsPerPage,
        getStatusBg,
        getStatusDot,
    }
}

export default useApplicationsScreenHook;