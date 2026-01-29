import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { nextStep, previousStep, setBaseCaja, setIsComplete } from "../../../../state/slices/openTurnSlice";

const useSummaryTurnHook = () => {
    const dispatch = useDispatch();

    const {
        isComplete,
        baseCaja,
        enganchados,
        manualPlates
    } = useAppSelector(state => state.openTurn);

    const {
        numeroIdentificacion,
        parqueaderoId,
        terminalId,
        empleado
    } = useAppSelector(state => state.auth);

    const [boxBase, setBoxBase] = useState("");
    const [turnInfo, setTurnInfo] = useState(null);
    const [empleadoNombre, setEmpleadoNombre] = useState(empleado);

    const { getDataFetch } = useLazyFetch();

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

    const handlePrevious = () => {
        dispatch(previousStep());
    };

    const handleNextStep = () => {
        if (!isComplete) {
            if (!boxBase) {
                showAlert("warning", "Debe ingresar una base de caja.");
                return;
            }

            const baseValue = Number(boxBase);

            if (isNaN(baseValue) || baseValue <= 0 || baseValue % 50 !== 0) {
                showAlert(
                    "error",
                    "La base debe ser un valor mayor a 0 y múltiplo de 50."
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
    };
};

export default useSummaryTurnHook;