import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { nextStep, previousStep, setBaseCaja, setIsComplete } from "../../../../state/slices/openTurnSlice";

const useSummaryTurnHook = () => {
    const { numeroIdentificacion, parqueaderoId, terminalId, empleado } = useAppSelector(state => state.auth);
    const { isComplete, baseCaja, enganchados, manualPlates } = useAppSelector(state => state.openTurn);
    const dispatch = useDispatch();
    const { getDataFetch } = useLazyFetch();
    const [boxBase, setBoxBase] = useState("");
    const [turnInfo, setTurnInfo] = useState(null);
    const [empleadoNombre, setEmpleadoNombre] = useState(empleado);
    const [isBoxBaseFocused, setIsBoxBaseFocused] = useState(false);

    /* ========= TURNO ========= */
    useFetch(
        numeroIdentificacion ? "/api/turn" : null,
        "POST",
        {
            rq: {
                id: numeroIdentificacion,
                parqueaderoId,
            },
            onComplete: async (res) => {
                setTurnInfo(res.turn);

                const { data } = await getDataFetch(
                    `/api/parkingLotTurnDet?turn_id=${res.turn.turnoId}&parqueaderoId=${parqueaderoId}&terminalId=${terminalId}`,
                    "GET",
                    {}
                );

                dispatch(setBaseCaja(data?.turn?.box_base ?? 0));
            }
        }
    );

    /* ========= USUARIO ========= */
    useFetch(
        numeroIdentificacion ? `/api/user/${numeroIdentificacion}` : null,
        "GET",
        {
            onComplete: (res) => {
                if (res?.exito) {
                    setEmpleadoNombre(res.datosUsuario?.empleado);
                }
            }
        }
    );

    /* ========= TOTAL VEHÍCULOS ========= */
    const countSelected = (arr = []) =>
        arr.filter(v => v.state === 1).length;

    const totalVehiclesInPatio =
        manualPlates.length +
        countSelected(enganchados.platesVehicles) +
        countSelected(enganchados.platesMotos) +
        countSelected(enganchados.platesBikes);

    /* ========= BASE ========= */
    const toggleBase = (value) => {
        dispatch(setIsComplete(value));
        if (value) setBoxBase("");
    };

    const formatCurrency = (value) => {
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

    const handleBoxBaseChange = (text) => {
        const hasSpace = /\s/.test(text);

        const cleaned = text.replace(/\D/g, "");
        const formatted = formatThousands(cleaned);

        setBoxBase(formatted);

        if (hasSpace) {
            showAlert("warning", "No se permite ingresar espacios.");
        }
    };

    const handlePrevious = () => {
        dispatch(previousStep());
    };

    const handleNextStep = () => {
        if (!isComplete) {
            if (!boxBase) {
                showAlert("warning", "Debe ingresar una base de caja.");
                return;
            }

            const baseValue = Number(boxBase.replace(/\D/g, ""));
            console.log("Base de caja incompleta: ", baseValue);

            if (isNaN(baseValue) || baseValue <= 0 || baseValue % 50 !== 0) {
                showAlert(
                    "error",
                    "La base de caja debe ser un valor mayor a 0 y múltiplo de 50."
                );
                return;
            }

            dispatch(setBaseCaja(baseValue));
        }

        dispatch(nextStep());
    };

    return {
        turnInfo,
        empleadoNombre,
        numeroIdentificacion,
        baseCompleta: isComplete,
        baseCaja,
        boxBase,
        setBoxBase,
        totalVehiclesInPatio,
        toggleBase,
        handlePrevious,
        handleNextStep,
        isBoxBaseFocused,
        setIsBoxBaseFocused,
        handleBoxBaseChange,
        formatCurrency,
    };
};

export default useSummaryTurnHook;