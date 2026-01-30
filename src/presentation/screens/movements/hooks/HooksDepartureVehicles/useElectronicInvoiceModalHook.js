import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLazyFetch } from "../../../../../common/hook/useFetch";
import { showElectronicInvoiceModal } from "../../../../../state/slices/movementsSlice";
import { closeElectronicInvoiceModal } from "../../../../../state/slices/productPurchasesSlice";

const useElectronicInvoiceModalHook = () => {
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);
    const { parqueaderoId } = useSelector((state) => state.auth);

    const { getDataFetch } = useLazyFetch();
    
    useEffect(() => {
        console.log("Fetching document types...");
        getDataFetch("/api/tipoDocumentos", "GET", {
            onComplete: (data) => {
                // Filtrar por prefijos "NT" y "CC"
                const filteredData = data.data.filter(doc => doc.prefijo === 'NT' || doc.prefijo === 'CC');
                setOptions(filteredData);  // Actualizar el estado con los datos filtrados
            },
            onError: (err) => {
                console.error("Error fetching document types (callback):", err);
                setError(err);
            }
        })
        .then((data) => {
            // Filtrar por prefijos "NT" y "CC"
            const filteredData = data.data.filter(doc => doc.prefijo === 'NT' || doc.prefijo === 'CC');
            setOptions(filteredData);  // Actualizar el estado con los datos filtrados
        })
        .catch((err) => {
            console.error("Error fetching document types (catch):", err);
        });
    }, []);
    
    

    /*const saveElectronicInvoice = (invoiceData) => {
        getDataFetch("/api/electronicInvoice", "POST", { rq: invoiceData })
            .then((data) => {
                console.log("Invoice saved successfully:", data);
                Alert.alert("Factura guardada exitosamente.");
                onCloseModal();
            })
            .catch((err) => {
                console.error("Error saving invoice:", err);
                Alert.alert("Error al guardar la factura.");
            });
    };*/

    const saveElectronicInvoice = (invoiceData) => {
    
        // Verificamos que selectedVehicle no sea nulo o indefinido
        /*if (!selectedVehicle) {
            console.error("No vehicle selected.");
            Alert.alert("Error: No se ha seleccionado un vehículo.");
            return;
        }*/
    
        const requestData = {
            ...invoiceData,
            parqueaderoId: parqueaderoId,
            entradaVehiculoId: selectedVehicle?.vehicleId || 0,
        };
    
        getDataFetch("/api/electronicInvoice", "POST", { rq: requestData })
            .then((data) => {
                console.log("Invoice saved successfully:", data);
                Alert.alert("Usuario creado en facturación exitosamente.");
                onCloseModal();
            })
            .catch((err) => {
                console.error("Error saving invoice:", err);
                Alert.alert("Error al guardar la factura.");
            });
    };
    

    const onCloseModal = () => {
        dispatch(showElectronicInvoiceModal(false));
        dispatch(closeElectronicInvoiceModal(false))
    };

    return {
        options,
        loading,
        error,
        saveElectronicInvoice,
        onCloseModal
    };
};

export default useElectronicInvoiceModalHook;