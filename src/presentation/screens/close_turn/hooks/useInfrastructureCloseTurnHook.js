import { useDispatch, useSelector } from "react-redux";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import {
    addInfrastructure,
    nextStep,
    previousStep,
    setDescuento,
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
    updateObservation,
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

    // ===============================
    // 🔥 CIERRE DE TURNO (LÓGICA ORIGINAL)
    // ===============================
    const handleSubmitCloseTurn = async () => {
        const validatorPayload = {
            id: String(numeroIdentificacion),
            reportableValue: String(reportedValue),
            turnoId,
        };

        const { data: validatorRes, errorFetch: errValidator } =
            await getDataFetch("/api/shiftCloseValidator", "POST", { rq: validatorPayload });

        if (errValidator) {
            alert("Error al validar turno");
            return;
        }

        dispatch(setShifValidatorResponse(validatorRes));

        /**
         * 🔥 MISMA LÓGICA QUE EL CÓDIGO VIEJO
         */
        if (
            validatorRes.statusShift === 0 ||
            validatorRes.statusShift === 4 ||
            validatorRes.statusShift === 1
        ) {

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
                adjustment: validatorRes.ajuste ?? 0,
                terminalId,
            };

            const { data: response, errorFetch } =
                await getDataFetch("/api/shiftClose", "POST", { rq: payload });

            if (errorFetch) {
                alert("Error al cerrar turno");
                return;
            }

            dispatch(setDescuento(response?.descuento ?? 0));

            if (validatorRes.statusShift === 0 || validatorRes.statusShift === 4) {
                dispatch(nextStep());
            } else if (validatorRes.statusShift === 1) {
                dispatch(setStepSix());
            }
        } else {
            if (validatorRes.statusShift === 2 || validatorRes.statusShift === 3) {
                dispatch(setStepFive());
            }
        }
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
    };
};

export default useInfrastructureCloseTurnHook;
