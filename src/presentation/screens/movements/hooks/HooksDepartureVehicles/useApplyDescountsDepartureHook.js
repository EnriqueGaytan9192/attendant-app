import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLazyFetch } from "../../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../../state/hooks";
import { nextStep, previousStep, setSelectedTabDescounts } from "../../../../../state/slices/movementsSlice";

const useApplyDescountsDepartureHook = () => {

    const PRODUCT_TYPES = {
        BE_PARKING: 1,
        VALIDACIONES: 2,
        CODIGOS_VIRTUALES: 3,
    };

    const dispatch = useDispatch();
    const { getDataFetch } = useLazyFetch();
    const { selectedTabDescounts } = useSelector((state) => state.movements);
    const vehicleExitData = useSelector((state) => state.movements.vehicleExitData);
    const { parqueaderoId, token } = useAppSelector(state => state.auth);
    const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);
    const [banks, setBanks] = useState([]);
    const [loadingBanks, setLoadingBanks] = useState(false);
    const [errorBanks, setErrorBanks] = useState(null);
    const [bin, setBin] = useState("");
    const [cufe, setCufe] = useState(null);

    const handleNext = () => {
        dispatch(nextStep());
    }

    const handlePrevious = async () => {
        await deleteValidation();
        dispatch(previousStep());
    }

    const parseInvoiceQR = (qrData) => {
        if (!qrData) return null;

        const findValue = (patterns) => {
            for (const pattern of patterns) {
                const match = qrData.match(pattern);
                if (match) return match[1];
            }
            return null;
        }

        const nitFac = findValue([
            /NitFac=\s*([^\s]+)/,
            /NitFac:\s*([^\s]+)/
        ]);
        const valTolFac = findValue([
            /ValTolFac=\s*([^\s]+)/,
            /ValTolFac:\s*([^\s]+)/,
            /ValFacIm:\s*([^\s]+)/
        ]);
        const cufe = findValue([
            /CUFE=\s*([a-zA-Z0-9]+)/,
            /CUFE:\s*([a-zA-Z0-9]+)/
        ]);
        const fecFacRaw = findValue([
            /FecFac=\s*([0-9-]+)/,
            /FecFac:\s*([0-9-]+)/
        ]);

        let fecFac = null;
        let horFac = null;

        if (fecFacRaw) {
            const isoMatch = fecFacRaw.match(
                /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2}):(\d{2})(?:[-+]\d{2}:?\d{2})?$/
            );
            const compactMatch = fecFacRaw.match(
                /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(?:[-+]\d{4})?$/
            );
            const dateOnlyMatch = fecFacRaw.match(/^(\d{4})[-]?(\d{2})[-]?(\d{2})$/);

            if (isoMatch) {
                const [, y, m, d, hh, mm, ss] = isoMatch;
                fecFac = `${y}-${m}-${d}`;
                horFac = `${hh}:${mm}:${ss}`;
            } else if (compactMatch) {
                const [, y, m, d, hh, mm, ss] = compactMatch;
                fecFac = `${y}-${m}-${d}`;
                horFac = `${hh}:${mm}:${ss}`;
            } else if (dateOnlyMatch) {
                const [, y, m, d] = dateOnlyMatch;
                fecFac = `${y}-${m}-${d}`;
            } else {
                fecFac = fecFacRaw;
            }
        }

        const horFacRaw = findValue([
            /HorFac=\s*([0-9:+-]+)/,
            /HorFac:\s*([0-9:+-]+)/
        ]);

        if (horFacRaw) {
            horFac = horFacRaw.replace(/[-+][0-9:]+$/, "");
        }

        return {
            NitFac: nitFac,
            ValTolFac: valTolFac,
            CUFE: cufe,
            FecFac: fecFac,
            HorFac: horFac,
        };
    };

    const validateInvoiceQR = async (parsedData) => {
        try {
            const payload = {
                nit: parsedData.NitFac,
                monto: parseFloat(parsedData.ValTolFac),
                cufe: parsedData.CUFE,
                fecha: parsedData.FecFac,
                hora: parsedData.HorFac || "00:00:00",
                parqueaderoId,
                placa: String(selectedVehicle.plate || ""),
                vehiculoId: selectedVehicle.typeVehicle,
            };

            console.log("Payload de validación QR:", payload);

            const response = await fetch(
                "https://inside-back-dev.parking.net.co/validaciones/consultar-aplicables-factura-qr",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const text = await response.text(); // 👈 CLAVE
            console.log("Status HTTP:", response.status);
            console.log("Respuesta cruda backend:", text);

            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch {
                data = {};
            }

            if (!response.ok) {
                const error = new Error(
                    data.mensaje ||
                    data.message ||
                    `Error HTTP ${response.status} al validar la factura QR`
                );

                error.code = data.codigo || response.status;
                error.details = data.detalles || [];
                error.raw = text;
                throw error;
            }

            return data;
        } catch (error) {
            console.error("Fallo al enviar la validación:", error);
            throw error;
        }
    };


    const getAplicableValidations = async (qrValidationsResponse) => {
        try {
            const validationBonoList =
                qrValidationsResponse?.[0]?.validacionBono?.map((bono) => ({
                    validacionBonoId: bono.validacionBonoId,
                    validacionId: bono.validacionId,
                    tipoDescuentoId: bono.tipoDescuentoId,
                    valorDescuento: bono.valorDescuento,
                })) || [];

            const payload = {
                turnoId: vehicleExitData.turnoId,
                entradaVehiculoId: vehicleExitData.vehicleId,
                placa: selectedVehicle?.plate || "",
                validaciones: validationBonoList,
            };

            console.log("Payload para obtener validaciones aplicables:", payload);

            const { data, errorFetch } = await getDataFetch(
                "/api/validaciones/consultarAplicables",
                "POST",
                { rq: payload }
            );

            if (errorFetch) {
                console.error("Error en getAplicableValidations:", errorFetch);
                throw new Error("Error al obtener validaciones aplicables");
            }

            console.log("Respuesta consultarAplicables:", data);
            return data?.validaciones || [];
        } catch (error) {
            console.error("Error en getAplicableValidations:", error);
            throw error;
        }
    };

    const applySelectedValidations = async (selectedValidations, discountValidacion) => {
        try {
            const payload = {
                turnoId: vehicleExitData.turnoId,
                entradaVehiculoId: vehicleExitData.vehicleId,
                placa: selectedVehicle?.plate || "",
                estatus: 1,
                descuentoBonos: discountValidacion || 0,
                cufe: cufe,
                validaciones: selectedValidations.map((item) => ({
                    validacionBonoId: item.validacionBonoId,
                    validacionId: item.validacionId,
                    tipoDescuentoId: item.tipoDescuentoId,
                    valorDescuento: item.valorDescuento,
                    bonoValidacionImporte: item.bonoValidacionImporte,
                })),
            };

            console.log("Payload aplicar validaciones:", JSON.stringify(payload, null, 2));

            const { data, errorFetch } = await getDataFetch(
                "/api/mb-validaciones",
                "POST",
                { rq: payload }
            );

            if (errorFetch) {
                console.error("Error al aplicar validaciones:", errorFetch);
                throw new Error("Error al aplicar las validaciones");
            }

            console.log("Respuesta aplicar validaciones:", data);
            return data;
        } catch (error) {
            console.error("Error en applySelectedValidations:", error);
            throw error;
        }
    }

    const handleApplyAndNext = async (selectedValidations, discountValidacion) => {
        try {
            await applySelectedValidations(selectedValidations, discountValidacion);

            handleNext();

        } catch (error) {
            console.error("Error al aplicar validaciones:", error);
            Alert.alert("Error", error.message || "No se pudieron aplicar las validaciones");
        }
    };

    const deleteValidation = async () => {
        const entradaVehiculoId = vehicleExitData?.vehicleId;

        if (!entradaVehiculoId) {
            Alert.alert("Error", "No se encontró el ID del vehículo para eliminar la validacion.");
            return;
        }

        try {
            console.log(`Eliminando entrada de validaciones con ID: ${entradaVehiculoId}`);
            const url = `/api/ms-validaciones/entradaVehiculo/${entradaVehiculoId}`;
            const { data, errorFetch } = await getDataFetch(url, "DELETE", {});

            if (errorFetch) {
                console.error("Error al eliminar validaciones:", errorFetch);
            } else {
                console.log("Validacion eliminada exitosamente:", data);
            }
        } catch (error) {
            console.error("Error inesperado al eliminar Validaciones:", error);
        }
    };

    useEffect(() => {
        if (!parqueaderoId) return;

        const fetchAllianceBanks = async () => {
            setLoadingBanks(true);
            setErrorBanks(null);

            try {
                const response = await fetch(
                    `https://inside-back-dev.parking.net.co/alliance?searchText=&active=true&parqueaderoId=${parqueaderoId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.statusText}`);
                }

                const data = await response.json();

                console.log("Respuesta de la API alliance:", data);

                const filteredBanks =
                    data?.data
                        ?.filter((item) =>
                            Array.isArray(item.parqueaderoId) &&
                            item.parqueaderoId.includes(parqueaderoId)
                        )
                        .map((item) => ({
                            label: item.banco,
                            value: String(item.alianzaId),
                            raw: item,
                        })) || [];
                console.log("BANKS FILTRADOS POR PARQUEADERO:", filteredBanks);

                setBanks(filteredBanks);

                if (filteredBanks.length === 0) {
                    console.log("Este parqueadero no tiene alianzas bancarias activas");
                }


            } catch (error) {
                setErrorBanks(error);
            } finally {
                setLoadingBanks(false);
            }
        };

        fetchAllianceBanks();
    }, [parqueaderoId, token]);

    const validateAllianceBank = async ({ alianzaId, bin, placa }) => {
        try {
            if (!alianzaId) {
                const error = new Error("DEBE SELECCIONAR UNA ALIANZA");
                error.code = 400;
                throw error;
            }

            if (!bin || bin.length !== 6) {
                const error = new Error("EL BIN DEBE SER DE 6 NUMEROS");
                error.code = 400;
                throw error;
            }

            const url = `https://inside-back-dev.parking.net.co/alliance/applicable?alianzaId=${alianzaId}&bin=${bin}&placa=${placa}&parqueaderoId=${parqueaderoId}&montoTransaccion=${vehicleExitData.serviceValue}`;

            console.log("Url apliacar alianza: ", url)

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            console.log("Respuesta alianza bancaria:", data);

            if (!response.ok) {
                const error = new Error(data.mensaje || "Error al validar alianza bancaria");
                error.code = Number(data.codigo || response.status);
                error.details = data.detalles || [];
                throw error;
            }

            return data; // 👉 cuando es válida, viene array con alianza
        } catch (error) {
            throw error;
        }
    };

    const applyAllianceLogic = ({ alliances, serviceValue }) => {
        if (!Array.isArray(alliances) || alliances.length === 0) {
            throw new Error("EL BIN NO COINCIDE CON LA ALIANZA");
        }

        const alliance = alliances[0];
        const transactionValue = Number(serviceValue) || 0;

        if (transactionValue < alliance.montoMinimoTransaccion) {
            throw new Error("EL MONTO NO CUMPLE EL MÍNIMO PARA LA ALIANZA");
        }

        const now = new Date();
        if (
            now < new Date(alliance.fechaInicio) ||
            now > new Date(alliance.fechaFin)
        ) {
            throw new Error("LA ALIANZA YA NO ESTÁ VIGENTE");
        }

        if (alliance.usosRestantesPlaca <= 0) {
            throw new Error("ESTA PLACA HA LLEGADO A SU LÍMITE DE USO");
        }

        if (alliance.montoDisponibleBolsa <= 0) {
            throw new Error("LA ALIANZA NO TIENE BOLSA DISPONIBLE");
        }

        const percentage = Number(alliance.porcentajeDescuento) || 0;
        const percentageDiscount = transactionValue * (percentage / 100);

        const maxDiscount =
            Number(alliance.montoMaximoDescuento) > 0
                ? Number(alliance.montoMaximoDescuento)
                : Infinity;

        const discount = Math.min(
            percentageDiscount,
            maxDiscount,
            alliance.montoDisponibleBolsa
        );

        if (discount <= 0) {
            throw new Error("EL DESCUENTO RESULTANTE NO ES VÁLIDO");
        }

        return {
            discount: Number(discount.toFixed(2)),
            alliance,
        };
    };



    const applyAllianceBankDiscount = async ({ alianzaId, alianzaBinId, montoDescuento }) => {
        try {
            const payload = {
                alianzaId,
                alianzaBinId,
                entradaVehiculoId: vehicleExitData?.vehicleId,
                montoDescuento,
            };

            console.log("Payload aplicar alianza bancaria Att: ", payload);

            const { data, errorFetch } = await getDataFetch(
                "/api/ms-alianza-bancos",
                "POST",
                { rq: payload }
            );

            if (errorFetch) {
                console.error("Error al aplicar alianza bancaria: ", errorFetch);
                throw new Error("Error al aplicar alianza bancaria.");
            }

            console.log("Respuesta alianza bancaria: ", data);
            return data;
        } catch (error) {
            console.log("applyAllianceBankDiscount error: ", error);
            throw error;
        }
    };

    const getAllianceBankErrorMessage = (error) => {
        const detailsText = Array.isArray(error.details)
            ? error.details.join(" ").toLowerCase()
            : "";

        const messageText = (error.message || "").toLowerCase();

        // 🔴 400 – Errores de entrada
        if (error.code === 400) {
            if (messageText.includes("bin")) {
                return "EL BIN DEBE SER DE 6 NÚMEROS";
            }
            return "DATOS INVÁLIDOS";
        }

        // 🔴 404 – BIN no registrado
        if (error.code === 404) {
            if (
                detailsText.includes("no está registrado") ||
                messageText.includes("no registrado")
            ) {
                return "EL BIN NO COINCIDE CON LA ALIANZA";
            }
            return "ALIANZA NO ENCONTRADA";
        }

        // 🔴 422 – VALIDACIONES DE NEGOCIO
        if (error.code === 422) {
            if (
                detailsText.includes("finalizó") ||
                detailsText.includes("vigencia") ||
                messageText.includes("finalizado")
            ) {
                return "LA ALIANZA HA FINALIZADO";
            }

            if (
                detailsText.includes("no aplica en el parqueadero") ||
                messageText.includes("no aplica en este parqueadero")
            ) {
                return "LA ALIANZA NO APLICA EN ESTE PARQUEADERO";
            }

            if (
                detailsText.includes("monto mínimo") ||
                messageText.includes("menor al monto mínimo")
            ) {
                return "NO CUMPLE EL MONTO MÍNIMO PARA APLICAR LA ALIANZA";
            }

            if (
                detailsText.includes("bolsa de descuento") ||
                messageText.includes("Bolsa")
            ) {
                return "LA ALIANZA NO TIENE BOLSA DISPONIBLE";
            }

            if (
                detailsText.includes("habilitada para el día de hoy") ||
                messageText.includes("habilitada")
            ) {
                return "LA ALIANZA NO ESTÁ HABILITADA PARA HOY";
            }

            if (
                detailsText.includes("ninguna tarifa activa") ||
                messageText.includes("no tiene configurada ninguna")
            ) {
                return "LA ALIANZA NO TIENE TARIFAS ACTIVAS";
            }


            if (detailsText.includes("límite")) {
                return "ESTA PLACA HA LLEGADO A SU LÍMITE DE USO";
            }

            return "LA ALIANZA NO ES APLICABLE";
        }

        return error.message || "ERROR AL VALIDAR ALIANZA BANCARIA";
    };

    const getAppliedProducts = ({
        discountBonos,
        discountValidacion,
    }) => {
        const applied = [];

        if (discountBonos > 0) {
            applied.push(PRODUCT_TYPES.BE_PARKING);
        }

        if (discountValidacion > 0) {
            // Aquí entran Validaciones y Códigos Virtuales
            applied.push(PRODUCT_TYPES.VALIDACIONES);
            applied.push(PRODUCT_TYPES.CODIGOS_VIRTUALES);
        }

        return applied;
    };

    const canApplyAllianceBank = ({
        alliance,
        discountBonos = 0,
        discountValidacion = 0,
    }) => {
        if (!alliance) return false;

        const allowedProducts =
            alliance.productosAplicables?.map(p => p.productoId) ?? [];

        const appliedProducts = [];

        if (discountBonos > 0) {
            appliedProducts.push(PRODUCT_TYPES.BE_PARKING);
        }

        if (discountValidacion > 0) {
            appliedProducts.push(PRODUCT_TYPES.VALIDACIONES);
            appliedProducts.push(PRODUCT_TYPES.CODIGOS_VIRTUALES);
        }

        // 🔑 FIX CLAVE
        if (allowedProducts.length === 0) {
            return appliedProducts.length === 0;
        }

        return appliedProducts.every(productId =>
            allowedProducts.includes(productId)
        );
    };


    return {
        selectedTabDescounts,
        vehicleExitData,
        handleNext,
        handlePrevious,
        setSelectedTabDescounts: (tab) => dispatch(setSelectedTabDescounts(tab)),
        parseInvoiceQR,
        validateInvoiceQR,
        getAplicableValidations,
        handleApplyAndNext,
        getAllianceBankErrorMessage,
        banks,
        loadingBanks,
        errorBanks,
        bin,
        setBin,
        validateAllianceBank,
        applyAllianceLogic,
        applyAllianceBankDiscount,
        cufe,
        setCufe,
        canApplyAllianceBank,
    };

}

export default useApplyDescountsDepartureHook;