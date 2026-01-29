import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import {
    nextStep,
    previousStep,
    updateCantidad,
    updateEstado,
    updateObservation
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
    } = useSelector((state) => state.openTurn);

    const { numeroIdentificacion, terminalId, parqueaderoId } = useSelector(
        (state) => state.auth
    );

    const [loading, setLoading] = useState(false);

    const { getDataFetch: createTurnFetch } = useLazyFetch();
    const { getDataFetch: saveShiftOpen } = useLazyFetch();
    const { getDataFetch: saveInfrastructure } = useLazyFetch();
    const { getDataFetch: saveEnganchados } = useLazyFetch();

    /* ================= VALIDACIÓN ================= */

    const validateFields = () => {
        const check = (arr) =>
            arr.every(item => item.cantidad !== "" && item.estado !== "");

        if (!check(dispositivos) || !check(seguridad) || !check(infraestructura)) {
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
        const mapItems = (arr) =>
            arr.map(item => ({
                name: item.name,
                quantity: item.cantidad,
                status: item.estado,
                observations: item.observaciones,
            }));

        return [
            ...mapItems(dispositivos),
            ...mapItems(seguridad),
            ...mapItems(infraestructura),
        ];
    };

    /* ================= API ================= */

    const createTurn = async () => {
        const { data, errorFetch } = await createTurnFetch(
            "/api/turn",
            "POST",
            { rq: { id: numeroIdentificacion, parqueaderoId } }
        );

        if (errorFetch || !data?.turn?.turnoId) {
            showAlert("error", "No se pudo crear el turno.");
            return null;
        }

        return data.turn.turnoId;
    };

    const saveOpenTurn = async (turnoId) => {
        const rq = {
            id: numeroIdentificacion,
            terminalId,
            box_base: isComplete ? 0 : Number(baseCaja),
            plates,
            observation: observaciones,
        };

        const { errorFetch } = await saveShiftOpen(
            "/api/shiftOpen",
            "POST",
            { rq }
        );

        if (errorFetch) {
            showAlert("error", "Error al guardar la apertura del turno.");
            return false;
        }

        return true;
    };

    const saveInfra = async (turnoId) => {
        const rq = {
            turnoId,
            parqueaderoId,
            data: transformInfrastructure(),
        };

        const { errorFetch } = await saveInfrastructure(
            "/api/infrastuctureInventory",
            "POST",
            { rq }
        );

        if (errorFetch) {
            showAlert("error", "Error al guardar la infraestructura.");
            return false;
        }

        return true;
    };

    const saveEnganchadosData = async (turnoId) => {
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

        const { errorFetch } = await saveEnganchados(
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
            const turnoId = await createTurn();
            if (!turnoId) return;

            if (!(await saveOpenTurn(turnoId))) return;
            if (!(await saveInfra(turnoId))) return;
            if (!(await saveEnganchadosData(turnoId))) return;

            dispatch(nextStep());
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => dispatch(previousStep());

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
        handlePrevious,
        handleNextStep,
    };
};

export default useInfrastructureTurnHook;
