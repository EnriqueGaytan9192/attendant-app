import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useLazyFetch } from "../../../../common/hook/useFetch";

const useWelcomeTurnHook = () => {
    const { numeroIdentificacion, parqueaderoId, terminalId } = useSelector(
        (state) => state.auth
    );

    const { getDataFetch } = useLazyFetch();

    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);

    const mountedRef = useRef(true);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (!numeroIdentificacion) return;

        const fetchTurnInfo = async () => {
            setLoading(true);

            try {
                /* 1️⃣ Crear / obtener turno */
                const turnRes = await getDataFetch("/api/turn", "POST", {
                    rq: { id: numeroIdentificacion, parqueaderoId },
                });

                const turnoId = turnRes.data?.turn?.turnoId;
                if (!turnoId) {
                    showAlert("error", "No se pudo obtener el turno");
                    return;
                }

                /* 2️⃣ Obtener detalle del turno */
                const detRes = await getDataFetch(
                    `/api/parkingLotTurnDet?turn_id=${turnoId}&parqueaderoId=${parqueaderoId}&terminalId=${terminalId}`,
                    "GET",
                    {}
                );

                const nombreAPI = detRes.data?.turn?.name;

                if (mountedRef.current && nombreAPI) {
                    setNombre(nombreAPI);
                }
            } catch (error) {
                console.error("Error al cargar datos del turno:", error);
                showAlert("error", "Ocurrió un error al cargar el turno");
            } finally {
                mountedRef.current && setLoading(false);
            }
        };

        fetchTurnInfo();
    }, [numeroIdentificacion, parqueaderoId, terminalId]);

    return {
        nombre,
        loading,
    };
};

export default useWelcomeTurnHook;
