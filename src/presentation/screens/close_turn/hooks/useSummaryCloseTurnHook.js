import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { nextStep, previousStep } from "../../../../state/slices/closeTurnSlice";
import { setTurnoId } from "../../../../state/slices/movementsSlice";

const formatCurrency = (value) => {
    if (!value && value !== 0) return "$0.00";
    return `$${Number(value).toLocaleString("en-CO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
};

const useSummaryCloseTurnHook = () => {
    const dispatch = useDispatch();

    /* -------------------- AUTH -------------------- */
    const {
        numeroIdentificacion,
        parqueaderoId,
        terminalId,
        terminal,
    } = useAppSelector((state) => state.auth);

    /* -------------------- REDUX -------------------- */
    const turnoIdObjects = useSelector((state) => state.movements.turnoIdObjects);
    const reportedValue = useSelector((state) => state.closeTurn.reportedValue);

    const { getDataFetch } = useLazyFetch();

    /* -------------------- 1️⃣ TURNO ID -------------------- */
    useEffect(() => {
        const fetchTurnoId = async () => {
            const { data } = await getDataFetch("/api/turn", "POST", {
                rq: { id: numeroIdentificacion, parqueaderoId },
            });

            if (data?.turn?.turnoId) {
                dispatch(setTurnoId(data.turn.turnoId));
            }
        };

        if (!turnoIdObjects) fetchTurnoId();
    }, [turnoIdObjects]);

    /* -------------------- 2️⃣ DETALLE TURNO -------------------- */
    const { data: turnDetData, loading: loadingTurnDet } = useFetch(
        turnoIdObjects
            ? `/api/parkingLotTurnDet?turn_id=${turnoIdObjects}&parqueaderoId=${parqueaderoId}&terminalId=${terminalId}`
            : null,
        "GET",
        {}
    );

    /* -------------------- 3️⃣ LISTA TURNOS -------------------- */
    const { data: parkingLotData, loading: loadingParkingLot } = useFetch(
        `/api/parkinglot/${parqueaderoId}`,
        "GET",
        {}
    );

    let turnDetail = null;
    if (turnDetData?.turn && parkingLotData?.listTurn) {
        turnDetail = parkingLotData.listTurn.find(
            (t) => Number(t.turnoId) === Number(turnDetData.turn.id)
        );
    }

    /* -------------------- 4️⃣ PRODUCIDO ATTENDANT -------------------- */
    const { data: amountsData, loading: loadingAmounts } = useFetch(
        turnoIdObjects
            ? `/api/parkingTurnClose?id=${numeroIdentificacion}&turn_id=${turnoIdObjects}`
            : null,
        "GET",
        {}
    );

    /* -------------------- HANDLERS -------------------- */
    const handlePrevious = () => {
        dispatch(previousStep());
    };

    const handledNextStep = () => {
        dispatch(nextStep());
    };

    return {
        numeroIdentificacion,
        // Data
        turnDet: turnDetData?.turn ?? null,
        turnDetail,
        terminal,
        terminalId,
        reportedValue,
        amountsDeta: amountsData?.turn ?? null,

        // Utils
        formatCurrency,

        // UI state
        loading: loadingTurnDet || loadingParkingLot || loadingAmounts,

        // Flow
        handlePrevious,
        handledNextStep,
    };
};

export default useSummaryCloseTurnHook;
