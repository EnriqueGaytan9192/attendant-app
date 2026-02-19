import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { blockMenu } from "../../../../state/slices/authSlice";
import {
    addInfrastructure,
    nextStep,
    previousStep,
    setDescuento,
    setFieldError,
    setFinTicket,
    setIniTicket,
    setIsComplete,
    setNumTicket,
    setObservationClose,
    setShifValidatorResponse,
    setStepFive,
    setStepSix,
    updateCantidad,
    updateEstado,
    updateObservation
} from "../../../../state/slices/closeTurnSlice";

const useInfrastructureCloseTurnHook = () => {
    const dispatch = useDispatch();

    const closeTurn = useSelector(state => state.closeTurn);
    const {
        dispositivos,
        seguridad,
        infraestructura,
        isComplete,
        observationClose,
        numTicket,
        iniTicket,
        finTicket,
        reportedValue,
    } = closeTurn;

    const { numeroIdentificacion, parqueaderoId, terminalId } =
        useAppSelector(state => state.auth);

    const turnoId = useSelector(state => state.movements.turnoIdObjects);
    const dispositivosRef = useRef(null);
    const seguridadRef = useRef(null);
    const infraestructuraRef = useRef(null);


    // ===============================
    // 🔹 Precarga infraestructura
    // ===============================
    useFetch(
        `/api/parkingTurnResume?id=${numeroIdentificacion}&turn_id=${turnoId}&parqueaderoId=${parqueaderoId}&terminalId=${terminalId}`,
        "GET",
        {
            onComplete: (data) => {
                dispatch(addInfrastructure(data.turn.infrastructure));
            }
        }
    );

    const { getDataFetch } = useLazyFetch();


    const validateCategory = (category, data, ref) => {
        let hasError = false;

        data.forEach((item, index) => {
            if (!item.cantidad || item.cantidad <= 0) {
                dispatch(setFieldError({
                    category,
                    index,
                    field: "cantidad",
                    value: true,
                }));
                hasError = true;
            } else {
                dispatch(setFieldError({
                    category,
                    index,
                    field: "cantidad",
                    value: false,
                }));
            }

            if (!item.estado) {
                dispatch(setFieldError({
                    category,
                    index,
                    field: "estado",
                    value: true,
                }));
                hasError = true;
            } else {
                dispatch(setFieldError({
                    category,
                    index,
                    field: "estado",
                    value: false,
                }));
            }
        });

        if (hasError) {
            ref.current?.open();
            ref.current?.shake();
            return false;
        }

        return true;
    };

    const validateInfrastructure = () => {
        const dispositivosOk = validateCategory(
            "dispositivos",
            dispositivos,
            dispositivosRef
        );

        if (!dispositivosOk) {
            showAlert(
                "error",
                "Debes completar cantidad y estado en Dispositivos y Equipos."
            );
            return false;
        }

        const seguridadOk = validateCategory(
            "seguridad",
            seguridad,
            seguridadRef
        );

        if (!seguridadOk) {
            showAlert(
                "error",
                "Debes completar cantidad y estado en Elementos de Seguridad."
            );
            return false;
        }

        const infraestructuraOk = validateCategory(
            "infraestructura",
            infraestructura,
            infraestructuraRef
        );

        if (!infraestructuraOk) {
            showAlert(
                "error",
                "Debes completar cantidad y estado en Infraestructura."
            );
            return false;
        }

        return true;
    };



    // ===============================
    // 🔥 CIERRE DE TURNO (LÓGICA ORIGINAL)
    // ===============================
    const handleSubmitCloseTurn = async () => {

        if (!validateInfrastructure()) return;

        const validatorPayload = {
            id: String(numeroIdentificacion),
            reportableValue: String(reportedValue),
            turnoId,
        };

        console.log("POST /api/shiftCloseValidator Payload:", validatorPayload);

        const { data: validatorRes, errorFetch: errValidator } =
            await getDataFetch("/api/shiftCloseValidator", "POST", { rq: validatorPayload });

        if (errValidator) {
            showAlert("error", "Error al validar turno");
            return;
        }

        dispatch(setShifValidatorResponse(validatorRes));
        console.log("Respuesta de /api/shiftCloseValidator:", validatorRes);

        if (validatorRes.statusShift === 0 || validatorRes.statusShift === 4 || validatorRes.statusShift === 1) {
            const ajuste = 0;

            const ballotStatus = isComplete ? 0 : 1;

            const infraPayload = [
                ...dispositivos,
                ...seguridad,
                ...infraestructura,
            ].map(item => ({
                id: item.id || 0,
                turnoId,
                quantity: String(item.cantidad || 0),
                status: item.estado,
                observations: item.observaciones,
                name: item.name,
            }));

            const payload = {
                id: String(numeroIdentificacion),
                turnoId,
                reportableValue: reportedValue,
                observations: observationClose,
                ballotStatus,
                numberBallots: ballotStatus ? Number(numTicket) || 0 : 0,
                initialBallot: ballotStatus ? Number(iniTicket) || 0 : 0,
                finalBallot: ballotStatus ? Number(finTicket) || 0 : 0,
                infrastructure: infraPayload,
                adjustment: ajuste,
                terminalId,
            };

            console.log("POST /api/shiftClose Payload:", payload);

            const { data: response, errorFetch } =
                await getDataFetch("/api/shiftClose", "POST", { rq: payload });

            if (errorFetch) {
                console.error("Error en /api/shiftClose:", errorFetch);
                showAlert("error", "Error al cerrar turno");
                return;
            }

            console.log("Respuesta de /api/shiftClose:", response);

            if (validatorRes.statusShift === 0 || validatorRes.statusShift === 4) {
                dispatch(setDescuento(response?.descuento ?? 0));
                dispatch(nextStep());
            } else if (validatorRes.statusShift === 1) {
                dispatch(setDescuento(response?.descuento ?? 0));
                dispatch(setStepSix());
            } else if (validatorRes.statusShift === 2 || validatorRes.statusShift === 3) {
                dispatch(setDescuento(response?.descuento ?? 0));
                dispatch(setStepFive());
            }

        } else {
            if (validatorRes.statusShift === 2 || validatorRes.statusShift === 3) {
                dispatch(setStepFive());
            }
        }

        dispatch(blockMenu(true));
    };

    return {
        ...closeTurn,

        handleCantidadChange: (c, i, v) =>
            dispatch(updateCantidad({ category: c, index: i, value: parseInt(v, 10) || 0 })),

        handleEstadoChange: (c, i, v) =>
            dispatch(updateEstado({ category: c, index: i, value: v })),

        handleObservationChange: (c, i, v) =>
            dispatch(updateObservation({ category: c, index: i, value: v })),

        handleObservationCloseChange: v =>
            dispatch(setObservationClose(v)),

        handleIsCompleteChange: v =>
            dispatch(setIsComplete(v)),

        handleNumTicketChange: v =>
            dispatch(setNumTicket(v)),

        handleIniTicketChange: v =>
            dispatch(setIniTicket(v)),

        handleFinTicketChange: v =>
            dispatch(setFinTicket(v)),

        handleSubmitCloseTurn,
        handlePrevious: () => dispatch(previousStep()),
        dispositivosRef,
        infraestructuraRef,
        seguridadRef
    };
};

export default useInfrastructureCloseTurnHook;
