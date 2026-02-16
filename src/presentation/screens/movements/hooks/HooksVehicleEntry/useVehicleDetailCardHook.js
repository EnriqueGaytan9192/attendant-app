import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFetch, useLazyFetch } from "../../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../../state/hooks";
import {
  nextStep,
  resetSteps,
  setReload,
  setSelectedVehicle,
  showLostTicketModal,
  showObjectsModal,
} from "../../../../../state/slices/movementsSlice";

const useVehicleDetailCardHook = () => {
  const dispatch = useDispatch();

  const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);
  const placaInventario = useSelector((state) => state.inventory.placaInventario);
  const { getDataFetch } = useLazyFetch();

  const [turnId, setTurnId] = useState(null);
  const [exitInfo, setExitInfo] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [ticketInfoExit, setTicketInfoExit] = useState(null);
  const [ticketInfoComplementary, setTicketInfoComplementary] = useState(null);
  const { cedulaBeParking } = useAppSelector((state) => state.auth);
  const { numeroIdentificacion, parqueaderoId, token } = useAppSelector((state) => state.auth);
  const [isConfirming, setIsConfirming] = useState(false);

  console.log("Selected Vehicle in Hook:", selectedVehicle);

  const EXEMPT_PRODUCTS = [
    "mensual",
    "pasadía",
    "pasadia",
    "reserva",
    "ruedaz",
    "cortesía",
    "cortesia",
    "vip",
    "parking pass",
    "gopass",
    "propietario",
    "autorizado",
  ];

  const isExemptProduct = (nombreProducto = "") => {
    const normalized = nombreProducto.toLowerCase();
    return EXEMPT_PRODUCTS.some(p => normalized.includes(p));
  };

  const handleNextStep = async () => {
    if (!selectedVehicle?.plate || !turnId) {
      Alert.alert("Error", "Información incompleta del vehículo.");
      return;
    }

    const exempt = isExemptProduct(selectedVehicle.nombreProducto);

    // 🔎 1️⃣ Validar tiquete perdido (SIEMPRE)
    const lostTicket = await hasLostTicket();

    // 🔴 PRODUCTO EXENTO + TIQUETE PERDIDO
    if (exempt && lostTicket) {
      console.log("⚠️ Producto exento con tiquete perdido → iniciar pago");

      /*
        👉 NO salida automática
        👉 NO cobro de servicio
        👉 SOLO cobro de tiquete perdido
      */

      dispatch(nextStep());
      setTimeout(() => dispatch(nextStep()), 600);

      return;
    }

    // 🟢 PRODUCTO EXENTO SIN TIQUETE PERDIDO → salida automática
    if (exempt) {
      try {
        const exitVehicle = await getDataFetch(
          `/api/vehiclesExit?plate=${selectedVehicle.plate}&turnId=${turnId}&entryVehicleId=${selectedVehicle.vehicleId}`,
          "GET"
        );

        if (exitVehicle?.errorFetch) {
          throw new Error("Error al obtener salida de vehículo");
        }

        const resumeRes = await getDataFetch(
          `/api/vehiclesExit/resume?plate=${selectedVehicle.plate}&turnId=${turnId}&entryVehicleId=${selectedVehicle.vehicleId}`,
          "GET"
        );

        if (resumeRes?.errorFetch) {
          throw new Error("Error al obtener resumen");
        }

        const resume = resumeRes.data.vehicleData;
        const cupon = resumeRes.data.cuponesProductos?.[0];

        const payload = {
          plate: resume.placa ?? "",
          id_park: String(resume.parqueaderoId ?? ""),
          terminal_id: String(resume.terminalId ?? ""),
          qr_code: String(resume.codigoQr ?? ""),
          turn_id: String(resume.turnoId ?? ""),
          type_product: String(resume.tipoProducto ?? "0"),

          electronicInvoice: "0",
          customer_invoice: "0",

          date_init: resume.fechaHoraInicial ?? "",
          date_finish: resume.fechaHoraFinal ?? "",
          time_total: String(resume.tiempoTotal ?? "0"),

          service_value: resume.valorServicio ?? 0,
          iva: cupon ? 0 : resume.valorIva ?? 0,
          base: cupon ? 0 : resume.valorBase ?? 0,
          total: cupon ? 0 : resume.valorTotal ?? 0,

          BeParking_bono: resume.bonoBeParking ?? 0,
          BeParking_code: resume.codigoBeParking ?? 0,

          validation_discount: resume.descuentoValidaciones ?? 0,
          lost_ticket: resume.tiquetePerdido ?? 0,

          vehicle_type: String(resume.tipoVehiculo ?? "1"),
          payment_method: 7,
          status: "0",
          cash: 0,

          voucherNumber: "0",
          voucherValue: 0,

          bonusCoupon: cupon?.id ?? 0,
          importCoupon: cupon?.importeDescuento ?? 0,

          cedulaClientBeParking: "0",
        };

        await getDataFetch("/api/transaction", "POST", { rq: payload });

        Alert.alert("Salida registrada", "El vehículo fue procesado correctamente.");

        dispatch(resetSteps());
        dispatch(setReload({ name: "list", value: true }));
        return;

      } catch (error) {
        console.error("❌ Flujo exento:", error);
        Alert.alert("Error", "No se pudo procesar la salida.");
        return;
      }
    }

    // 🟢 FLUJO NORMAL (vehículos sin producto)
    dispatch(nextStep());
  };



  const hasLostTicket = async () => {
    if (!selectedVehicle?.vehicleId) return false;

    const url = `/api/tiquete-perdido?page=1&limit=10&entradaVehiculoId=${selectedVehicle.vehicleId}`;
    console.log("🔍 Validando tiquete perdido:", url);

    try {
      const res = await getDataFetch(url, "GET");

      console.log("🧾 Respuesta tiquete perdido:", res);

      if (res?.errorFetch) {
        console.warn("⚠️ Error consultando tiquete perdido");
        // 🔴 IMPORTANTE: si falla, no permitir salida automática
        return true;
      }

      const lostList = res?.data?.data;

      const hasLost =
        Array.isArray(lostList) && lostList.length > 0;


      console.log("🧾 ¿Tiene tiquete perdido?", hasLost);

      return hasLost;
    } catch (err) {
      console.error("❌ Error en hasLostTicket:", err);
      // 🔴 Por seguridad del negocio
      return true;
    }
  };



  const turnRequestOptions = useMemo(() => ({
    rq: {
      id: numeroIdentificacion || '',
      parqueaderoId: parqueaderoId,
    },
    onComplete: async (turnResponse) => {
      const { turn } = turnResponse;
      if (turn?.turnoId) {
        setTurnId(turn.turnoId);
      }
    },
    onError: (errorFetch) => {
      console.log("❌ Error al obtener el turno:", errorFetch);
    },
  }), [numeroIdentificacion, parqueaderoId]);

  useFetch(`/api/turn`, 'POST', turnRequestOptions);

  const lostTicketModal = () => dispatch(showLostTicketModal(true));
  const objectsModal = () => dispatch(showObjectsModal(true));



  const getTiempoGracia = async (parqueaderoId, token) => {
    try {
      const response = await fetch(
        `https://inside-back-dev.parking.net.co/parkingLot/${parqueaderoId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();
      console.log("📦 Respuesta parkingLot:", text);

      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message || `Error HTTP ${response.status} obteniendo tiempo de gracia`
        );
      }

      return data?.tiempoGracia ?? null;
    } catch (err) {
      console.error("❌ Error getTiempoGracia:", err);
      return null;
    }
  };

  const calcularMinutosExcedidos = (entryAt, now, tiempoGracia) => {
    const entrada = new Date(entryAt);
    const salida = new Date(now);

    const diffMs = salida - entrada;

    // 👈 usa CEIL para no perder minutos parciales
    const diffMin = Math.ceil(diffMs / 60000);

    const excedidos = diffMin - tiempoGracia;
    return excedidos > 0 ? excedidos : 0;
  };

  const validarTiempoGracia = async ({
    parqueaderoId,
    placa,
    fechaHoraPago,
    fechaHoraSalida,
    minutosExcedidos,
  }) => {
    try {
      const body = {
        parqueaderoId,
        placa,
        fechaHoraPago,
        fechaHoraSalida,
        minutosExcedidos,
      };

      console.log("⏱️ Enviando control tiempo gracia:", body);

      const res = await getDataFetch(
        "/api/control-tiempo-gracia",
        "POST",
        { rq: body }
      );

      if (res?.errorFetch) {
        console.warn("⚠️ Error control tiempo gracia");
        return false;
      }

      return true;
    } catch (err) {
      console.error("❌ Error controlTiempoGracia:", err);
      return false;
    }
  };

  const confirmVehicleExit = async () => {
    if (!selectedVehicle) {
      Alert.alert("Error", "No se ha seleccionado un vehículo.");
      return;
    }

    // 🔒 Evita múltiples ejecuciones
    if (isConfirming) return;

    setIsConfirming(true);

    try {
      if (selectedVehicle.stateTransaction === 2) {
        const tiempoGracia = await getTiempoGracia(parqueaderoId, token);

        if (tiempoGracia !== null) {
          const now = new Date().toISOString();

          const minutosExcedidos = calcularMinutosExcedidos(
            selectedVehicle.exitAt,
            now,
            tiempoGracia
          );

          console.log("⏱ Minutos excedidos:", minutosExcedidos);

          if (minutosExcedidos > 0) {
            await validarTiempoGracia({
              parqueaderoId,
              placa: selectedVehicle.plate,
              fechaHoraPago: selectedVehicle.exitAt, // referencia contable
              fechaHoraSalida: now,                  // momento real
              minutosExcedidos,
            });
          }
        }
      }

      // Confirmar salida
      const body = {
        turnoId: turnId,
        plate: selectedVehicle.plate,
        entryVehicleId: selectedVehicle.vehicleId,
      };

      const res = await getDataFetch(
        "/api/getInformationEntry",
        "PUT",
        { rq: body }
      );

      if (res?.errorFetch) {
        throw new Error(res.errorFetch.message);
      }

      Alert.alert("Salida registrada exitosamente.");
      dispatch(resetSteps());

    } catch (err) {
      console.error("❌ Error confirmVehicleExit:", err);
      Alert.alert("Error", "No se pudo confirmar la salida del vehículo.");
    } finally {
      // 🔓 Vuelve a habilitar el botón pase lo que pase
      setIsConfirming(false);
    }
  };



  {/*const confirmVehicleExit = () => {
    if (!selectedVehicle) {
      console.error("No se ha seleccionado un vehículo.");
      Alert.alert("Error", "No se ha seleccionado un vehículo.");
      return;
    }

    const body = {
      turnoId: turnId,
      plate: selectedVehicle.plate,
      entryVehicleId: selectedVehicle.vehicleId,
    };

    console.log("Cuerpo de la solicitud para confirmar salida:", body);

    getDataFetch("/api/getInformationEntry", "PUT", { rq: body })
      .then((res) => {
        if (res.errorFetch) {
          throw new Error(res.errorFetch.message || "Error al obtener la información de entrada.");
        }
        console.log("Placa del vehículo:", selectedVehicle.plate);
        console.log("Placa del inventario:", placaInventario);
        if (placaInventario === selectedVehicle.plate) {
          dispatch(resetAuth());
        }
        Alert.alert("Salida registrada exitosamente.");
        dispatch(resetSteps());
      })
      .catch((err) => {
        console.error("Error en confirmVehicleExit:", err);
        Alert.alert("Error", "No se pudo obtener la información de entrada.");
      });
  };*/}


  const infoTicketExitError = async () => {
    if (!selectedVehicle) {
      console.error("No se ha seleccionado un vehículo.");
      return null;
    }

    const url = `/api/vehiclesExit/resume?plate=${selectedVehicle.plate}&turnId=${turnId}&entryVehicleId=${selectedVehicle?.vehicleId}`;
    console.log("URL para obtener información de salida:", url);
    const url2 = `/api/general-data?parqueaderoId=${parqueaderoId}&numIdentify=${numeroIdentificacion}&plate=${selectedVehicle.plate}&turnId=${turnId}`;
    console.log("URL para obtener información de salida:", url2);
    try {
      const res = await getDataFetch(url, "GET");
      const res2 = await getDataFetch(url2, "GET");
      if (res.errorFetch) {
        throw new Error(res.errorFetch.message || "Error al obtener la información de salida.");
      }
      if (res2.errorFetch) {
        throw new Error(res.errorFetch.message || "Error al obtener la información de salida.");
      }
      setExitInfo(res);
      setTicketInfoComplementary(res2);
      dispatch(setReload({ name: 'list', value: true }));
      return res;
    } catch (err) {
      console.error("Error en infoTicketExit:", err);
      Alert.alert("Error", "No se pudo obtener la información de salida.");
      return null;
    }

  };

  const infoTicketEntry = async () => {
    if (!selectedVehicle) {
      console.error("No se ha seleccionado un vehículo.");
      return null;
    }

    const url = `/api/ticket/${selectedVehicle.plate}/turn/${turnId}`;
    console.log("URL para obtener información de ticket:", url);

    try {
      const res = await getDataFetch(url, "GET");
      if (res.errorFetch) {
        throw new Error(res.errorFetch.message || "Error al obtener la información del ticket.");
      }
      setTicketInfo(res);
      dispatch(setReload({ name: 'list', value: true }));
      return res;
    } catch (err) {
      console.error("Error en infoTicketEntry:", err);
      Alert.alert("Error", "No se pudo obtener la información de entrada.");
      return null;
    }
  };

  const getVigenciaFin = async (plate, turnId) => {
    const url = `/api/vehiclesExit/resume?plate=${plate}&turnId=${turnId}&entryVehicleId=${selectedVehicle?.vehicleId}`;
    console.log("🔍 Consultando vigencia en:", url);

    try {
      const res = await getDataFetch(url, "GET");
      console.log("🔍 Respuesta de API vigencia:", res);

      if (res?.errorFetch) {
        console.warn("⚠️ Error de fetch en vigencia:", res.errorFetch);
        return null;
      }

      // ✅ Ajuste aquí: acceder al arreglo dentro de res.data
      const cupon = res?.data?.cuponesProductos?.[0];
      if (!cupon || !cupon.vigenciaFin) {
        console.warn("⚠️ No se encontró vigenciaFin en la respuesta.");
        return null;
      }

      console.log("✅ VigenciaFin encontrada:", cupon.vigenciaFin);
      return cupon.vigenciaFin;
    } catch (err) {
      console.error("❌ Error en getVigenciaFin:", err);
      return null;
    }
  };




  const infoTicketExit = async () => {
    if (!selectedVehicle) {
      console.error("No se ha seleccionado un vehículo.");
      return null;
    }
    console.log("beparkimg", cedulaBeParking)
    const url = `/api/vehiclesExit/resume?plate=${selectedVehicle.plate}&turnId=${turnId}&entryVehicleId=${selectedVehicle?.vehicleId}&numIdentify=0` //${cedulaBeParking}
    console.log("URL para obtener información de ticket", url);

    try {
      const res = await getDataFetch(url, "GET");
      if (res.errorFetch) {
        throw new Error(res.errorFetch.message || "Error al obtener la información del ticket.");
      }
      console.log("Data recibida:", res.data)
      const data = res.data;
      const transformed = {
        vehicleData: data.vehicleData,
        factura: data.factura,
        beParking: data.beParking,
        facturaElectronica: data.facturaElectronica,
        operador: data.operador,
        productos: data.cuponesProductos
      };

      setTicketInfoExit(transformed);
      dispatch(setReload({ name: 'list', value: true }));
      return transformed;
    } catch (err) {
      console.error("Error en infoTicketExit: ", err);
      Alert.alert("Error", 'No se pudo obtener la información de salida.');
      return null;
    }
  }

  const actualizarEstadoTicket = async () => {
    if (!selectedVehicle) {
      console.error("No se ha seleccionado un vehículo.");
      return null;
    }
    const url = `/api/ticket/update-ticket/status?codigoQr=${selectedVehicle.codeQR}`;
    console.log("URL para actualizar estado de ticket:", url);
    try {
      const res = await getDataFetch(url, "GET");
      if (res.errorFetch) {
        throw new Error(res.errorFetch.message || "Error al actualizar estado del ticket.");
      }
      dispatch(setSelectedVehicle({
        ...selectedVehicle,
        estadoTicket: 2
      }));
      return res;
    } catch (err) {
      console.error("Error en actualizarTicket:", err);
      //Alert.alert("Error", "No se pudo actualizar la información de ticket.");
      return null;
    }

  }

  return {
    handleNextStep,
    lostTicketModal,
    objectsModal,
    confirmVehicleExit,
    exitInfo,
    ticketInfo,
    ticketInfoExit,
    infoTicketExit,
    infoTicketEntry,
    actualizarEstadoTicket,
    ticketInfoComplementary,
    getVigenciaFin,
    turnId,
    isConfirming
  };
};

export default useVehicleDetailCardHook;
