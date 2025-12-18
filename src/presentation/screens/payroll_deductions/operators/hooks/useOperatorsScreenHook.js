import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../../common/components/AlertManager";
import { setSelectedOperator, showModalOperators } from "../../../../../state/slices/payrollDeductionsSlice";

const useOperatorsScreenHook = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const tableRef = useRef(null);
    const searchInputRef = useRef(null);
    const dispatch = useDispatch();

    const dataInfo = [
        { fechaDescuento: "25/09/2025", valorDescuento: "$200.000", tipoDescuento: "Siniestros", status: "Activo", nombreOperador: "Nayibe Casas", noIdentificador: "23453457647", nombreEmpresa: "Parking International S.A.S", centroCostos: "1457" },
        { fechaDescuento: "20/10/2025", valorDescuento: "$130.000", tipoDescuento: "Descuadre", status: "Justificado", nombreOperador: "Enrique Gaytán", noIdentificador: "24563074624", nombreEmpresa: "Parking International S.A.S", centroCostos: "2420" },
        { fechaDescuento: "11/11/2025", valorDescuento: "$500.000", tipoDescuento: "Siniestros", status: "Activo", nombreOperador: "Germán Chávez", noIdentificador: "54217628011", nombreEmpresa: "Parking International S.A.S", centroCostos: "1150" },
        { fechaDescuento: "14/12/2025", valorDescuento: "$350.000", tipoDescuento: "Descuadre", status: "Justificado", nombreOperador: "Erick Govea", noIdentificador: "62478200351", nombreEmpresa: "Parking International S.A.S", centroCostos: "2460" },
    ];

    const filteredData = dataInfo.filter((item) =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    useEffect(() => {
        console.log("Texto buscado: ", search);
        console.log("Resultados filtrados: ", filteredData);

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

    const handleViewOperator = (row) => {
        console.log("Operador seleccionado: ", row);
        
        dispatch(setSelectedOperator(row));
        dispatch(showModalOperators(true));
    }

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
        handleViewOperator,
    }
}

export default useOperatorsScreenHook;