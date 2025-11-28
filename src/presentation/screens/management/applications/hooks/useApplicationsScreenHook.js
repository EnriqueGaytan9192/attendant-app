import { useEffect, useRef, useState } from "react";
import { showAlert } from "../../../../../common/components/AlertManager";

const useApplicationsScreenHook = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const tableRef = useRef(null);
    const searchInputRef = useRef(null);

    const dataInfo = [
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Activo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Inactivo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Activo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Inactivo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Activo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Inactivo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Activo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Inactivo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Activo" },
        { fecha: "dd/mm/aaaa 00:00", numSolicitud: 123456, asunto: "Lorem ipsum", status: "Inactivo" },
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
        Justificado: { bg: "#FFA000", dot: "#FF7D00" }
    };
    const getStatusBg = (status) => statusStyles[status]?.bg || "#999";
    const getStatusDot = (status) => statusStyles[status]?.dot || "#777";

    return {
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
        setSearch,
        setPage,
        setItemsPerPage,
        getStatusBg,
        getStatusDot,
    }
}

export default useApplicationsScreenHook;