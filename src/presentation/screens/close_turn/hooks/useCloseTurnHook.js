import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { nextStep, setReportedValue } from "../../../../state/slices/closeTurnSlice";
import { setTurnoId } from "../../../../state/slices/movementsSlice";

const useCloseTurnHook = () => {
    const dispatch = useDispatch();
    const { numeroIdentificacion, parqueaderoId, terminalId } =
        useAppSelector((s) => s.auth);

    const turnoIdObjects = useSelector((s) => s.movements.turnoIdObjects);
    const { getDataFetch } = useLazyFetch();

    /* -------------------- INPUT -------------------- */
    const [closeValue, setCloseValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    /* -------------------- 1. TURNO ID -------------------- */
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

    /* -------------------- 2. DETALLE TURNO -------------------- */
    const { data: turnDetData, loading: loadingTurn } = useFetch(
        turnoIdObjects
            ? `/api/parkingLotTurnDet?turn_id=${turnoIdObjects}&parqueaderoId=${parqueaderoId}&terminalId=${terminalId}`
            : null,
        "GET",
        {}
    );

    /* -------------------- 3. LISTA TURNOS -------------------- */
    const { data: parkingLotData, loading: loadingParking } =
        useFetch(`/api/parkinglot/${parqueaderoId}`, "GET", {});

    /* -------------------- 4. COMBINACIÓN -------------------- */
    let turnDetail = null;
    if (turnDetData?.turn && parkingLotData?.listTurn) {
        turnDetail = parkingLotData.listTurn.find(
            (t) => Number(t.turnoId) === Number(turnDetData.turn.id)
        );
    }

    /* -------------------- HANDLERS -------------------- */

    const formatCurrency = (value) => {
        const number = Number(value);
        if (isNaN(number)) return "$ 0.00";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number);
    };

    const formatCurrencyTwo = (value) => {
        if (!value) return "$ 0.00";

        const numericValue = value.replace(/\D/g, "");
        const number = Number(numericValue);

        return number.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 2,
        });
    };

    const formatThousands = (value) => {
        if (!value) return "";
        const numericValue = value.replace(/\D/g, "");
        return new Intl.NumberFormat("es-CO").format(Number(numericValue));
    };

    const handleChangeValueTwo = (text) => {
        const hasSpace = /\s/.test(text);

        const cleaned = text.replace(/\D/g, "");
        const formatted = formatThousands(cleaned);

        setCloseValue(formatted);

        if (hasSpace) {
            showAlert("warning", "No se permite ingresar espacios.");
        }
    }


    const handleChangeValue = (text) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setCloseValue(numericValue);
    };

    const handledNext = () => {
        if (!closeValue) return;

        const closeValueReported = Number(closeValue.replace(/\D/g, ""));
        console.log("Base de caja incompleta: ", closeValueReported);

        dispatch(setReportedValue(closeValueReported));
        dispatch(nextStep());
    };

    return {
        numeroIdentificacion,
        // Data
        turnDet: turnDetData?.turn ?? null,
        turnDetail,
        loading: loadingTurn || loadingParking,

        // Input
        closeValue,
        isFocused,
        formatCurrency,
        formatCurrencyTwo,
        handleChangeValueTwo,
        handleChangeValue,
        setIsFocused,

        // Flow
        handledNext,
    };
};

export default useCloseTurnHook;
