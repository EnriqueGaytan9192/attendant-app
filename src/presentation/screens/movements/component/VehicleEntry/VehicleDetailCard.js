import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system/legacy';
import { shareAsync } from 'expo-sharing';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import QRCodeGenerator from 'qrcode-generator';
import { useEffect, useRef, useState } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../../../state/hooks";
import { setCedulaBeParking } from "../../../../../state/slices/authSlice";
import useVehicleDetailCardHook from "../../hooks/HooksVehicleEntry/useVehicleDetailCardHook";
import styles from "../../styles/styleVehicleEntry/stylesVehicleDetail";

const parkingDataEntry = {
  parkingGo: "PARKING INTERNACIONAL S.A.S",
  parking: "Nit 860.058.760-1",
  address: "Parq. 172 Kr 13 # 83-21",
  schedule: "de : 09:00 AM a 05:00 AM",
  police:
    "Este punto de servicio se encuentra amparado con la poliza de Resposabilidad Civil No. 2267 de AXA COLPATRIA SEGUROS S.A.",
  receipt: "COMPROBANTE DE ENTRADA",
  modeRate: "MODALIDAD DE TARIFAS",
  car: "191 PESOS EL MINUTO",
  motorcycle: "134 PESOS EL MINUTO",
  bicycle: "10 PESOS EL MINUTO",
  conditionBood: "ESTADO DEL BIEN",
  data: {
    vehicleId: 6,
    plate: "LLL129",
    typeVehicle: 2,
    entryAt: "2025-01-26T16:55:10.000Z",
    typeProduct: "Moto",
    codeQR: "T001LLL12912B",
    stateVehicle: 1,
    stateTransaction: 1,
    estadoTicket: 1,
  },
};

const VehicleDetailCard = () => {
  const [isPrintingExit, setIsPrintingExit] = useState(false);
  const [isPrintingEntry, setIsPrintingEntry] = useState(false);
  const lostModalVisible = useSelector((s) => s.movements.lostTicketModalVisible);
  const { handleNextStep, lostTicketModal, objectsModal, confirmVehicleExit, exitInfo, infoTicketExit, infoTicketEntry, ticketInfo, ticketInfoExit, actualizarEstadoTicket, ticketInfoComplementary, getVigenciaFin, turnId } = useVehicleDetailCardHook();
  const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);
  const blockNavigation = useSelector((state) => state.movements);
  const scannedData = useSelector((state) => state.movements.scannedData);
  const { numeroIdentificacion } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  dispatch(setCedulaBeParking(""))
  const withTimeout = (promise, ms) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Tiempo de espera excedido (10 s). Intenta de nuevo.'));
      }, ms);
      promise
        .then(res => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });

  const prevLostModal = useRef(lostModalVisible);
  useEffect(() => {
    if (prevLostModal.current && !lostModalVisible) {
      actualizarEstadoTicket();
    }
    prevLostModal.current = lostModalVisible;
  }, [lostModalVisible, actualizarEstadoTicket]);

  const handlePrintEntry = async () => {
    try {
      setIsPrintingEntry(true);

      const ticketResWrapper = await withTimeout(infoTicketEntry(), 10000);
      if (!ticketResWrapper) throw new Error('No se obtuvo información de entrada.');
      const ticketRes = ticketResWrapper.data;

      const rawDate = ticketRes.data.entryAt;
      const formattedDate = new Date(rawDate).toLocaleString('es-CO', {
        day: '2-digit', month: '2-digit',
        year: 'numeric', hour: '2-digit',
        minute: '2-digit', hour12: false
      });

      // 🧠 Determinar si el producto requiere mostrar vigencia
      const nombreProducto = ticketRes.data.nombreProducto;
      const requiereVigencia = nombreProducto !== "Horas" && nombreProducto !== "GOLD";

      // 📏 Tamaño dinámico del ticket
      const pageWidth = 130;
      const pageHeight = requiereVigencia ? 205 : 185; // +20 pts si hay vigencia
      console.log(`🧾 Altura del ticket de entrada: ${pageHeight} (${requiereVigencia ? 'con vigencia' : 'sin vigencia'})`);

      // 🧾 Crear documento
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      const { width, height } = page.getSize();
      let y = height - 8;

      const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const S = {
        header1: 5,
        header2: 6.5,
        info: 4,
        lineGap: 1,
        police: 4,
        plate: 6.5,
        date: 4,
        rate: 4,
        row: 4,
        gap: 1.5
      };
      const M = 6;

      // 🧱 Helpers
      const drawCenter = (text, font, size, gap = size + S.gap) => {
        const w = font.widthOfTextAtSize(text, size);
        page.drawText(text, { x: (width - w) / 2, y, size, font });
        y -= gap;
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
      const drawRow = (label, value, size = S.row, gap = size + S.gap) => {
        page.drawText(label, { x: M, y, size, font: helvBold });
        const vw = helv.widthOfTextAtSize(value, size);
        page.drawText(value, { x: width - M - vw, y, size, font: helv });
        y -= gap;
      };
      const wrapAndCenter = (text, font, size, maxW, gap = size + S.gap) => {
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
        for (const ln of lines) drawCenter(ln, font, size, gap);
      };

      // 🧾 Construcción del ticket
      drawCenter(`${ticketRes.parking}`, helv, S.header1);
      drawCenter(ticketRes.parkingGo, helvBold, S.header2);
      drawDashLine();
      y -= 5;
      drawCenter(ticketRes.facilitie, helv, S.info);
      drawCenter(ticketRes.address, helv, S.info);
      drawCenter(ticketRes.schedule, helv, S.info);
      drawDashLine();
      y -= 5;
      wrapAndCenter(ticketRes.police, helv, S.police, width - 2 * M);
      y -= 2;
      drawCenter(`Comprobante de entrada`, helv, S.header1);
      y -= 2;
      drawCenter(ticketRes.data.plate, helvBold, S.plate, S.plate + 1);
      drawCenter(formattedDate, helv, S.date, S.date + 1);
      drawCenter(ticketRes.data.nombreProducto, helvBold, S.date, S.date + 1);

      // ⬇️ QR
      const qrText = ticketRes.data.codeQR || '';
      if (qrText) {
        const qr = QRCodeGenerator(0, 'L');
        qr.addData(qrText);
        qr.make();
        const count = qr.getModuleCount();
        const qrSize = 50;
        const mSize = qrSize / count;
        const x0 = (width - qrSize) / 2;
        const y0 = y - qrSize - 1;
        for (let r = 0; r < count; r++) {
          for (let c = 0; c < count; c++) {
            if (qr.isDark(r, c)) {
              page.drawRectangle({
                x: x0 + c * mSize,
                y: y0 + (count - 1 - r) * mSize,
                width: mSize,
                height: mSize,
                color: rgb(0, 0, 0),
              });
            }
          }
        }
        y = y0 - 6;
      }

      // 🔹 Mostrar vigencia solo si aplica
      if (requiereVigencia) {
        const vigenciaFin = await getVigenciaFin(ticketRes.data.plate, turnId);
        console.log("📅 Resultado de vigenciaFin:", vigenciaFin);

        if (vigenciaFin) {
          // ✅ Misma lógica que en tu primer ejemplo
          const isoDate = vigenciaFin;
          const onlyDate = isoDate.split('T')[0];
          const [year, month, day] = onlyDate.split('-');
          const fechaVigencia = `${day}/${month}/${year}`;

          const mensajeVigencia = `Placa ${ticketRes.data.plate} tiene mensualidad en este parqueadero vigente hasta ${fechaVigencia}`;
          wrapAndCenter(mensajeVigencia, helv, S.date, width - 2 * M);
        }
      }

      ['Carro', 'Moto', 'Bici'].forEach(label => {
        const key = { Carro: 'car', Moto: 'motorcycle', Bici: 'bicycle' }[label];
        const value = ticketRes[key];

        // Omitir si el valor es nulo, indefinido o "$0.00/MIN"
        if (value && value !== '$0.00/MIN') {
          const txt = `${label}: ${value}`;
          const w = helv.widthOfTextAtSize(txt, S.rate);
          page.drawText(txt, { x: (width - w) / 2, y, size: S.rate, font: helv });
          y -= S.rate + S.gap;
        }
      });

      drawDashLine();
      y -= 5;
      drawRow('¿Necesita algo?', ticketRes.helpNumber);
      drawRow('Contacto:', 'www.parking.net.co');

      // Guardar y compartir
      const pdfBase64 = await pdfDoc.saveAsBase64();
      const fileUri = `${FileSystem.cacheDirectory}entrada_ticket.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64
      });

      setIsPrintingEntry(false);
      await shareAsync(fileUri, { UTI: '.pdf', mimeType: 'application/pdf' });

      const updated = await actualizarEstadoTicket();
      if (!updated) console.warn('No se actualizó estado de ticket');
    } catch (err) {
      console.error('Error en handlePrintEntry:', err);
      setIsPrintingEntry(false);
      Alert.alert('Error al generar PDF', err.message || 'Ocurrió un error inesperado.');
    }
  };




  const handlePrintExit = async () => {
    try {
      setIsPrintingExit(true);

      // 1) Obtener datos
      const infoResExitWrapper = await withTimeout(infoTicketExit(), 10000);
      if (!infoResExitWrapper) throw new Error('No se obtuvo información de salida.');
      const info = infoResExitWrapper;
      const vd = info.vehicleData;
      const bp = info.beParking;
      const fc = info.factura;
      const cp = info.productos;
      const isMixto = vd.nombreMedioPago === "Mixto";

      // 2) Sanitizar y formatear
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
      const entrada = fmtDate(vd.fechaHoraInicial);
      const salida = fmtDate(vd.fechaHoraFinal);


      // 3) Definir altura del PDF dinámicamente
      //const hasBono = vd.bonoBeParking > 0;
      const hasBono =
        vd.bonoBeParking > 0 ||
        vd.codigoBeParking > 0 ||
        vd.descuentoValidaciones > 0 ||
        vd.alianzaBancosImporte > 0;
      const hasDiscountSection =
        vd.bonoBeParking > 0 ||
        vd.codigoBeParking > 0 ||
        vd.validacionImporte > 0 ||
        vd.alianzaBancosImporte > 0;

      const hasPerdido = vd.tiquetePerdido > 0;
      const hasBeParkingData =
        bp?.dataUser &&
        typeof bp.dataUser === 'object' &&
        Object.keys(bp.dataUser).length > 0 &&
        !!bp.dataUser?.nombre;
      const totalPagar = vd.valorTotal;
      const hasMixto = isMixto && (vd.efectivo > 0 || vd.valorComprobante > 0);

      const baseHeight =
        hasDiscountSection && hasPerdido && hasBeParkingData ? 255 : //Validado 2da
          hasDiscountSection && hasPerdido ? 280 :
            hasDiscountSection && hasBeParkingData ? 240 : //
              hasPerdido && hasBeParkingData ? 230 : //
                hasDiscountSection ? 260 :
                  hasPerdido ? 215 : //Validado 2da
                    hasBeParkingData ? 215 : //Validado 2da
                      200; //Validado 2da

      const pageHeight = hasMixto ? baseHeight + 20 : baseHeight;

      // 🟦 Mostrar en consola qué filtros se aplicaron
      let heightReason = '';
      if (hasDiscountSection && hasPerdido && hasBeParkingData) {
        heightReason = 'Bono + Perdido + BeParking'; //Validado 2da
      } else if (hasDiscountSection && hasPerdido) {
        heightReason = 'Bono + Perdido';  //No podra validarse
      } else if (hasDiscountSection && hasBeParkingData) {
        heightReason = 'Bono + BeParking'; //Validado
      } else if (hasPerdido && hasBeParkingData) {
        heightReason = 'Perdido + BeParking'; //Validado
      } else if (hasDiscountSection) {
        heightReason = 'Solo Bono'; //No podra validarse
      } else if (hasPerdido) {
        heightReason = 'Solo Perdido'; //Validado 2da
      } else if (hasBeParkingData) {
        heightReason = 'Solo BeParking'; //Validado 2da
      } else {
        heightReason = 'Sin descuentos ni datos BeParking'; //Validado 2da
      }

      console.log(`🧾 Altura del comprobante: ${pageHeight} pts (${heightReason})`);

      // 4) Crear PDF
      const pdfDoc = await PDFDocument.create();
      const pageWidth = 100;
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      const { width, height } = page.getSize();
      let y = height - 5;

      // 5) Embedir fuentes
      const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // 6) Parámetros
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

      // 7) Helpers
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

      // 8) Comprobante
      drawCenter(`NIT ${fc.nit}`, helv, S.header1);
      drawCenter(fc.parkingGo, helvBold, S.header2);
      drawDashLine();
      y -= 4;
      drawCenter(bp.dataParking.NOMBRE, helv, S.branch);
      drawCenter(bp.dataParking.direccionEstandarizada, helv, S.branch);
      drawCenter(`Comprobante N° ${vd.terminalId}-${vd.consecutivo}`, helvBold, S.voucher);
      drawDashLine();
      y -= 4;
      drawCenter(vd.placa, helvBold, S.voucher, S.voucher + S.gap);
      drawRow('Turno:', String(vd.turnoId));
      drawRow('Operario:', String(info.operador.numeroIdentificacion));
      drawRow('Entrada:', entrada);
      drawRow('Salida:', salida);
      drawRow('Duración:', String(vd.tiempoTotal));
      drawDashLine();
      y -= 4;
      drawRow('Servicio:', `$${formatCurrency(vd.valorServicio)}`);
      drawDashLine();
      y -= 4;
      drawRow('Producto:', vd.nombreProducto);
      if (vd.nombreProducto !== "Horas" && vd.nombreProducto !== "GOLD" && vd.cuponImporte > 0 && Array.isArray(cp) && cp.length > 0) {
        const isoDate = cp[0].vigenciaFin;
        const onlyDate = isoDate.split('T')[0];
        const [year, month, day] = onlyDate.split('-');
        const formatted = `${day}/${month}/${year}`;
        drawRow('Vigencia:', formatted);
      }


      drawDashLine();

      y -= 4;
      if (vd.tiquetePerdido > 0) {
        drawRow('Cobro adicional:', '');
        drawRow('Tiquete perdido:', `$${formatCurrency(vd.tiquetePerdido)}`);
        drawDashLine();
        y -= 4;
      }
      const hasAnyDiscount =
        vd.bonoBeParking > 0 ||
        vd.codigoBeParking > 0 ||
        vd.validacionImporte > 0 ||
        vd.alianzaBancosImporte > 0;

      if (hasAnyDiscount) {
        drawRow('Descuentos:', '');

        if (vd.bonoBeParking > 0) {
          drawRow('Be Parking:', `$${formatCurrency(vd.bonoBeParking)}`);
        }

        if (vd.codigoBeParking > 0) {
          drawRow('Cod. BeParking:', `$${formatCurrency(vd.codigoBeParking)}`);
        }

        if (vd.validacionImporte > 0) {
          drawRow('Validaciones:', `$${formatCurrency(vd.validacionImporte)}`);
        }

        if (vd.alianzaBancosImporte > 0) {
          drawRow('Alianza Bancaria:', `$${formatCurrency(vd.alianzaBancosImporte)}`);
        }

        drawDashLine();
        y -= 4;
      }


      if (vd.nombreProducto !== "Horas" && vd.cuponImporte > 0 && vd.tiquetePerdido == 0) {
        drawRow('Descuentos:', '');
        drawRow('Descuento Cupón:', `$${formatCurrency(vd.cuponImporte)}`);
        drawDashLine();
        y -= 4;
      }

      let totalIva;
      let totalSubtotal;

      if (vd.tiquetePerdido > 0) {
        // 🔴 Prioridad 1: Tiquete perdido
        totalIva = vd.valorIva;
        totalSubtotal = vd.valorBase;
      } else if (vd.cuponImporte > 0) {
        // 🟡 Prioridad 2: Cupón
        totalIva = 0;
        totalSubtotal = 0;
      } else {
        // 🟢 Caso normal
        totalIva = vd.valorIva;
        totalSubtotal = vd.valorBase;
      }

      // ✅ SIEMPRE se pintan
      drawRow('IVA:', `$${formatCurrency(totalIva)}`);
      drawRow('Subtotal.:', `$${formatCurrency(totalSubtotal)}`);

      if (vd.nombreProducto === "Horas" && totalPagar > 0) {
        drawRow('Ajuste:', '$50,00');
      }


      drawDashLine();
      y -= 4;
      drawRow('Total a Pagar:', `$${formatCurrency(totalPagar)}`);
      drawRow('Método de Pago:', vd.nombreMedioPago);
      if (isMixto) {
        if (vd.efectivo > 0) {
          drawRow('Pago efectivo:', `$${formatCurrency(vd.efectivo)}`);
        }

        if (vd.valorComprobante > 0) {
          drawRow('Pago datafono :', `$${formatCurrency(vd.valorComprobante)}`);
        }
      }

      drawDashLine();
      y -= 1;

      if (hasBeParkingData) {
        y -= 4;
        drawCenter('Be Parking', helvBold, S.row);
        drawRow('Estimado(a):', bp.dataUser?.nombre || '');
        drawRow('Categoría:', bp.dataUser?.categoria || '');
        drawRow('Pts x compra:', String(bp.puntosGenerados));
        drawRow('Pts acum.:', String(bp.puntosTotales));
        drawRow('Pts para 1h:', String(bp.puntosFaltantes));
        drawDashLine();
        y -= 4;
      } else {
        if (vd.nombreProducto === "Horas") {
          y -= 4;
          drawCenter('2 HORAS GRATIS* por afiliarte a BeParking', helvBold, S.row);
          drawCenter('https://beparking.com.co/', helvBold, S.row);
          drawCenter('*Aplican T&C', helv, S.row);
        }
      }


      if (totalPagar > 0) {
        y -= 4;
        drawCenter('SU FACTURA ELECTRÓNICA SERÁ ENVIADA AL CORREO:', helv, S.small);
        drawCenter(info.facturaElectronica?.correo?.trim() || bp.emailDefault, helvBold, S.small);
        drawDashLine();
        y -= 4;
      }
      y -= 2;
      wrapAndCenter(
        'Este punto de servicio se encuentra amparado con la póliza de Responsabilidad Civil No.2267 de AXA COLPATRIA SEGUROS S.A.',
        helv, S.small, width - 2 * M
      );
      wrapAndCenter(
        'Decreto 041 de 2025 - Parágrafo 3°. La liquidación del valor final del servicio se aproximará al múltiplo de cincuenta pesos m/cte. ($50.00) inferior más cercano',
        helv, S.small, width - 2 * M
      );
      drawDashLine();
      y -= 4;
      drawRow('¿Necesita algo?', '3009109787');
      drawRow('Contacto:', 'www.parking.net.co');

      // Guardar y compartir
      const pdfBase64 = await pdfDoc.saveAsBase64();
      const fileUri = `${FileSystem.cacheDirectory}salida_ticket.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setIsPrintingExit(false);
      await shareAsync(fileUri, { UTI: '.pdf', mimeType: 'application/pdf' });

      // Actualizar estado
      const updated = await actualizarEstadoTicket();
      if (!updated) console.warn('No se actualizó estado de ticket');

    } catch (err) {
      console.error('Error en handlePrintExit:', err);
      setIsPrintingExit(false);
      Alert.alert('Error al generar comprobante', err.message || 'Ocurrió un error inesperado.');
    }
  };


  // Función para obtener el icono de vehículo
  const getVehicleIcon = (typeVehicle) => {
    switch (typeVehicle) {
      case 1: return "directions-car"; // Auto
      case 2: return "two-wheeler"; // Moto
      case 3: return "pedal-bike"; // Bicicleta
      default: return "directions-car"; // Default
    }
  };

  // Función para formatear la hora en formato 12 horas (AM/PM)
  const formatTime = (dateString) => {
    if (!dateString) return "--:--";
    return new Date(dateString).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  const renderCardCarVehiCule = () => {
    if (selectedVehicle?.stateTransaction === 0) {
      return (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Text style={styles.title}>Detalle de Vehículo</Text>
              <View style={styles.vehicleInfo}>
                <MaterialIcons
                  name={getVehicleIcon(selectedVehicle?.typeVehicle)}
                  size={25}
                  color="#90D400"
                />
                <Text style={styles.plateText}>
                  {selectedVehicle?.plate || "No seleccionado"}
                </Text>
              </View>
            </View>

            <View style={styles.detailContainer}>
              <View style={styles.centeredView}>
                {/* Código QR */}
                <Image
                  source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?data=${selectedVehicle?.codeQR || "Detalle de Vehículo"}&size=150x150` }}
                  style={{ width: 150, height: 150 }}
                />

                <Button
                  mode="contained"
                  onPress={handlePrintEntry} // Aquí llamamos a la función de impresión
                  style={styles.buttonTicketeP}
                  disabled={
                    selectedVehicle.digitalTicket === 1
                    || (selectedVehicle.estadoTicket !== 1 && selectedVehicle.estadoTicket !== 3)
                    || isPrintingEntry
                  }
                  loading={isPrintingEntry}
                >
                  Imprimir Tiquete
                </Button>

                {/* Información del vehículo */}
                <View style={styles.timeInfoContainer}>
                  <View style={styles.timeColumn}>
                    <Text style={styles.timeTitle}>Tipo</Text>
                    <Text style={styles.timeSubtitle}>
                      {selectedVehicle?.nombreProducto || "--"}
                    </Text>
                  </View>

                  <View style={styles.timeColumn}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="north-east" size={14} color="white" />
                      </View>
                      <Text style={styles.timeTitle}>Entrada</Text>
                    </View>
                    <Text style={[styles.timeSubtitle, { marginLeft: 15 }]}>
                      {formatTime(selectedVehicle?.entryAt)}
                    </Text>
                  </View>

                  <View style={styles.timeColumn}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="south-west" size={14} color="white" />
                      </View>
                      <Text style={styles.timeTitle}>Salida</Text>
                    </View>
                    <Text style={[styles.timeSubtitle, { marginLeft: 15 }]}>
                      ----------
                    </Text>
                  </View>
                </View>
              </View>

              {/* Botones de Tiquete Perdido y Objetos */}
              <View style={styles.centeredView}>
                <TouchableOpacity
                  style={[styles.button, { justifyContent: "center" }]}
                  onPress={lostTicketModal}
                  disabled={
                    selectedVehicle?.digitalTicket === 1 ||
                    selectedVehicle?.estadoTicket === 1 ||
                    selectedVehicle?.estadoTicket === 3
                  }

                >
                  <Text style={styles.text}>Tiquete Perdido</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { justifyContent: "center", marginTop: 20 }]}
                  onPress={objectsModal}
                  disabled={!selectedVehicle}
                >
                  <Text style={styles.text}>Objetos</Text>
                </TouchableOpacity>

                {/* Input de Placa y Botón de Salida */}
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Placa"
                    value={selectedVehicle?.plate || ""}
                    mode="outlined"
                    theme={{
                      colors: {
                        outline: "#E5E5E5",
                        primary: "#90D400",
                      },
                    }}
                    style={styles.input}
                    editable={false} // Deshabilitar la edición manual
                  />

                  <Button
                    mode="contained"
                    onPress={handleNextStep}
                    style={styles.addButton}
                    disabled={
                      !selectedVehicle /*||
                      selectedVehicle.codeQR?.toUpperCase().trim() !== scannedData?.toUpperCase().trim()*/
                    }
                  >
                    Salida
                  </Button>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      );
    }

    if (selectedVehicle?.stateTransaction === 2) {
      return (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Text style={styles.title}>Detalle de Vehículo</Text>
              <View style={styles.vehicleInfo}>
                <MaterialIcons
                  name={getVehicleIcon(selectedVehicle?.typeVehicle)}
                  size={25}
                  color="#90D400"
                />
                <Text style={styles.plateText}>
                  {selectedVehicle?.plate || "No seleccionado"}
                </Text>
              </View>
            </View>

            <View style={styles.detailContainer}>
              <View style={styles.centeredView}>
                {/* Información del vehículo */}
                <View style={styles.timeInfoContainer}>
                  <View style={styles.timeColumn}>
                    <Text style={styles.timeTitle}>Tipo</Text>
                    <Text style={styles.timeSubtitle}>
                      {selectedVehicle?.nombreProducto || "--"}
                    </Text>
                  </View>

                  <View style={styles.timeColumn}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="north-east" size={14} color="white" />
                      </View>
                      <Text style={styles.timeTitle}>Entrada</Text>
                    </View>
                    <Text style={[styles.timeSubtitle, { marginLeft: 15 }]}>
                      {formatTime(selectedVehicle?.entryAt)}
                    </Text>
                  </View>

                  <View style={styles.timeColumn}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="south-west" size={14} color="white" />
                      </View>
                      <Text style={styles.timeTitle}>Salida</Text>
                    </View>
                    <Text style={[styles.timeSubtitle, { marginLeft: 15 }]}>
                      {formatTime(selectedVehicle?.exitAt)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 25 }}>
              <View style={styles.modalContainer}>
                <View style={styles.iconContainer}>
                  <Image source={require("../../../../../assets/images/infoArching.png")} style={styles.icon} />
                  <Text style={styles.title}>Vehículo Próximo a Salir</Text>
                </View>

                <Text style={styles.message}>Este vehículo ya pago el servicio.</Text>
              </View>
            </View>

            <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                mode="contained"
                onPress={confirmVehicleExit}
                style={styles.exitButtons}
                disabled={!selectedVehicle}
              >
                Confirmar Salida Vehículo
              </Button>

              <Button
                mode="contained"
                onPress={handlePrintExit}
                style={styles.exitButtons}
                disabled={!selectedVehicle || isPrintingExit}
                loading={isPrintingExit}
              >
                Comprobante de Pago
              </Button>
            </View>
          </Card.Content>
        </Card>
      );
    }
  }


  return (
    <>
      {!selectedVehicle ?
        <>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.header}>
                <Text style={styles.title}>Detalle de Vehículo</Text>
                <View style={styles.vehicleInfo}>
                  <MaterialIcons
                    name={getVehicleIcon(selectedVehicle?.typeVehicle)}
                    size={25}
                    color="#90D400"
                  />
                  <Text style={styles.plateText}>
                    {"No seleccionado"}
                  </Text>
                </View>
              </View>

              <View style={styles.detailContainer}>
                <View style={styles.centeredView}>
                  {/* Código QR */}
                  <Image
                    source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?data=${selectedVehicle?.codeQR || "Detalle de Vehículo"}&size=150x150` }}
                    style={{ width: 150, height: 150 }}
                  />

                  <Button
                    mode="contained"
                    onPress={() => { }} // Aquí llamamos a la función de impresión
                    style={styles.buttonTicketeP}
                    disabled={!selectedVehicle}
                  >
                    Imprimir Tiquete
                  </Button>

                  {/* Información del vehículo */}
                  <View style={styles.timeInfoContainer}>
                    <View style={styles.timeColumn}>
                      <Text style={styles.timeTitle}>Tipo</Text>
                      <Text style={styles.timeSubtitle}>
                        {"--"}
                      </Text>
                    </View>

                    <View style={styles.timeColumn}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.iconContainer}>
                          <MaterialIcons name="north-east" size={14} color="white" />
                        </View>
                        <Text style={styles.timeTitle}>Entrada</Text>
                      </View>
                      <Text style={[styles.timeSubtitle, { marginLeft: 15 }]}>
                        {formatTime(selectedVehicle?.entryAt)}
                      </Text>
                    </View>

                    <View style={styles.timeColumn}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.iconContainer}>
                          <MaterialIcons name="south-west" size={14} color="white" />
                        </View>
                        <Text style={styles.timeTitle}>Salida</Text>
                      </View>
                      <Text style={[styles.timeSubtitle, { marginLeft: 15 }]}>
                        ----------
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Botones de Tiquete Perdido y Objetos */}
                <View style={styles.centeredView}>
                  <TouchableOpacity
                    style={[styles.button, { justifyContent: "center" }]}
                    onPress={lostTicketModal}
                    disabled={!selectedVehicle}
                  >
                    <Text style={styles.text}>Tiquete Perdido</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, { justifyContent: "center", marginTop: 20 }]}
                    onPress={objectsModal}
                    disabled={!selectedVehicle}
                  >
                    <Text style={styles.text}>Objetos</Text>
                  </TouchableOpacity>

                  {/* Input de Placa y Botón de Salida */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Placa"
                      value={""}
                      mode="outlined"
                      theme={{
                        colors: {
                          outline: "#E5E5E5",
                          primary: "#90D400",
                        },
                      }}
                      style={styles.input}
                      editable={false} // Deshabilitar la edición manual
                    />

                    <Button
                      mode="contained"
                      onPress={handleNextStep}
                      style={styles.addButton}
                      disabled={!selectedVehicle}
                    >
                      Salida
                    </Button>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        </> :

        renderCardCarVehiCule()
      }
    </>
  );
};

export default VehicleDetailCard;
