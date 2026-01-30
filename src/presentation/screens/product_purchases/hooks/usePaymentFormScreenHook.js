import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { setTurnoIdEntry } from "../../../../state/slices/movementsSlice";
import { backToList, setElectronicInvoiceNit, setSelectedTabProducts, showElectronicInvoiceModal } from "../../../../state/slices/productPurchasesSlice";

const VEHICLE_TYPES = {
  1: 'Carro',
  2: 'motocicleta',
  3: 'bicicleta',
};

const usePaymentForm = (month, onBack) => {
  const dispatch = useDispatch();
  const { getDataFetch } = useLazyFetch();
  const turnoFetchedRef = useRef(false);
  const [userInfo, setUserInfo] = useState(null);
  const { selectedTabProducts, selectedMonth } = useSelector((state) => state.productPurchases)
  const { parqueaderoId, token, terminalId, numeroIdentificacion } = useAppSelector((state) => state.auth);
  const { turnoIdEntry } = useAppSelector(state => state.movements);
  const [invoiceData, setInvoiceData] = useState(null);
  const [nitCedula, setNitCedula] = useState("");
  const [typeDocument, setTypeDocument] = useState("");
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [placa, setPlaca] = useState('');
  const [plateError, setPlateError] = useState('');
  const [medioPagoId, setMedioPagoId] = useState('');
  const [numeroComprobante, setNumeroComprobante] = useState('');
  const [tokenProduc, setTokenProduc] = useState('');
  const [numeroIdentificacionForm, setNumeroIdentificacion] = useState('');
  const [tipoVehiculoId, setTipoVehiculoId] = useState('');
  const [nit, setNit] = useState('');
  const [identificationOptions, setIdentificationOptions] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [isCedulaValidated, setIsCedulaValidated] = useState(false);

  const handleError = (errorFetch) => {
    if (errorFetch) {
      console.error('Error en la operación:', errorFetch);

      let errorMessage = "Ha ocurrido un error en la operación. Por favor, intente nuevamente.";
      if (errorFetch?.status === 503) {
        //errorMessage = "El servicio está temporalmente no disponible. Intente más tarde.";
      } else if (errorFetch?.error === "unexpected-error") {
        errorMessage = "Se produjo un error inesperado. Por favor, contacte al soporte.";
      }

      /*Alert.alert(
        "Error",
        errorMessage,
        [{ text: "OK" }]
      );*/
    }
  };

  const resetSinFacturaForm = () => {
    setSelectedDocumentType('');
    setTypeDocument('');
    setCorreo('');
    setNombre('');
    setApellidos('');
    setPlaca('');
    setTokenProduc('');
    setMedioPagoId(null);
    setNumeroComprobante('');
  };

  const resetConFacturaForm = () => {
    setNitCedula('');
    setUserInfo(null); // si tienes esta lógica
    setPlaca('');
    setTokenProduc('');
    setMedioPagoId(null);
    setNumeroComprobante('');
  };

  useEffect(() => {
    console.log("TurnIdEntry: ", turnoIdEntry)
    const fetchTurnoId = async () => {
      try {
        const { data, errorFetch } = await getDataFetch("/api/turn", "POST", {
          rq: { id: numeroIdentificacion, parqueaderoId },
        });

        if (data?.turn?.turnoId) {
          dispatch(setTurnoIdEntry(data.turn.turnoId));
          console.log("Turno Id obtenido en Entrada:", data.turn.turnoId);
        } else {
          console.error("No se pudo obtener el turnoId de productos");
        }

        handleError(errorFetch);
      } catch (error) {
        console.error("Error al obtener el turnoIdEntry:", error);
        handleError(error);
      }
    };

    if (!turnoIdEntry) {
      turnoFetchedRef.current = true; // ✅ Evitamos llamadas múltiples
      fetchTurnoId();
    }
  }, [turnoIdEntry, numeroIdentificacion, parqueaderoId, dispatch, getDataFetch]);

  const selectFactura = (tab) => {
    dispatch(setSelectedTabProducts(tab));
    if (tab === 'sinFactura') {
      setInvoiceData(null);
      setUserInfo(null);
    }
  };


  const handleInputChange = (value) => {
    const numeric = value.replace(/[^0-9]/g, "");

    setNitCedula(numeric);
  };

  const getLabelByDocumentType = (type) => {
    switch (type) {
      case 'CC':
        return 'Cédula de Ciudadanía *';
      case 'NIT':
        return 'Número de Identificación Tributaria *';
      case 'CE':
        return 'Cédula de Extranjería *';
      default:
        return 'Seleccionar Tipo de Documento *';
    }
  };

  const getErrorMessageByType = (type) => {
    switch (type) {
      case 'CC':
        return 'Debe ingresar entre 6 y 10 dígitos sin espacios y sin iniciar con 0.';
      //case 'NIT':
      //return 'Debe tener 9 dígitos, un guión y 1 dígito de verificación (ej: 123456789-1).';
      case 'NIT':
        return 'Debe ingresar entre 6 y 11 dígitos sin espacios y sin iniciar con 0.';
      case 'CE':
        return 'Debe ingresar entre 3 y 7 dígitos sin espacios y sin iniciar con 0.';
      default:
        return 'Número de identificación inválido.';
    }
  };

  const validateInputByType = (value, type) => {
    if (!value) return false;

    const cleanValue = value.trim();

    if (type === 'CC') {
      return /^[1-9][0-9]{5,9}$/.test(cleanValue);
    }

    /*if (type === 'NIT') {
      return /^[1-9][0-9]{8}-[0-9]$/.test(cleanValue);
    }*/

    if (type === 'NIT') {
      return /^[1-9][0-9]{5,10}$/.test(cleanValue);
    }

    if (type === 'CE') {
      return /^[1-9][0-9]{2,6}$/.test(cleanValue);
    }

    return false;
  };

  const handleTypeDocument = (text) => {
    setTypeDocument(text);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(
          `https://inside-back-dev.parking.net.co/identificationDocumentType?active=true&parqueaderoId=${parqueaderoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();

        const filteredOptions = (json?.data || []).filter(
          (doc) =>
            doc.label?.toUpperCase() === "NIT" ||
            doc.label?.toUpperCase() === "CC" ||
            doc.label?.toUpperCase() === "CE"
        );

        console.log("Tipos de identificación filtrados:", filteredOptions);
        console.log('selectedDocumentType', selectedDocumentType);

        setIdentificationOptions(filteredOptions);
      } catch (error) {
        console.error("Error cargando tipos de identificación:", error);
      }
    };

    fetchOptions();
  }, [parqueaderoId]);

  const getDocumentTypeCode = (value) => {
    const option = identificationOptions.find((opt) => opt.value === value);
    return option?.label?.toUpperCase() || "";
  };

  useEffect(() => {
    if (!placa) {
      setPlateError('');
      return;
    }

    const result = validatePlate(placa);
    setPlateError(result.valid ? '' : result.error);
  }, [placa, month]);


  const validatePlate = (plate) => {
    console.log("selectedMonth", selectedMonth)
    if (!selectedMonth) return { valid: false, error: 'No se encontró información de la mensualidad.' };

    const tiposPermitidos = selectedMonth.mensualidadVehiculo?.map(v => v.tipoVehiculoId) || [];

    plate = plate.replace(/\s+/g, '').toUpperCase();

    if (!plate) return { valid: false, error: '' };

    const isPlateValidForType = (tipo) => {
      switch (tipo) {
        case 1: // Carro
          return (
            plate.length === 6 && (/^[A-Z]{3}[0-9]{3}$/.test(plate) || /^[A-Z]{2}[0-9]{4}$/.test(plate)) ||
            plate.length === 7 && /^[A-Z][0-9]{2}[A-Z]{2}[0-9][A-Z]$/.test(plate)
          );
        case 2: // Motocicleta
          return (
            (plate.length === 5 && /^[A-Z]{3}[0-9]{2}$/.test(plate)) ||
            (plate.length === 6 && /^[A-Z]{3}[0-9]{2}[A-Z]$/.test(plate))
          );
        case 3:
          return plate.length > 0;
        default:
          return false;
      }
    };

    const validForAny = tiposPermitidos.some(tipo => isPlateValidForType(tipo));

    if (validForAny) {
      return { valid: true, error: '' };
    } else {
      const tiposNombres = tiposPermitidos.map(t => VEHICLE_TYPES[t]).filter(Boolean);
      const tiposTexto = tiposNombres.length > 1 ? tiposNombres.join(' / ') : tiposNombres[0] || 'vehículo';

      return {
        valid: false,
        error: `Formato de placa no corresponde para el/los tipo(s) de vehículo permitidos en esta mensualidad: ${tiposTexto}.`
      };
    }
  };

  const handleSubmit = async () => {
    if (plateError) {
      Alert.alert('Error', 'Corrige los errores antes de continuar.');
      return;
    }

    if (parseInt(medioPagoId) === 2 && !numeroComprobante) {
      Alert.alert('Error', 'Debes ingresar el número de comprobante para el pago con datáfono.');
      return;
    }

    //const emailRegex = /.+@.+\..+/;
    /*if (!emailRegex.test(invoiceData?.correo || correo)) {
      Alert.alert("Ingrese un correo electrónico válido, que contenga '@' y '.'");
      return;
    }*/

    // Validación solo si estoy en "sinFactura"
    if (selectedTabProducts === "sinFactura") {
      const emailRegex = /.+@.+\..+/;
      if (!emailRegex.test(invoiceData?.correo || correo)) {
        Alert.alert("Ingrese un correo electrónico válido, que contenga '@' y '.'");
        return;
      }
    }

    if (selectedTabProducts === "conFactura") {
      if (!nitCedula) {
        Alert.alert("Debe ingresar un NIT o Cédula.");
        return;
      }
      if (!isCedulaValidated) {
        Alert.alert("Debe validar el NIT o Cédula antes de continuar.");
        return;
      }
    }

    const isConFactura = selectedTabProducts === 'conFactura';

    const payload = {
      correo: isConFactura ? invoiceData?.correo : correo,
      nombre: isConFactura ? invoiceData?.razonSocial : nombre,
      apellidos: isConFactura ? '-' : (apellidos || '-'),
      tipoIdentificacionId: isConFactura
        ? parseInt(invoiceData?.tipoDocumento || 0)
        : parseInt(selectedDocumentType || 0),
      numeroIdentificacion: isConFactura
        ? invoiceData?.facturacionElectronica
        : typeDocument.toString(),
      placa: placa.toUpperCase(),
      tipoVehiculoId: parseInt(selectedMonth?.mensualidadVehiculo?.[0]?.tipoVehiculoId || 0),
      parqueaderoId,
      mensualidadId: selectedMonth?.mensualidadId || 0,
      token: tokenProduc,
      turnoId: turnoIdEntry,
      terminalId: terminalId,
      numeroComprobante: parseInt(medioPagoId) === 2 ? numeroComprobante : "0",
      medioPagoId: medioPagoId ? parseInt(medioPagoId) : null,
      nit: isConFactura ? invoiceData?.facturacionElectronica : '0',
      clienteFactElectronicaId: isConFactura ? invoiceData?.id : 0,
    };

    const validationPayload = {
      plate: placa.toUpperCase(),
      parkId: parqueaderoId,
      monthlyId: selectedMonth?.mensualidadId || 0,
      vehicleTypeId: parseInt(selectedMonth?.mensualidadVehiculo?.[0]?.tipoVehiculoId || 0),
    };

    console.log('📤 Payload enviado a validación:', validationPayload);

    try {
      const validationResponse = await fetch('https://inside-back-dev.parking.net.co/purchase/active-standard-monthly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validationPayload),
      });

      const validationData = await validationResponse.json();

      console.log('Respuesta validación', validationData);

      if (validationData?.productoVigenteActivo) {
        const fechaFormateada = validationData.vigenciaFin
          .split('-')
          .reverse()
          .join('-');

        Alert.alert(
          'Atención',
          `La placa ingresada ya cuenta con una mensualidad activa hasta el ${fechaFormateada}. ¿Deseas continuar de todos modos?`,
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Continuar',
              onPress: () => sendPurchase(payload),
            },
          ],
          { cancelable: true }
        );
      } else {
        sendPurchase(payload, null); // no hay producto activo, flujo normal
      }

    } catch (err) {
      console.warn('Error al validar mensualidad activa. Continuando con flujo por defecto.', err);
      sendPurchase(payload, null); // en error, continuar también
    }
  };

  // 👇 Esta función ahora acepta un segundo parámetro opcional
  const sendPurchase = async (payload, vigenciaFinApi = null) => {
    try {
      const response = await fetch('https://inside-back-dev.parking.net.co/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Saving body:", payload)

      const data = await response.json();
      console.log('Respuesta del API:', data);

      if (!response.ok) {
        console.error('Error del servidor:', data);
        Alert.alert('Error', `${data?.mensaje || data?.message}`);
        return;
      }

      if (response.ok) {
        const info = await infoTicket(data.transaccionId);
        handlePrintTicket(info, data.vigenciaFin);
        Alert.alert('Éxito', 'Pago manual registrado correctamente.', [
          { text: 'OK', onPress: () => handleBack() },
        ]);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      Alert.alert('Error de conexión', 'No se pudo conectar al servidor.');
    }
  };


  const infoTicket = async (transaccionId) => {
    if (!transaccionId) {
      console.error("No se ha proporcionado un ID de transacción.");
      return null;
    }
    const url = `/api/monthlyPaymentReceipt?transaccionId=${transaccionId}` //${cedulaBeParking}
    console.log("URL para obtener información de ticket", url);

    try {
      const res = await getDataFetch(url, "GET");
      if (res.errorFetch) {
        throw new Error(res.errorFetch.message || "Error al obtener la información del ticket.");
      }
      console.log("Data recibida:", res.data)
      const data = res.data.data;
      return data;
    } catch (err) {
      console.error("Error en infoTicket: ", err);
      Alert.alert("Error", 'No se pudo obtener la información de salida.');
      return null;
    }
  }

  const handlePrintTicket = async (dataApi, vigenciaFinApi) => {
    try {
      console.log("Datos recibidos para imprimir:", dataApi);

      const sanitize = str => typeof str === 'string' ? str.replace(/\u202f/g, ' ') : '';
      const formatCurrency = val =>
        sanitize(Number(val).toLocaleString('es-CO', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }));
      const fmtDate = d =>
        sanitize(new Date(d).toLocaleString('es-CO', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: false,
        }));
      const ddmmDate = (d) =>
        sanitize(new Date(d).toLocaleDateString('es-CO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }));

      const pageHeight = 135;
      const pdfDoc = await PDFDocument.create();
      const pageWidth = 100;
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      const { width, height } = page.getSize();
      let y = height - 10;

      const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const S = {
        header1: 4,
        header2: 5,
        branch: 3.5,
        voucher: 4,
        row: 3.5,
        small: 3,
        gap: 1,
        lineGap: 1
      };
      const M = 6;

      const drawCenter = (txt, font, size, extraGap = size + S.gap) => {
        const t = sanitize(txt);
        const w = font.widthOfTextAtSize(t, size);
        page.drawText(t, { x: (width - w) / 2, y, size, font });
        y -= extraGap;
      };

      const drawDashLine = (gap = S.lineGap) => {
        page.drawLine({
          start: { x: M, y },
          end: { x: width - M, y },
          thickness: 1,
          color: rgb(0, 0, 0),
          dashArray: [2, 2],
        });
        y -= gap;
      };

      const drawRow = (label, val, size = S.row, extraGap = size + S.gap) => {
        const v = sanitize(val);
        page.drawText(label, { x: M, y, size, font: helvBold });
        const w = helv.widthOfTextAtSize(v, size);
        page.drawText(v, { x: width - M - w, y, size, font: helv });
        y -= extraGap;
      };

      const wrapAndCenter = (text, font, size, maxW, extraGap = size + S.gap) => {
        const words = text.split(' ');
        const lines = [];
        let line = '';
        for (const w of words) {
          const test = line ? `${line} ${w}` : w;
          if (font.widthOfTextAtSize(test, size) <= maxW) {
            line = test;
          } else {
            lines.push(line);
            line = w;
          }
        }
        if (line) lines.push(line);
        for (const ln of lines) drawCenter(ln, font, size, extraGap);
      };

      const formatearFechaHora = (fechaISO) => {
        const fecha = new Date(fechaISO);

        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // enero = 0
        const anio = fecha.getFullYear();

        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');

        return `${dia}-${mes}-${anio}, ${horas}:${minutos}`;
      };

      // Ticket content
      y -= 1;
      drawCenter(dataApi.factura.parkingGo, helvBold, S.header2);
      drawCenter(`NIT ${dataApi.factura.nit}`, helv, S.header1);
      drawCenter(`Pq. ${dataApi.parqueadero.parqueaderoId} - ${dataApi.parqueadero.nombre}`, helv, S.header1);
      drawCenter(`Terminal ${dataApi.transaccion.terminalId}`, helv, S.header1);
      drawCenter(dataApi.parqueadero.direccion, helv, S.header1);
      y -= 4;
      drawCenter('COMPROBANTE DE PAGO', helv, S.header1);
      y -= 4;

      drawRow('Fecha hora expedición:', formatearFechaHora(dataApi.transaccion.fechaHoraFinal));
      drawRow('Turno:', String(dataApi.transaccion.turnoId));

      const clienteNombre = selectedTabProducts === 'conFactura'
        ? invoiceData?.razonSocial
        : `${nombre} ${apellidos}`;
      drawRow('Cliente:', clienteNombre);

      drawRow('Placa:', dataApi.transaccion.placa);
      drawRow('Comp. Pago No:', String(dataApi.transaccion.transaccionId));

      const fechaFormateada = vigenciaFinApi.split('-').reverse().join('-');
      drawRow('Vigente hasta:', fechaFormateada);

      y -= 8;
      drawRow('Forma de Pago:', dataApi.transaccion.medioPago === 1 ? 'Efectivo' : 'Datáfono');
      drawRow('Subtotal:', String(formatCurrency(dataApi.transaccion.valorBase)));
      drawRow('Iva:', String(formatCurrency(dataApi.transaccion.valorIva)));
      drawRow('TOTAL:', String(formatCurrency(dataApi.transaccion.valorTotal)));

      y -= 4;
      drawRow('Mensualidad con cubrimiento 24 horas', '');
      y -= 4;

      const correoElectronico = selectedTabProducts === 'conFactura'
        ? invoiceData?.correo
        : `consumidor.final@parking.net.co`;

      drawCenter('SU FACTURA ELECTRÓNICA SERÁ ENVIADA', helvBold, S.header1);
      drawCenter('AL CORREO REGISTRADO:', helvBold, S.header1);
      drawCenter(correoElectronico, helv, S.header1);

      const pdfBase64 = await pdfDoc.saveAsBase64();
      const fileUri = `${FileSystem.cacheDirectory}salida_ticket.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await shareAsync(fileUri, { UTI: '.pdf', mimeType: 'application/pdf' });

    } catch (err) {
      console.error('Error en handlePrintExit:', err);
      Alert.alert('Error al generar comprobante', err.message || 'Ocurrió un error inesperado.');
    }
  };


  const formHasErrors = useMemo(() => {
    if (selectedTabProducts === "conFactura") {
      const nitValid = nitCedula.length >= 5;
      const placaValid = Boolean(placa) && !plateError;
      const tokenValid = Boolean(tokenProduc);
      const medioValid = Boolean(medioPagoId);
      const comprobValid = medioPagoId === '2' ? Boolean(numeroComprobante) : true;

      return !(nitValid && placaValid && tokenValid && medioValid && comprobValid);
    }

    const docValid = validateInputByType(typeDocument, getDocumentTypeCode(selectedDocumentType));
    const plateInvalid = Boolean(plateError);
    const needsComp = medioPagoId === '2';
    const missingComp = needsComp && !numeroComprobante;
    const missingReq = !correo || !nombre || !apellidos || !placa || !medioPagoId;

    return (
      !docValid ||
      plateInvalid ||
      missingComp ||
      missingReq
    );
  }, [
    selectedTabProducts,
    nitCedula,
    placa,
    plateError,
    tokenProduc,
    medioPagoId,
    numeroComprobante,
    // campos de sinFactura...
    typeDocument,
    selectedDocumentType,
    correo,
    nombre,
    apellidos,
  ]);

  const handleSearch = () => {
    if (!validateNitOrCC(nitCedula)) {
      Alert.alert(
        'Validación de documento',
        'El número de documento ingresado no es válido. Asegúrate de que tenga al menos 6 dígitos y no sea una secuencia inválida como "000000".'
      );
      return;
    }

    fetchInvoiceAccumulation()
      .then((res) => {
        if (res && res.data.saveInvoice) {
          // Se encontró la factura: llenamos userInfo con nitCedula y la razón social
          setUserInfo({
            number: nitCedula,
            name: res.data.saveInvoice.razonSocial
          });
        } else {
          // Si no existe factura, mostramos el modal para crear factura
          console.log("entrando a modal")
          setUserInfo(null);
          dispatch(setElectronicInvoiceNit(nitCedula));
          dispatch(showElectronicInvoiceModal(true));
        }
      })
      .catch(() => {
        // En caso de error se abre el modal.
        console.log("entrando a modal2")
        setUserInfo(null);
        dispatch(setElectronicInvoiceNit(nitCedula));
        dispatch(showElectronicInvoiceModal(true));
      });
  };

  const fetchInvoiceAccumulation = useCallback(() => {
    const url = `/api/invoiceAccumulation/${nitCedula}/parkingId/${parqueaderoId}/turnId/${turnoIdEntry}`;
    console.log("Fetching invoice accumulation from:", url);
    return getDataFetch(url, "GET", {})
      .then((res) => {
        //console.log("Response from invoice accumulation:", res);
        if (res && res.data.saveInvoice) {
          console.log("Fetched invoice accumulation data:", res.data.saveInvoice);
          setInvoiceData(res.data.saveInvoice);
        }
        return res;
      })
      .catch((error) => {
        console.error("Error fetching invoice accumulation:", error);
        throw error;
      });
  }, [nitCedula, parqueaderoId, getDataFetch]);

  const handleBack = () => {
    dispatch(backToList());
  };

  const handleNitCedulaInput = (text) => {
    const clean = text
      .replace(/\s/g, '')
      .replace(/[^\d-]/g, '');
    setNitCedula(clean);
  };


  const validateNitOrCC = (input) => {
    if (!input || input.trim() === '') return false;

    //const isNIT = /^[1-9][0-9]{8}-[0-9]$/.test(input); // NIT: 9 dígitos + '-' + 1 dígito

    const isNIT = /^[1-9][0-9]{5,10}$/.test(input);

    const isCC = /^[1-9][0-9]{5,9}$/.test(input); // CC: 6 a 10 dígitos, no inicia en 0

    return isNIT || isCC;
  };


  return {
    nitCedula,
    selectedTabProducts,
    identificationOptions,
    selectedDocumentType,
    typeDocument,
    correo,
    nombre,
    apellidos,
    placa,
    plateError,
    medioPagoId,
    numeroComprobante,
    tokenProduc,
    selectFactura,
    handleInputChange,
    setSelectedDocumentType,
    setTypeDocument,
    handleTypeDocument,
    getLabelByDocumentType,
    getErrorMessageByType,
    validateInputByType,
    getDocumentTypeCode,
    setNombre,
    setCorreo,
    setApellidos,
    setPlaca,
    setMedioPagoId,
    setNumeroComprobante,
    setTokenProduc,
    handleSubmit,
    formHasErrors,
    handleSearch,
    userInfo,
    handleBack,
    resetSinFacturaForm,
    resetConFacturaForm,
    handleNitCedulaInput,
    validateNitOrCC,
    setIsCedulaValidated
  };
};

export default usePaymentForm;