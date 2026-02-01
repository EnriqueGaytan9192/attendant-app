import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import { addInfrastructure, clearFieldErrors, nextStep, previousStep, setFieldError, updateCantidad, updateEstado, updateObservation } from "../../../../state/slices/openTurnSlice";

const useInfrastructureTurnHook = () => {
    const { dispositivos, seguridad, infraestructura, plates, observaciones, enganchados, baseCaja, isComplete, selectedPlates, manualPlates } = useSelector((state) => state.openTurn);
    const { numeroIdentificacion, terminalId, parqueaderoId } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { getDataFetch: lazyFetch } = useLazyFetch();
    const [loading, setLoading] = useState(false);
    const [turnoId, setTurnoId] = useState(null);
    const [observacionesInfra, setObservacionesInfra] = useState("");
    const dispositivosRef = useRef(null);
    const seguridadRef = useRef(null);
    const infraestructuraRef = useRef(null);


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
                showAlert("error", err)
            }
        })();
    }, [numeroIdentificacion]);

    /* ================= VALIDACIÓN ================= */

    const findInvalidIndex = (arr) =>
        arr.findIndex(i => i.cantidad === "" || i.estado === "");

    const validateFields = () => {

        const check = (category, ref, data, label) => {
            dispatch(clearFieldErrors({ category }));

            const index = findInvalidIndex(data);
            if (index !== -1) {

                if (data[index].cantidad === "") {
                    dispatch(setFieldError({
                        category,
                        index,
                        field: "cantidad",
                        value: true,
                    }));
                }

                if (data[index].estado === "") {
                    dispatch(setFieldError({
                        category,
                        index,
                        field: "estado",
                        value: true,
                    }));
                }

                showAlert("error", `Completa los campos en ${label}`);
                ref.current?.open();
                ref.current?.shake();
                return false;
            }
            return true;
        };

        return (
            check("dispositivos", dispositivosRef, dispositivos, "Dispositivos y Equipos") &&
            check("seguridad", seguridadRef, seguridad, "Elementos de Seguridad") &&
            check("infraestructura", infraestructuraRef, infraestructura, "Infraestructura")
        );
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
            showAlert("error", errorFetch.msg);
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
            showAlert("error", errorFetch.msg);
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

    const handleObservacionChangeInfra = (text) => {
        const hasLeadingSpaces = /^\s+/.test(text);
        const hasEmojis = /[\p{Extended_Pictographic}]/u.test(text);
        const hasInvalidChars = /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,;:()\- ]/.test(text);
        const maxLength = 250;

        let sanitizedValue = text
            .replace(/^\s+/, "")
            .replace(/[\p{Extended_Pictographic}]/gu, "")
            .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,;:()\- ]/g, "");

        if (hasLeadingSpaces) {
            showAlert("warning", "No se permiten espacios al inicio.");
        } else if (hasEmojis) {
            showAlert("warning", "No se permiten emojis en las observaciones.");
        } else if (hasInvalidChars) {
            showAlert("warning", "Se eliminaron caracteres no permitidos.");
        } else if (sanitizedValue.length > maxLength) {
            sanitizedValue = sanitizedValue.slice(0, maxLength);
            showAlert("warning", `Las observaciones no pueden exceder ${maxLength} caracteres.`);
        }

        setObservacionesInfra(sanitizedValue);
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
        observacionesInfra,
        dispositivosRef,
        seguridadRef,
        infraestructuraRef,
        handleCantidadChange: (c, i, v) =>
            dispatch(updateCantidad({ category: c, index: i, value: v })),
        handleEstadoChange: (c, i, v) =>
            dispatch(updateEstado({ category: c, index: i, value: v })),
        handleObservationChange: (c, i, v) =>
            dispatch(updateObservation({ category: c, index: i, value: v })),
        handleObservacionChangeInfra,
        handlePrevious: () => dispatch(previousStep()),
        handleNextStep,
    };
};

export default useInfrastructureTurnHook;
