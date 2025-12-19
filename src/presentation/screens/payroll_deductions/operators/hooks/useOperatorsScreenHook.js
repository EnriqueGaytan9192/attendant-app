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
        {nombreOperador: "Nayibe Casas", noIdentificador: "23453457647", nombreParqueadero: "Parqueadero Centro", turnoId: 421, fechaDescuento: "25/09/2025", tipoDescuento: "Siniestros", valorDescuento: "$200.000", formatoDescuento: "Temporal", status: "Activo", centroCostos: "1457" },
        {nombreOperador: "Enrique Gaytán", noIdentificador: "24563074624", nombreParqueadero: "Parqueadero Norte", turnoId: 322, fechaDescuento: "10/10/2025", tipoDescuento: "Descuadre", valorDescuento: "$150.000", formatoDescuento: "Directo", status: "Justificado", centroCostos: "2365" },
        {nombreOperador: "Germán Chávez", noIdentificador: "54217628011", nombreParqueadero: "Parqueadero Sur", turnoId: 213, fechaDescuento: "15/10/2025", tipoDescuento: "Siniestros", valorDescuento: "$300.000", formatoDescuento: "Temporal", status: "Activo", centroCostos: "1987" },
        {nombreOperador: "Eick Govea", noIdentificador: "62478200351", nombreParqueadero: "Parqueadero Este", turnoId: 134, fechaDescuento: "20/10/2025", tipoDescuento: "Descuadre", valorDescuento: "$250.000", formatoDescuento: "Directo", status: "Justificado", centroCostos: "1452" },
    ]

    /* Parking International S.A.S */

    /*const filteredData = dataInfo.filter((item) =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );*/

    const filteredData = dataInfo.filter((item) => {
        const searchText = search.toLowerCase();

        return (
            item.fechaDescuento.toLowerCase().includes(searchText) ||
            item.valorDescuento.toLowerCase().includes(searchText) ||
            item.tipoDescuento.toLowerCase().includes(searchText) ||
            item.nombreOperador.toLowerCase().includes(searchText) ||
            item.noIdentificador.toLowerCase().includes(searchText)
        );
    });

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