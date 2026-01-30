import { useState } from "react";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import {
    handleMenu,
    setTurnId
} from "../../../../state/slices/archingSlice";
 
const useShiftSelectorHook = () => {
    //const { getDataFetch: invokeStep3 } = useLazyFetch();
    const [visible, setVisible] = useState(false);
    const [modalType, setModalType] = useState("info");
    const [modalData, setModalData] = useState({});
    const [currentAmount, setCurrentAmount] = useState(null); // Para guardar el monto temporalmente
    const { showList, selectedShift, value, idTurn } = useAppSelector((state) => state.arching);
    const handleSelectshiftList = (turnoId) => {
        dispatch(setTurnId(turnoId));
        dispatch(handleMenu(false));
    };
    const dispatch = useAppDispatch();
    const [userDetail, setUserDetail] = useState(null);
 
 
    // 2. Leer empleado y numeroIdentificacion de Redux
    const { numeroIdentificacion, parqueaderoId } = useAppSelector((state) => state.auth);
    const [turnData, setTurnData] = useState(null);
 
    // Función para obtener datos del turno con POST
    const fetchTurnData = async () => {
        const payload = {
            id: numeroIdentificacion,
            parqueaderoId: parqueaderoId
        };
 
        const { data, errorFetch } = await getDataFetch(
            "/api/turn",
            "POST",
            { rq: payload }
        );
 
        if (errorFetch) {
            console.error("Error fetching turn data:", errorFetch);
            return null;
        }
 
        if (data) {
            setTurnData(data);
            return data;
        }
 
        return null;
    };
 
 
 
    const { data: userData, loading: userLoading, errorFetch: userError } = useFetch(
        numeroIdentificacion ? `/api/user/${numeroIdentificacion}` : null,
        "GET",
        {
            onComplete: (res) => {
                if (res.exito) {
                    //console.log("Usuario obtenido:", res.datosUsuario);
                    setUserDetail(res.datosUsuario);
                }
            },
            onError: (err) => {
                console.log("Error al obtener usuario:", err);
            },
            onloading: (isLoading) => {
                // Manejo opcional de "cargando" para user
            },
        }
    );
 
 
    const empleadoNombre = userDetail?.empleado || "Desconocido";
    const { data } = useFetch(`/api/parkinglot/${parqueaderoId}`, "GET", {});
    const showModal = (type, data) => {
        setModalType(type);
        setModalData(data);
        setVisible(true);
    };
 
    const hideModal = () => {
        setVisible(false);
    };
 
    const { getDataFetch, data: st2 } = useLazyFetch();
 
    const handleSave = async (amount, turnNumeroIdentificacion) => {
        // Guardar el monto actual para usarlo en la confirmación posterior
        setCurrentAmount(Number(amount));
 
        // Construir la URL de validación con los parámetros necesarios.
        // Se utiliza terminal_id = 61 para la validación según el ejemplo.
        const validationUrl = `/api/saveAdvance/validation?id=${turnNumeroIdentificacion}&turn_id=${idTurn}&terminal_id=61&reportedValue=${amount}`;
        console.log("Validando avance (GET):", validationUrl);
 
        // Realizar la solicitud GET de validación
        const { data: validationData, errorFetch: validationError } = await getDataFetch(validationUrl, "GET");
        console.log("Respuesta de validación:", validationData);
        if (validationError) {
            console.error("Validación:", validationError);
            alert("Error en validación: " + (validationError.msg || validationError.message));
            return;
        }
 
        let modalType = "info"; // Valor por defecto
        // Se utiliza trim() en caso de que existan espacios extra
        if (validationData.title.trim() === "Alerta") {
            modalType = "warning";
        } else if (validationData.title.trim() === "Confirmar Avance") {
            modalType = "info";
        }
 
        // Mostrar el modal de confirmación con los datos obtenidos de la API
        showModal(modalType, {
            title: validationData.title,
            message: validationData.message,
            buttonText: "Continuar"
        });
    };
 
    const handleConfirm = async (turnNumeroIdentificacion) => {
        // Preparar el payload para la solicitud PUT
        const payloadPut = {
            id: Number(turnNumeroIdentificacion),
            turn_id: Number(idTurn),
            terminal_id: 64, // Se utiliza el valor 64 para el PUT según lo solicitado
            reportedValue: Number(currentAmount) || 0,
        };
 
        console.log("Ejecutando avance (PUT):", payloadPut);
 
        // Realizar la solicitud PUT para guardar el avance
        const { data: putResponse, errorFetch: putError } = await getDataFetch(
            "/api/saveAdvance",
            "PUT",
            { rq: payloadPut }
        );
 
        if (putError) {
            console.error("Error en PUT:", putError);
            showModal("warning", {
                title: "Error",
                message: "Ocurrió un error al realizar el avance: " + (putError.msg || putError.message),
                buttonText: "Aceptar",
            });
            return;
        }
 
        // Si la respuesta es exitosa, mostrar el modal de éxito en verde
        if (putResponse && putResponse.status) {
            console.log("Avance exitoso:", putResponse);
            showModal("success", {
                title: "Avance Exitoso",
                message: "El avance fue realizado exitosamente.",
                buttonText: "Aceptar",
            });
 
            // Opcionalmente, se puede despachar una alerta en la aplicación
            /*dispatch(showAlert({ flag: true, severity: "success" }));
            dispatch(setLabelTitle("Avance Exitoso"));
            dispatch(setLabelMessage("El avance fue realizado exitosamente."));*/
        }
    };

    return {
        functions: {
            handleSelectshiftList,
            fetchTurnData
        },
        states: {
            showList,
            selectedShift,
            data,
            value,
            st2,
            turnData
        },
        visible,
        hideModal,
        modalType,
        modalData,
        handleSave,
        handleConfirm,
        currentAmount
    };
 
};
 
export default useShiftSelectorHook;