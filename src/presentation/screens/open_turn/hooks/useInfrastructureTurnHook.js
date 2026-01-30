import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import {
    addInfrastructure,
    nextStep,
    previousStep,
    updateCantidad,
    updateEstado,
    updateObservation,
} from "../../../../state/slices/openTurnSlice";

const useInfrastructureTurnHook = () => {
    const dispatch = useDispatch();

    const {
        dispositivos,
        seguridad,
        infraestructura,
        plates,
        observaciones,
        enganchados,
        baseCaja,
        isComplete,
        selectedPlates,
        manualPlates
    } = useSelector((state) => state.openTurn);

    const { numeroIdentificacion, terminalId, parqueaderoId } =
        useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [turnoId, setTurnoId] = useState(null);

    const { getDataFetch: lazyFetch } = useLazyFetch();

    /* ================= PRELOAD TURNO + INFRA ================= */

    useEffect(() => {
        if (!numeroIdentificacion) return;

        (async () => {
            try {
                const turnRes = await lazyFetch("/api/turn", "POST", {
                    rq: { id: numeroIdentificacion, parqueaderoId },
                });

                const id = turnRes?.data?.turn?.turnoId;
                if (!id) return;

                setTurnoId(id);

                const resumeRes = await lazyFetch(
                    `/api/parkingTurnResume?id=${numeroIdentificacion}&turn_id=${id}&parqueaderoId=${parqueaderoId}&terminalId=${terminalId}`,
                    "GET"
                );

                if (resumeRes?.data?.turn?.infrastructure?.length) {
                    dispatch(addInfrastructure(resumeRes.data.turn.infrastructure));
                }
            } catch (err) {
                console.error("Error cargando infraestructura:", err);
            }
        })();
    }, [numeroIdentificacion]);

    /* ================= VALIDACIÓN ================= */

    const validateFields = () => {
        const valid = (arr) =>
            arr.every(item => item.cantidad !== "" && item.estado !== "");

        if (!valid(dispositivos) || !valid(seguridad) || !valid(infraestructura)) {
            showAlert(
                "warning",
                "Debes completar cantidad y estado en todos los elementos."
            );
            return false;
        }
        return true;
    };

    /* ================= TRANSFORM ================= */

    const transformInfrastructure = () => {
        const map = (arr) =>
            arr.map(item => ({
                id: item.id ?? 0,
                name: item.name,
                quantity: item.cantidad,
                status: item.estado,
                observations: item.observaciones,
            }));

        return [
            ...map(dispositivos),
            ...map(seguridad),
            ...map(infraestructura),
        ];
    };

    const transformPlates = () => {
        const selected = Object.keys(selectedPlates)
            .filter(p => selectedPlates[p])
            .map(plate => ({
                plate,
                entry_date: new Date().toISOString(),
            }));

        const manual = manualPlates.map(p => ({
            plate: p.plate,
            entry_date: `${p.entry_date} ${p.entry_hour}`,
        }));

        return [...selected, ...manual];
    };


    /* ================= API ================= */

    const saveOpenTurn = async () => {
        const rq = {
            id: numeroIdentificacion,
            terminalId,
            box_base: isComplete ? 0 : Number(baseCaja),
            plates: transformPlates(),
            observation: observaciones,
        };

        const { errorFetch } = await lazyFetch("/api/shiftOpen", "POST", { rq });

        if (errorFetch) {
            showAlert("error", "Error al guardar apertura de turno.");
            return false;
        }
        return true;
    };

    const saveInfrastructure = async () => {
        const rq = {
            turnoId,
            parqueaderoId,
            data: transformInfrastructure(),
        };

        const { errorFetch } = await lazyFetch(
            "/api/infrastuctureInventory",
            "POST",
            { rq }
        );

        if (errorFetch) {
            showAlert("error", "Error al guardar infraestructura.");
            return false;
        }
        return true;
    };

    const saveEnganchados = async () => {
        const payload = {
            platesVehicles: enganchados.platesVehicles.map(v => ({
                ...v,
                turnoId,
                parqueaderoId,
            })),
            platesMotos: enganchados.platesMotos.map(v => ({
                ...v,
                turnoId,
                parqueaderoId,
            })),
            platesBikes: enganchados.platesBikes.map(v => ({
                ...v,
                turnoId,
                parqueaderoId,
            })),
        };

        const { errorFetch } = await lazyFetch(
            "/api/vehiculos/enganchados",
            "PUT",
            { rq: payload }
        );

        if (errorFetch) {
            showAlert("error", "Error al guardar vehículos enganchados.");
            return false;
        }
        return true;
    };

    /* ================= HANDLERS ================= */

    const handleNextStep = async () => {
        if (loading) return;
        if (!validateFields()) return;

        setLoading(true);
        try {
            if (!(await saveOpenTurn())) return;
            if (!(await saveInfrastructure())) return;
            if (!(await saveEnganchados())) return;

            dispatch(nextStep());
        } finally {
            setLoading(false);
        }
    };

    return {
        dispositivos,
        seguridad,
        infraestructura,
        loading,
        handleCantidadChange: (c, i, v) =>
            dispatch(updateCantidad({ category: c, index: i, value: v })),
        handleEstadoChange: (c, i, v) =>
            dispatch(updateEstado({ category: c, index: i, value: v })),
        handleObservationChange: (c, i, v) =>
            dispatch(updateObservation({ category: c, index: i, value: v })),
        handlePrevious: () => dispatch(previousStep()),
        handleNextStep,
    };
};

export default useInfrastructureTurnHook;
