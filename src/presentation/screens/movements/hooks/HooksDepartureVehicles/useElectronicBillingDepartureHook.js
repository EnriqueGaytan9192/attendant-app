import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFetch, useLazyFetch } from "../../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../../state/hooks";
import { previousStep, resetSteps, setElectronicInvoiceNit, showElectronicInvoiceModal } from "../../../../../state/slices/movementsSlice";

const useElectronicBillingDepartureHook = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [nitCedula, setNitCedula] = useState("");
  const [cashInput, setCashInput] = useState("");
  const [voucherInput, setVoucherInput] = useState("");

  const [cashMixtoInput, setCashMixtoInput] = useState("");
  const [voucherMixtoInput, setVoucherMixtoInput] = useState("");
  const [mixtoDatafonoInput, setMixtoDatafonoInput] = useState("");

  const [selectedPayment, setSelectedPayment] = useState('efectivo');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showError, setShowError] = useState(false);
  const { getDataFetch } = useLazyFetch();
  const [resumeData, setResumeData] = useState(null);
  const [cupones, setCupones] = useState(null);
  const [turnId, setTurnId] = useState(null);
  const { numeroIdentificacion, parqueaderoId, terminalId, cedulaBeParking, token } = useAppSelector((state) => state.auth);
  const [hasFetchedResumeData, setHasFetchedResumeData] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);
  const vehicleExitData = useSelector((state) => state.movements.vehicleExitData);
  const billingSummary = useSelector((state) => state.movements.billingSummary);
  const allianceData = billingSummary.appliedAlliance;
  const router = useRouter()

  const turnRequestOptions = useMemo(() => ({
    rq: {
      id: numeroIdentificacion || '',
      parqueaderoId: parqueaderoId
    },
    onComplete: async (turnResponse) => {
      await conCompleteCallBack(turnResponse);
    },
    onError: (errorFetch) => {
      console.log("❌ Error al obtener el turno:", errorFetch);
    }
  }), [numeroIdentificacion, parqueaderoId]);

  useFetch(`/api/turn`, 'POST', turnRequestOptions);

  const conCompleteCallBack = async (turnResponse) => {
    // Suponiendo que la respuesta tiene la propiedad "turn" con el id
    const { turn } = turnResponse;
    // Almacenamos el id del turno
    if (turn && turn.turnoId) {
      setTurnId(turn.turnoId);
    }
  };

  const handleInputChange = (text) => {
    const clean = text
      .replace(/\s/g, '')
      .replace(/[^\d-]/g, '');
    setNitCedula(clean);
  };

  const validateNitOrCC = (input) => {
    if (!input || input.trim() === '') return false;

    const isNIT = /^[1-9][0-9]{8}-[0-9]$/.test(input); // NIT: 9 dígitos + '-' + 1 dígito
    const isCC = /^[1-9][0-9]{5,9}$/.test(input); // CC: 6 a 10 dígitos, no inicia en 0

    return isNIT || isCC;
  };

  const handleCashInputChange = (value) => {
    setCashInput(value);
  };

  const handleVoucherInputChange = (value) => {
    setVoucherInput(value);
  };

  const handleSearch = () => {
    if (!validateNitOrCC(nitCedula)) {
      Alert.alert(
        'Validación de documento',
        'El número de documento ingresado no es válido. Asegúrate de que tenga al menos 6 dígitos y no sea una secuencia inválida como "000000".'
      );
      setIsAuthorized(false); // 🔴 importante: marcar como no autorizado
      return;
    }

    fetchInvoiceAccumulation()
      .then((res) => {
        if (res && res.data.invoice) {
          setUserInfo({
            number: nitCedula,
            name: res.data.invoice.razonSocial
          });
          setIsAuthorized(true); // ✅ documento validado
        } else {
          setUserInfo(null);
          dispatch(setElectronicInvoiceNit(nitCedula));
          dispatch(showElectronicInvoiceModal(true));
          setIsAuthorized(true); // ✅ igual marcamos como validado (abrirá modal para crear factura)
        }
      })
      .catch(() => {
        setUserInfo(null);
        dispatch(setElectronicInvoiceNit(nitCedula));
        dispatch(showElectronicInvoiceModal(true));
        setIsAuthorized(true); // ✅ también validado aunque no exista
      });
  };


  const handlePaymentChange = (paymentType) => {
    setSelectedPayment(paymentType === selectedPayment ? null : paymentType);
  };


  const handleCashMixtoInputChange = (value) => {
    setCashMixtoInput(value);
  };
  const handleVoucherMixtoInputChange = (value) => {
    setVoucherMixtoInput(value)
  };
  const handleMixtoDatafonoInputChange = (value) => {
    if (value > resumeData?.valorTotal) {
      Alert.alert("Alerta", "El valor ingresado en datáfono no puede ser mayor al total a pagar.");
      return;
    }
    setMixtoDatafonoInput(value);
  };


  const fetchResumeData = useCallback((plate) => {
    if (plate && turnId) {
      // Evitamos llamadas repetidas
      setHasFetchedResumeData(true);
      const url = `/api/vehiclesExit/resume?plate=${plate}&turnId=${turnId}&entryVehicleId=${selectedVehicle?.vehicleId}`;
      getDataFetch(url, "GET", {})
        .then((res) => {
          if (res) {
            console.log("Fetched resume data:", res);
            console.log("cupones:", res.data.cuponesProductos);
            setResumeData(res.data.vehicleData);
            setCupones(res.data.cuponesProductos);

          }
        })
        .catch((error) => {
          console.error("Error fetching resume data:", error);
          // Opcional: Si deseas permitir reintentos, podrías resetear la bandera aquí:
          // setHasFetchedResumeData(false);
        });
    }
  }, [turnId, getDataFetch]);

  const fetchInvoiceAccumulation = useCallback(() => {
    const url = `/api/invoiceAccumulation/${nitCedula}/${parqueaderoId}/turnId/${turnId}/entryVehicleId/${selectedVehicle?.vehicleId}`;
    console.log("Fetching invoice accumulation from:", url);
    return getDataFetch(url, "GET", {})
      .then((res) => {
        console.log("Response from invoice accumulation:", res);
        if (res && res.invoice) {
          console.log("Fetched invoice accumulation data:", res);
          setInvoiceData(res.invoice);
        }
        return res;
      })
      .catch((error) => {
        console.error("Error fetching invoice accumulation:", error);
        throw error;
      });
  }, [nitCedula, parqueaderoId, getDataFetch]);

  const savePayment = async (skipValidation = false, valueToPay) => {
    const totalToPay = resumeData?.valorTotal ?? valueToPay;
    // 1) Validaciones de campos obligatorios
    if (!skipValidation && totalToPay > 0) {
      if (selectedPayment === "efectivo" && !cashInput) {
        Alert.alert("Alerta", "Por favor, ingrese el monto en efectivo.");
        return;
      }
      if (selectedPayment === "datafono" && !voucherInput) {
        Alert.alert("Alerta", "Por favor, ingrese el número de comprobante.");
        return;
      }
      if (selectedPayment === "mixto") {
        const efectivo = parseFloat(cashMixtoInput) || 0;
        const datafono = parseFloat(mixtoDatafonoInput) || 0;
        if (!cashMixtoInput && !mixtoDatafonoInput) {
          Alert.alert("Alerta", "Por favor, ingrese al menos un valor en efectivo o en datáfono.");
          return;
        }
        if (!voucherMixtoInput) {
          Alert.alert("Alerta", "Por favor, ingrese el número de comprobante para el pago con datáfono.");
          return;
        }
        if (efectivo + datafono < totalToPay) {
          Alert.alert("Alerta", "La suma del efectivo y el datáfono no cubre el total a pagar.");
          return;
        }
      }
      if (
        billingSummary.discountAllianceBank > 0 &&
        selectedPayment !== "datafono"
      ) {
        Alert.alert(
          "Alerta",
          "Cuando se aplica una alianza bancaria el pago debe realizarse únicamente con datáfono."
        );
        return;
      }

    }
    // 2) Determinar montos a enviar (cash y voucherValue)
    let cashToSend = 0;
    let voucherNumToSend = "";
    let voucherValToSend = 0;
    if (selectedPayment === "efectivo") {
      cashToSend = parseFloat(cashInput) || 0;
    } else if (selectedPayment === "datafono") {
      voucherNumToSend = voucherInput || "";
      voucherValToSend = totalToPay;
    } else if (selectedPayment === "mixto") {
      cashToSend = parseFloat(cashMixtoInput) || 0;
      voucherNumToSend = voucherMixtoInput || "";
      voucherValToSend = parseFloat(mixtoDatafonoInput) || 0;
    }
    // Si hay bono BeParking o es free (skipValidation) para pagos no mixtos
    if ((billingSummary?.discountBonos > 0 || skipValidation) && selectedPayment !== "mixto") {
      //voucherValToSend = billingSummary?.discountBonos || totalToPay;
    }
    // 3) Mapear método de pago
    const paymentMethodMap = { efectivo: "1", datafono: "2", mixto: "5", cupones: "7" };
    const paymentMethod = (/*billingSummary?.discountBonos > 0 || */skipValidation)
      ? 6
      : paymentMethodMap[selectedPayment] || 0;
    // 4) Construir payload
    console.log("vehicleExitData?.plate", vehicleExitData?.plate)
    console.log("parqueaderoId?.toString()", parqueaderoId?.toString())
    console.log("terminalId?.toString(", terminalId?.toString())
    console.log("selectedVehicle?.codeQR", selectedVehicle?.codeQR)
    console.log("turnId?.toString()", turnId?.toString())
    console.log("vehicleExitData?.typeProduct?.toString()", vehicleExitData?.typeProduct?.toString())

    /*const payload = {
      plate: vehicleExitData?.plate || "",
      id_park: parqueaderoId?.toString() || "",
      terminal_id: terminalId?.toString() || "",
      qr_code: selectedVehicle?.codeQR || "",
      turn_id: turnId?.toString() || "",
      type_product: vehicleExitData?.typeProduct?.toString() || "",
      electronicInvoice: nitCedula || "0",
      date_init: vehicleExitData?.entryAt || "",
      date_finish: vehicleExitData?.exitAt || "",
      time_total: resumeData?.tiempoTotal?.toString() || "",
      service_value: vehicleExitData?.serviceValue || 0,
      BeParking_bono: resumeData?.bonoBeParking || 0,
      BeParking_code: 0,
      validation_discount: 0,
      lost_ticket: resumeData?.tiquetePerdido || 0,
      iva: resumeData?.valorIva || 0,
      base: resumeData?.valorBase || 0,
      total: resumeData?.valorTotal || 0,
      customer_invoice: nitCedula || "0",
      status: "0",
      payment_method: paymentMethod,
      vehicle_type: vehicleExitData?.typeVehicle?.toString() || "",
      cash: cashToSend,
      //voucherNumber: Number(voucherNumToSend) || 0,
      voucherNumber: voucherNumToSend?.toString() || "0",
      voucherValue: voucherValToSend,
      cedulaClientBeParking: cedulaBeParking || "0",
      bonusCoupon: cupones?.[0]?.id || 0,
      importCoupon: cupones?.[0]?.importeDescuento || 0,
    };*/

    const importCoupon = Number(cupones?.[0]?.importeDescuento) || 0;
    const aplicaCupon = importCoupon > 0;

    const isOnlyLostTicketPayment =
      resumeData?.tiquetePerdido > 0 &&
      vehicleExitData?.serviceValue === 0;

    const lostTicketValue = Number(resumeData?.tiquetePerdido) || 0;

    const totalFinal = isOnlyLostTicketPayment
      ? lostTicketValue
      : (resumeData?.valorTotal || 0);

    const ivaFinal = isOnlyLostTicketPayment
      ? 0
      : aplicaCupon
        ? 0
        : (resumeData?.valorIva || 0);

    const baseFinal = isOnlyLostTicketPayment
      ? 0
      : aplicaCupon
        ? 0
        : (resumeData?.valorBase || 0);


    /*const payload = {
      plate: vehicleExitData?.plate || "",
      id_park: parqueaderoId?.toString() || "",
      terminal_id: terminalId?.toString() || "",
      qr_code: selectedVehicle?.codeQR || "",
      turn_id: turnId?.toString() || "",
      type_product: vehicleExitData?.typeProduct?.toString() || "",
      electronicInvoice: nitCedula || "0",
      date_init: vehicleExitData?.entryAt || "",
      date_finish: vehicleExitData?.exitAt || "",
      time_total: resumeData?.tiempoTotal?.toString() || "",
      service_value: vehicleExitData?.serviceValue || 0,
      BeParking_bono: resumeData?.bonoBeParking || 0,
      BeParking_code: 0,
      validation_discount: 0,
      lost_ticket: resumeData?.tiquetePerdido || 0,
      iva: aplicaCupon ? 0 : (resumeData?.valorIva || 0),
      base: aplicaCupon ? 0 : (resumeData?.valorBase || 0),
      total: aplicaCupon ? 0 : (resumeData?.valorTotal || 0),
      customer_invoice: nitCedula || "0",
      status: "0",
      payment_method: paymentMethod,
      vehicle_type: vehicleExitData?.typeVehicle?.toString() || "",
      cash: cashToSend,
      voucherNumber: voucherNumToSend?.toString() || "0",
      voucherValue: voucherValToSend,
      cedulaClientBeParking: cedulaBeParking || "0",
      bonusCoupon: cupones?.[0]?.id || 0,
      importCoupon: importCoupon,
    };*/

    const payload = {
      plate: vehicleExitData?.plate || "",
      id_park: parqueaderoId?.toString() || "",
      terminal_id: terminalId?.toString() || "",
      qr_code: selectedVehicle?.codeQR || "",
      turn_id: turnId?.toString() || "",
      type_product: vehicleExitData?.typeProduct?.toString() || "",
      electronicInvoice: nitCedula || "0",
      date_init: vehicleExitData?.entryAt || "",
      date_finish: vehicleExitData?.exitAt || "",
      time_total: resumeData?.tiempoTotal?.toString() || "",

      service_value: isOnlyLostTicketPayment
        ? 0
        : (vehicleExitData?.serviceValue || 0),

      BeParking_bono: resumeData?.bonoBeParking || 0,
      BeParking_code: 0,
      validation_discount: 0,

      lost_ticket: lostTicketValue,

      iva: ivaFinal,
      base: baseFinal,
      total: totalFinal,

      customer_invoice: nitCedula || "0",
      status: "0",
      payment_method: paymentMethod,
      vehicle_type: vehicleExitData?.typeVehicle?.toString() || "",
      cash: cashToSend,
      voucherNumber: voucherNumToSend?.toString() || "0",
      voucherValue: voucherValToSend,
      cedulaClientBeParking: cedulaBeParking || "0",
      bonusCoupon: cupones?.[0]?.id || 0,
      importCoupon: importCoupon,
    };

    console.log("Saving payment with payload:", payload);

    // 5) Enviar al backend
    try {
      const res = await getDataFetch("/api/transaction", "POST", { rq: payload });
      if (res.errorFetch) throw new Error(res.errorFetch.message);

      console.log("RESPUESTA /api/transaction COMPLETA:", res);

      const transactionId =
        res?.data?.data?.transaccionId ||
        res?.data?.transactionId ||
        res?.data?.id ||
        res?.transactionId ||
        res?.id;

      if (!transactionId) {
        console.error("Respuesta completa recibida:", res);
        throw new Error("No se pudo obtener el ID de la transacción");
      }

      console.log("Transacción creada: ", transactionId);
      console.log("discountAllianceBank:", billingSummary.discountAllianceBank);
      console.log("allianceData:", allianceData);
      console.log("transactionId:", transactionId);

      if (
        billingSummary?.discountAllianceBank > 0 &&
        allianceData?.alianzaId &&
        allianceData?.alianzaBinId
      ) {
        await registerAllianceBinUsage({
          alianzaId: allianceData.alianzaId,
          alianzaBinId: allianceData.alianzaBinId,
          transactionId: String(transactionId),
          montoDescuento: billingSummary.discountAllianceBank
        })
      }

      Alert.alert("Éxito", "Pago realizado correctamente.", [
        {
          text: "OK",
          onPress: () => {
            dispatch(resetSteps());
            router.replace("/movements");
          }
        }
      ]);
    } catch (err) {
      console.error("Error al guardar el pago:", err);
      Alert.alert("Error", "Hubo un problema al procesar el pago.");
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

  const deleteAllianceBank = async () => {
    const entradaVehiculoId = vehicleExitData?.vehicleId;

    if (!entradaVehiculoId) {
      console.warn("No se encontro entradaVehicleId para eliminar alianza bancaria.");
      return;
    }

    try {
      console.log(`Eliminando alianza bancaria con entradaVehicleId: ${entradaVehiculoId}`);

      const url = `/api/ms-alianza-bancos/${entradaVehiculoId}`;
      const { data, errorFetch } = await getDataFetch(url, "DELETE", {});

      if (errorFetch) {
        console.error("Error al eliminar alianza bancaria:", errorFetch);
      } else {
        console.log("Alianza bancaria eliminada correctamente:", data);
      }
    } catch (error) {
      console.error("Error inesperado al eliminar alianza bancaria:", error);
    }
  }

  const handlePrevious = async () => {
    if (vehicleExitData?.nombreProducto !== 'Horas') {
      dispatch(previousStep());
      dispatch(previousStep());
      dispatch(previousStep());
    }
    //dispatch(previousStep());
    await deleteValidation();
    await deleteAllianceBank();

    dispatch(previousStep());
  }

  const registerAllianceBinUsage = async ({
    alianzaId,
    alianzaBinId,
    transactionId,
    montoDescuento,
  }) => {
    try {
      const payload = {
        alianzaId,
        alianzaBinId,
        transaccionId: String(transactionId),
        parqueaderoId: parqueaderoId,
        placa: vehicleExitData?.plate || "",
        valorTransaccion: billingSummary?.serviceValue || resumeData?.valorTotal || 0,
        montoDescuento: montoDescuento,
      };

      console.log("Registrando uso de alianza bancaria:", payload);

      const res = await fetch(
        "https://inside-back-dev.parking.net.co/alliance/bin-usage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      console.log("Uso de alianza bancaria registrado:", data);
    } catch (error) {
      console.error("Error registrando uso de alianza bancaria:", error);
    };
  }


  return {
    userInfo,
    nitCedula,
    cashInput,
    voucherInput,
    handleInputChange,
    handleCashInputChange,
    handleVoucherInputChange,
    handleSearch,
    selectedPayment,
    handlePaymentChange,
    isAuthorized,
    setIsAuthorized,
    showError,
    setShowError,
    resumeData,
    fetchResumeData,
    hasFetchedResumeData,
    turnId,
    invoiceData,
    fetchInvoiceAccumulation,
    savePayment,
    cupones,
    cashMixtoInput,
    voucherMixtoInput,
    mixtoDatafonoInput,
    handleCashMixtoInputChange,
    handleVoucherMixtoInputChange,
    handleMixtoDatafonoInputChange,
    handlePrevious,
    validateNitOrCC
  };
};

export default useElectronicBillingDepartureHook;
