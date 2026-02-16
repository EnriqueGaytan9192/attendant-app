import { Buffer } from 'buffer';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from "expo-image-picker";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import QRCodeGenerator from "qrcode-generator";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import biciPng from '../../../../../assets/images/bici.png';
import carPng from '../../../../../assets/images/carro.png';
import motoPng from '../../../../../assets/images/moto.png';
import logoPng from '../../../../../assets/logoBeParking.png';
import { useFetch, useLazyFetch } from "../../../../../common/hook/useFetch";
import {
  setBrand,
  setColor,
  setDetailsOptions,
  setDocument,
  setLoadingPhoto,
  setOwner,
  setPhoto,
  setPlateError,
  setPlateRegister,
  setScannerVisible,
  setSelectOptionDoc,
  setSelectedTab,
  setTurnoIdEntry,
  setVehicleType
} from "../../../../../state/slices/movementsSlice";

const useVehicleEntryCardHook = () => {
  const dispatch = useDispatch();
  const { getDataFetch } = useLazyFetch();
  const {
    plateRegister,
    vehicleType,
    plateError,
    loadingPhotos,
    photos,
    owner,
    document,
    brand,
    color,
    selectOptionDoc,
    detailsOptions,
    selectedTab,
    turnoIdEntry,
    scannerVisible
  } = useSelector(
    (state) => state.movements
  );
  const auth = useSelector((state) => state.auth);
  const { numeroIdentificacion, parqueaderoId, terminal, token } = auth || {};

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

  const [documentNumber, setDocumentNumber] = useState("");
  const [isPlateValid, setIsPlateValid] = useState(true); // Estado para controlar la validez de la placa
  const { data: documentTypes, errorFetch } = useFetch("/api/tipoDocumentos", "GET", {});
  const [tieneCuposBicicleta, setTieneCuposBicicleta] = useState(true);

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

  useEffect(() => {
    if (turnoIdEntry) {
      console.log("🧠 Turno ya existe, no consulto otra vez");
      return;
    }

    if (!numeroIdentificacion || !parqueaderoId) return;

    const fetchTurnoId = async () => {
      console.log("🔎 Consultando turno entrada de vehiculos...");

      const { data } = await getDataFetch(
        "/api/turn",
        "POST",
        {
          rq: {
            id: numeroIdentificacion,
            parqueaderoId,
          },
        }
      );

      if (data?.turn?.turnoId) {
        dispatch(setTurnoIdEntry(data.turn.turnoId));
      } else {
        dispatch(setTurnoIdEntry(null));
      }
    };

    fetchTurnoId();

  }, [numeroIdentificacion, parqueaderoId, turnoIdEntry]);




  useEffect(() => {
    if (documentTypes) {
      const formattedDocumentTypes = documentTypes
        .map(doc => ({
          label: doc.nombre,
          value: doc.prefijo.toLowerCase()
        }))
        .sort((a, b) => {
          if (a.label.toUpperCase() === 'OTROS') return 1;
          if (b.label.toUpperCase() === 'OTROS') return -1;
          return a.label.localeCompare(b.label, 'es', { sensitivity: 'base' });
        });

      dispatch(setSelectOptionDoc(formattedDocumentTypes));
    }

    if (errorFetch) {
      console.error("Error al cargar los tipos de documentos", errorFetch);
    }
  }, [documentTypes, errorFetch, dispatch]);


  useEffect(() => {
    if (
      selectedTab === "addBikes" &&
      documentTypes &&
      selectOptionDoc.length === 0
    ) {
      const formatted = documentTypes
        .map(doc => ({
          label: doc.nombre,
          value: doc.prefijo.toLowerCase()
        }))
        .sort((a, b) => {
          if (a.label.toUpperCase() === 'OTROS') return 1;
          if (b.label.toUpperCase() === 'OTROS') return -1;
          return a.label.localeCompare(b.label, 'es', { sensitivity: 'base' });
        });

      dispatch(setSelectOptionDoc(formatted));
    }
  }, [selectedTab, documentTypes, selectOptionDoc.length, dispatch]);


  useEffect(() => {
    if (!parqueaderoId || !token) return;

    const fetchCupos = async () => {
      try {
        const response = await fetch(
          `https://inside-back-dev.parking.net.co/parkingLot/${parqueaderoId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Respuesta completa del parqueadero:", data);

        const cupoBicicleta = Array.isArray(data?.cupos)
          ? data.cupos.find(c =>
            String(c.nombre).toLowerCase().includes("bicicleta")
          )
          : null;

        console.log("Cupo Bicicleta encontrado:", cupoBicicleta);

        if (cupoBicicleta && cupoBicicleta.cantidad > 0) {
          setTieneCuposBicicleta(true);
        } else {
          setTieneCuposBicicleta(false);
        }
      } catch (error) {
        console.error("Error al obtener cupos del parqueadero:", error);
        setTieneCuposBicicleta(false);
      }
    };

    fetchCupos();
  }, [parqueaderoId, token]);



  const validatePlate = (plate) => {
    plate = plate.replace(/\s+/g, '').toUpperCase();
    if (plate.length > 0) {
      if (plate.length === 5) {
        if (/^[A-Z]{3}[0-9]{2}$/.test(plate)) {
          dispatch(setVehicleType("moto"));
          dispatch(setPlateError(""));
          setIsPlateValid(true); // La placa es válida
          return true;
        }
      } else if (plate.length === 6) {
        if (/^[A-Z]{3}[0-9]{3}$/.test(plate)) {
          dispatch(setVehicleType("auto"));
          dispatch(setPlateError(""));
          setIsPlateValid(true); // La placa es válida
          return true;
        } else if (/^[A-Z]{3}[0-9]{2}[A-Z]$/.test(plate)) {
          dispatch(setVehicleType("moto"));
          dispatch(setPlateError(""));
          setIsPlateValid(true); // La placa es válida
          return true;
        } else if (/^[A-Z]{2}[0-9]{4}$/.test(plate)) {
          dispatch(setVehicleType("diplomatic"));
          dispatch(setPlateError(""));
          setIsPlateValid(true); // La placa es válida
          return true;
        } else {
          dispatch(setPlateError("Placa inválida para autos o motos."));
          setIsPlateValid(false); // La placa no es válida
          return false;
        }
      } else if (plate.length === 7) {
        if (/^[A-Z][0-9]{2}[A-Z]{2}[0-9][A-Z]$/.test(plate)) {
          dispatch(setVehicleType("foreign"));
          dispatch(setPlateError(""));
          setIsPlateValid(true); // La placa es válida
          return true;
        } else {
          dispatch(setPlateError("Placa inválida. Debe tener el formato: 1 letra, 2 números, 2 letras, 1 número, 1 letra."));
          setIsPlateValid(false); // La placa no es válida
          return false;
        }
      } else {
        dispatch(setPlateError("Placa no cumple con el formato requerido."));
        setIsPlateValid(false); // La placa no es válida
        return false;
      }
    }
  };


  const handlePlateChange = (text) => {
    const formattedPlate = text.toUpperCase();
    dispatch(setPlateRegister(formattedPlate));
    validatePlate(formattedPlate);
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  const takePhoto = async (photoKey) => {
    dispatch(setLoadingPhoto({ photoKey, status: true }));

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      dispatch(setLoadingPhoto({ photoKey, status: false }));
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      dispatch(setPhoto({ photoKey, uri: result.assets[0].uri }));
    }

    dispatch(setLoadingPhoto({ photoKey, status: false }));
  };

  const handleDetailsChange = (key, value) => {
    dispatch(setDetailsOptions({ [key]: value }));
  };


  const submitEntry = async (ticketDigital, numCelular) => {
    if (
      selectedTab === "addBikes" &&
      (!owner || !document || !documentNumber || !brand || !color ||
        !detailsOptions.marco || !detailsOptions.frenos || !detailsOptions.ruedas ||
        !detailsOptions.sillin || !detailsOptions.pintura ||
        !photos.photo1 || !photos.photo2)
    ) {
      Alert.alert("Llenar todos los campos", "Por favor, complete todos los campos, incluyendo las fotos.");
      return false;
    }

    let body = {};

    if (selectedTab === "addVehicles") {

      const excludedParqueaderosGoPass = [50, 51, 53, 55, 57, 63, 65, 73, 76, 77, 78, 79, 81];
      const excludedParqueaderosRuedaz = [65];

      // Validación Gopass
      if (!excludedParqueaderosGoPass.includes(parqueaderoId)) {
        try {
          const gopassResponse = await fetch(
            `https://2uj5iipka9.execute-api.us-east-1.amazonaws.com/dev/gopass/rest/main/getPlacasGopass/${plateRegister}/999`
          );

          const gopassJson = await gopassResponse.json();
          const mensajeGopass = gopassJson?.mensaje || "";

          if (mensajeGopass.toLowerCase().includes("si es gopass")) {
            Alert.alert(
              "Ingreso App GoPass",
              `La placa ya está registrada como Gopass. No puede ser ingresada manualmente.`
            );
            return false;
          }
        } catch (error) {
          console.error("Error al validar con Gopass:", error);
          Alert.alert("Error", "No se pudo validar la placa con Gopass.");
          return false;
        }
      }

      // Validación Ruedaz
      if (!excludedParqueaderosRuedaz.includes(parqueaderoId)) {
        try {
          const ruedazResponse = await fetch(
            'https://v7l0wews5g.execute-api.us-east-1.amazonaws.com/dev/interoperability/vehicle-subscription-check',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ plate: plateRegister }),
            }
          );

          const ruedazJson = await ruedazResponse.json();
          const { message } = ruedazJson.body;

          if (message === "Placa encontrada - Suscripción activa") {
            Alert.alert(
              "Ingreso Ruedaz",
              "La placa ya cuenta con un plan activo en Ruedaz y no puede ser ingresada manualmente."
            );
            return false;
          }

          if (message === "Placa encontrada - Suscripción vencida") {
            let continuar = false;

            await new Promise((resolve) => {
              Alert.alert(
                "Suscripción vencida Ruedaz",
                "La placa tiene una suscripción vencida en Ruedaz. ¿Desea continuar con el ingreso?",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                    onPress: () => resolve(false),
                  },
                  {
                    text: "Sí, continuar",
                    onPress: () => {
                      Alert.alert(
                        "Advertencia",
                        "Por favor informar al usuario que esta entrada se realizará bajo las tarifas del parqueadero y se aplicará el cobro correspondiente según dichas tarifas.",
                        [
                          {
                            text: "Aceptar",
                            onPress: () => resolve(true),
                          }
                        ]
                      );
                    }
                  }
                ]
              );
            }).then((respuesta) => continuar = respuesta);

            if (!continuar) return false;
          }

        } catch (error) {
          console.error("Error al validar con Ruedaz:", error);
          Alert.alert("Error", "No se pudo validar la placa con Ruedaz.");
          return false;
        }
      }

      // Construir body para vehículos
      body = {
        plate: plateRegister,
        terminal,
        parkingId: parqueaderoId,
        turnoId: turnoIdEntry,
        tipoProducto: "0",
        nameClient: "",
        documentClient: "",
        brandBici: "",
        colourBici: "",
        cuadroBici: "",
        pinturaBici: "",
        sillinBici: "",
        ruedasBici: "",
        frenosBici: "",
        photoBici: "",
        photoDocument: "",
        remarks: "",
        tipoDocumentoId: 1,
        ticketDigital,
        numCelular,
      };
    }

    if (selectedTab === "addBikes") {
      const uploadedUrls = await saveImages();
      if (uploadedUrls.length < 2) {
        Alert.alert("Advertencia", "Ambas fotos son necesarias (Bicicleta y Cédula).");
        return false;
      }

      const selectedDocType = selectOptionDoc.find(item => item.value === document);
      const tipoDocumentoId = selectedDocType && selectedDocType.id ? selectedDocType.id : 1;

      body = {
        plate: "",
        terminal,
        parkingId: parqueaderoId,
        turnoId: turnoIdEntry,
        tipoProducto: "0",
        nameClient: owner,
        documentClient: documentNumber,
        brandBici: brand,
        colourBici: color,
        cuadroBici: detailsOptions.marco || "",
        pinturaBici: detailsOptions.pintura || "",
        sillinBici: detailsOptions.sillin || "",
        ruedasBici: detailsOptions.ruedas || "",
        frenosBici: detailsOptions.frenos || "",
        photoBici: uploadedUrls[0] || "",
        photoDocument: uploadedUrls[1] || "",
        remarks: "",
        tipoDocumentoId,
        ticketDigital,
        numCelular,
      };
    }

    try {
      console.log("Body: ", body);
      body.turnoId = body.turnoId ? body.turnoId : turnoIdEntry;

      const { data, errorFetch } = await getDataFetch("/api/insertEntry", "POST", { rq: body });

      if (errorFetch) {
        console.log("ErrorFetch: ", errorFetch);
        Alert.alert("Alerta", errorFetch.message || "Error al registrar la entrada.");
        return false;
      } else {
        Alert.alert("Éxito", "Entrada registrada exitosamente.");
        dispatch(setOwner(""));
        dispatch(setDocument(""));
        dispatch(setBrand(""));
        dispatch(setColor(""));
        dispatch(setDetailsOptions({
          marco: null,
          frenos: null,
          ruedas: null,
          sillin: null,
          pintura: null,
        }));
        setDocumentNumber("");
        dispatch(setPhoto({ photoKey: "photo1", uri: "" }));
        dispatch(setPhoto({ photoKey: "photo2", uri: "" }));
        return true;
      }
    } catch (error) {
      console.error("Error en submitEntry:", error);
      Alert.alert("Error", "Se produjo un error inesperado.");
      return false;
    }
  };




  const saveImages = async () => {
    const errors = [];
    const uploadedUrls = [];

    const photosArray = [photos?.photo1, photos?.photo2];

    if (!photosArray[0] || !photosArray[1]) {
      Alert.alert("Advertencia", "Favor de cargar ambas imágenes (Bicicleta y Cédula).");
      return []; // Retorna un array vacío si alguna foto falta
    }

    // Subir las imágenes si ambas están presentes
    await Promise.all(
      photosArray.map(async (image, i) => {
        try {
          const formData = new FormData();
          const date = new Date();
          const timestamp = date.toISOString().replace(/[-:.]/g, '');
          const fileName = `bike_${i + 1}_${timestamp}.jpg`;

          const type = i === 0 ? 1 : 2;

          const jsonBody = {
            name_file: fileName,
            file_type: type,
            id_file_module: 3,
            destination: 11,
            fecha_vencimiento: '24/05/2024'
          };
          formData.append("json", JSON.stringify(jsonBody));

          formData.append("file", {
            uri: image,
            type: "image/jpeg",
            name: fileName
          });

          const { data, errorFetch } = await getDataFetch("/api/s3Attendant", "FILES", { rq: formData });

          if (data && data.fileUrl) {
            uploadedUrls.push(data.fileUrl);
          } else {
            throw new Error(`Error al subir la imagen ${i + 1}: ${errorFetch?.message || "Desconocido"}`);
          }
        } catch (error) {
          errors.push({ index: i, error: error.message || error });
        }
      })
    );

    if (errors.length > 0) {
      Alert.alert(`Hubo errores al subir ${errors.length} imagen(es). Verifique e intente nuevamente.`);
      return []; // Retorna un array vacío si hubo errores
    }

    return uploadedUrls; // Retorna las URLs de las imágenes subidas
  };

  const toggleScanner = (state) => {
    dispatch(setScannerVisible(state));
  };

  const handleScan = (data) => {
    let payload = data;
    if (payload.startsWith("&")) {
      payload = payload.slice(1);
    }

    let decoded;
    try {
      if (typeof atob === "function") {
        decoded = atob(payload);
      } else {
        decoded = Buffer.from(payload, "base64").toString("utf-8");
      }
    } catch (err) {
      console.error("Error al decodificar Base64:", err);
      Alert.alert("QR inválido", "No se pudo decodificar el código Base64.");
      return;
    }

    console.log("Valor QR decodificado:", decoded);

    const regex = /^([A-Z0-9]+)\|([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12})\|(\d+)$/;


    const cleanData = decoded.trim().toUpperCase();
    const match = cleanData.match(regex);

    if (!match) {
      Alert.alert(
        "QR inválido",
        "El código debe tener el formato: PLACA|IDCLIENTE|IDDISPOSITIVO"
      );
      return;
    }

    const placa = match[1];

    const validPlaca =
      /^[A-Z]{3}[0-9]{3}$/.test(placa) ||
      /^[A-Z]{3}[0-9]{2}$/.test(placa) ||
      /^[A-Z]{3}[0-9]{2}[A-Z]$/.test(placa) ||
      /^[A-Z][0-9]{2}[A-Z]{2}[0-9][A-Z]$/.test(placa)

    if (!validPlaca) {
      Alert.alert(
        "Placa inválida",
        "La placa escaneada no tiene un formato válido."
      );
      return;
    }

    handlePlateChange(placa);
    toggleScanner(false);
  };


  const infoTicketEntry = async () => {
    if (!plateRegister) {
      console.error("No se ha seleccionado un vehículo.");
      return null;
    }

    const url = `/api/ticket/${plateRegister}/turn/${turnoIdEntry}`;
    console.log("URL para obtener información de ticket:", url);

    try {
      const res = await getDataFetch(url, "GET");
      if (res.errorFetch) {
        throw new Error(res.errorFetch.message || "Error al obtener la información del ticket.");
      }
      //setTicketInfo(res);
      //dispatch(setReload({ name: 'list', value: true }));
      return res;
    } catch (err) {
      console.error("Error en infoTicketEntry:", err);
      Alert.alert("Error", "No se pudo obtener la información de entrada.");
      return null;
    }
  };

  const sanitizeText = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/\u202f/g, ' ')   // espacio estrecho
      .replace(/\u00a0/g, ' ')   // NBSP si lo hubiera
      // puedes añadir más replace si detectas otros chars problemáticos
      ;
  };

  const embedIcon = async (pdfDoc, moduleReference, desiredWidthPt) => {
    await Asset.loadAsync(moduleReference);
    const asset = Asset.fromModule(moduleReference);

    if (!asset.localUri) {
      throw new Error('asset.localUri es null para ' + moduleReference);
    }

    const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const img = await pdfDoc.embedPng(base64, { base64: true });
    const { width, height } = img.scale(desiredWidthPt / img.width);
    return { img, width, height };
  };

  const handlePrintEntry = async () => {
    try {
      // ————————————————
      // 1. Datos y fecha
      // ————————————————
      let ticketResWrapper = await withTimeout(infoTicketEntry(), 10000);
      const ticketRes = ticketResWrapper.data;
      const rawDate = ticketRes.data.entryAt;
      const date = new Date(rawDate);

      // 2) Formateo manual para “Octubre 30, 2023, 10:00 a.m.”
      const day = date.getDate();
      const year = date.getFullYear();
      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      const monthName = monthNames[date.getMonth()];
      let timeStr = date.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      // Ajusta am/pm a “a.m.” / “p.m.”
      timeStr = timeStr
        .replace(/\bam\b/, 'a.m.')
        .replace(/\bpm\b/, 'p.m.');

      const formattedDate = `${monthName} ${day}, ${year}, ${timeStr}`;

      // ————————————————
      // 2. Crear PDF y páginas
      // ————————————————
      const pdfDoc = await PDFDocument.create();
      const PAGE_WIDTH = 300;
      const PAGE_HEIGHT = 600;
      const MARGIN = 15;

      const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      const { width, height } = page.getSize();
      let yCursor = height - MARGIN;

      const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const drawCentered = (text, y, { size = 8, font = helv, color = rgb(0, 0, 0) } = {}) => {
        const clean = sanitizeText(text);             // **Limpia aquí**
        const tw = font.widthOfTextAtSize(clean, size);
        page.drawText(clean, {
          x: (width - tw) / 2,
          y,
          size,
          font,
          color,
        });
      };

      // ————————————————
      // 3. Logo
      // ————————————————
      await Asset.loadAsync(logoPng);
      const logoAsset = Asset.fromModule(logoPng);
      if (!logoAsset.localUri) throw new Error('No logoUri');
      const logoB64 = await FileSystem.readAsStringAsync(logoAsset.localUri, {
        encoding: FileSystem.EncodingType.Base64
      });
      const logoImage = await pdfDoc.embedPng(logoB64, { base64: true });
      const logoDims = logoImage.scale(0.3);
      page.drawImage(logoImage, {
        x: (width - logoDims.width) / 2,
        y: yCursor - logoDims.height,
        width: logoDims.width,
        height: logoDims.height,
      });
      yCursor -= logoDims.height * 0.7;
      // ————————————————
      // 4. Nit, nombre empresa, facility, dirección
      // ————————————————
      drawCentered(ticketRes.parking, yCursor, { size: 8 });  // NIT
      yCursor -= 12;
      drawCentered(ticketRes.parkingGo, yCursor, { size: 12, font: helvBold });
      yCursor -= 16;
      page.drawLine({
        start: { x: MARGIN, y: yCursor },
        end: { x: width - MARGIN, y: yCursor },
        thickness: 1,
        color: green,
        dashArray: [2, 2],
      });
      yCursor -= 12;
      drawCentered(ticketRes.facilitie, yCursor, { size: 8 });
      yCursor -= 10;
      drawCentered(ticketRes.address, yCursor, { size: 8 });
      yCursor -= 14;

      // ————————————————
      // 5. Horario en verde
      // ————————————————
      const green = rgb(0.6, 0.85, 0);
      drawCentered(ticketRes.schedule, yCursor, { size: 8, color: green });
      yCursor -= 14;

      // ————————————————
      // 6. Línea punteada verde
      // ————————————————
      page.drawLine({
        start: { x: MARGIN, y: yCursor },
        end: { x: width - MARGIN, y: yCursor },
        thickness: 1,
        color: green,
        dashArray: [2, 2],
      });
      yCursor -= 12;

      // ————————————————
      // 7. Texto de póliza (wrap)
      // ————————————————
      const wrapText = (txt, max) => {
        const words = txt.split(' '), lines = [], cur = [];
        for (let w of words) {
          if ((cur.join(' ') + ' ' + w).length <= max) cur.push(w);
          else { lines.push(cur.join(' ')); cur.splice(0, cur.length, w); }
        }
        cur.length && lines.push(cur.join(' '));
        return lines;
      };
      wrapText(ticketRes.police, 45).forEach(line => {
        drawCentered(line, yCursor, { size: 7 });
        yCursor -= 9;
      });
      yCursor -= 4;
      yCursor -= 20;
      // ————————————————
      // 8. COMPROBANTE DE ENTRADA
      // ————————————————

      drawCentered(ticketRes.receipt, yCursor, { size: 10, font: helvBold });
      yCursor -= 14;

      // ————————————————
      // 9. Matrícula y fecha
      // ————————————————
      drawCentered(ticketRes.data.plate, yCursor, { size: 14, font: helvBold, color: green });
      yCursor -= 18;
      drawCentered(formattedDate, yCursor, { size: 8 });
      yCursor -= 14;

      // ————————————————
      // 10. QR
      // ————————————————
      const qrText = ticketRes.data.codeQR || "";
      if (qrText.trim().length > 0) {
        // Crea el QR (versión automática, corrección L)
        const qr = QRCodeGenerator(0, "L");
        qr.addData(qrText);
        qr.make();

        const moduleCount = qr.getModuleCount();
        const qrSize = 120;                       // tamaño total en pt
        const moduleSize = qrSize / moduleCount;  // tamaño de cada “pixel”

        // Calcula posición centrada
        const qrX = (width - qrSize) / 2;
        const qrY = yCursor - qrSize;

        // Dibuja cada módulo oscuro como un cuadrado negro
        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
              page.drawRectangle({
                x: qrX + col * moduleSize,
                y: qrY + (moduleCount - 1 - row) * moduleSize,  // invertimos eje Y
                width: moduleSize,
                height: moduleSize,
                color: rgb(0, 0, 0),
              });
            }
          }
        }

        // Ajusta cursor por debajo del QR, dejando 16pt de espacio
        yCursor = qrY - 16;
      } else {
        // Si no hay texto de QR, simplemente baja el cursor
        yCursor -= 16;
      }
      yCursor -= 20;
      // ————————————————
      // 11. Tarifas, estado, footer
      // ————————————————
      const iconSize = 20;
      // espacio entre icono y texto de precio
      const gapIconText = 4;
      // espacio entre cada grupo (auto vs moto vs bici)
      const gapBetweenGroups = 20;

      // Precios como strings
      const priceCar = `${ticketRes.car}/MIN`;
      const priceMoto = `${ticketRes.motorcycle}/MIN`;
      const priceBici = `${ticketRes.bicycle}/MIN`;

      // Embebe y escala cada icono
      const { img: carImage, width: carW, height: carH } = await embedIcon(pdfDoc, carPng, iconSize);
      const { img: motoImage, width: motoW, height: motoH } = await embedIcon(pdfDoc, motoPng, iconSize);
      const { img: biciImage, width: biciW, height: biciH } = await embedIcon(pdfDoc, biciPng, iconSize);

      // Calcula anchuras de texto
      const priceW1 = helv.widthOfTextAtSize(priceCar, 8);
      const priceW2 = helv.widthOfTextAtSize(priceMoto, 8);
      const priceW3 = helv.widthOfTextAtSize(priceBici, 8);

      // Anchura total de cada “grupo” = icono + gap + texto
      const groupW1 = carW + gapIconText + priceW1;
      const groupW2 = motoW + gapIconText + priceW2;
      const groupW3 = biciW + gapIconText + priceW3;

      // Anchura total combinada (grupos + gaps entre grupos)
      const totalW = groupW1 + groupW2 + groupW3 + gapBetweenGroups * 2;

      // Posición de inicio para centrar todo
      let x0 = (width - totalW) / 2;
      // Usamos la misma Y para iconos y texto, ajustando la línea base del texto
      const yIcon = yCursor;
      const yText = yIcon + (iconSize - 8) / 2;  // centro vertical aproximado

      // 1) Dibuja auto + precio
      page.drawImage(carImage, { x: x0, y: yIcon, width: carW, height: carH });
      page.drawText(priceCar, {
        x: x0 + carW + gapIconText,
        y: yText,
        size: 8,
        font: helv
      });

      // 2) Avanza X para el siguiente grupo (moto)
      x0 += groupW1 + gapBetweenGroups;
      page.drawImage(motoImage, { x: x0, y: yIcon, width: motoW, height: motoH });
      page.drawText(priceMoto, {
        x: x0 + motoW + gapIconText,
        y: yText,
        size: 8,
        font: helv
      });

      // 3) Grupo bici
      x0 += groupW2 + gapBetweenGroups;
      page.drawImage(biciImage, { x: x0, y: yIcon, width: biciW, height: biciH });
      page.drawText(priceBici, {
        x: x0 + biciW + gapIconText,
        y: yText,
        size: 8,
        font: helv
      });

      // Por último, baja el cursor para la siguiente sección
      yCursor = yIcon - iconSize - 12;
      // ————————————————
      // 12. Pie de página: Ayuda y contacto
      // ————————————————

      // Márgenes horizontales que estés usando
      const FONT_SIZE = 8;
      const LINE_HEIGHT = FONT_SIZE + 2; // por ejemplo 10 pt

      // Texto dinámico y estático
      const phoneText = sanitizeText(ticketRes.helpNumber);
      const mailText = 'www.parking.net.co';

      // Calcula posiciones verticales
      // Partimos de yCursor tras la sección anterior
      // Línea 1:
      const yLine1 = yCursor;
      // Línea 2:
      const yLine2 = yLine1 - LINE_HEIGHT;

      // Dibuja texto a la izquierda
      page.drawText('¿Necesitas algo?', {
        x: MARGIN,
        y: yLine1,
        size: FONT_SIZE,
        font: helv,
      });
      page.drawText('Contacta Servicio al cliente', {
        x: MARGIN,
        y: yLine2,
        size: FONT_SIZE,
        font: helv,
      });

      // Dibuja teléfono alineado a la derecha
      const phoneW = helv.widthOfTextAtSize(phoneText, FONT_SIZE);
      page.drawText(phoneText, {
        x: width - MARGIN - phoneW,
        y: yLine1,
        size: FONT_SIZE,
        font: helv,
      });

      // Dibuja mail alineado a la derecha, en la segunda línea
      const mailW = helv.widthOfTextAtSize(mailText, FONT_SIZE);
      page.drawText(mailText, {
        x: width - MARGIN - mailW,
        y: yLine2,
        size: FONT_SIZE,
        font: helv,
      });

      return await pdfDoc.saveAsBase64({ dataUri: false });
    } catch (err) {
      console.error(err);
      //Alert.alert('Error al generar PDF', err.message);
      return null;
    }
  };

  const sendPdfAndNotify = async (destinationNumber) => {
    try {
      console.log("⏳ [sendPdfAndNotify] Inicio. destinationNumber:", destinationNumber);

      // 1) Generar PDF Base64
      const base64Pdf = await handlePrintEntry();
      if (!base64Pdf) {
        console.error("❌ handlePrintEntry() devolvió null.");
        return false;
      }
      //console.log("✅ Base64 generado. Length:", base64Pdf.length);

      // 2) Armar body para /api/ticketDigital
      const requestBody = { base64Pdf, fileName: "comprobante_entrada.pdf" };
      //console.log("📦 Body que se enviará a /api/ticketDigital:", requestBody);

      // 3) Llamada imperativa usando useLazyFetch
      console.log("📤 [sendPdfAndNotify] Invocando getDataFetch('/api/ticketDigital', 'POST')...");
      const { data: uploadData, errorFetch: uploadError } = await getDataFetch(
        "/api/ticketDigital",
        "POST",
        { rq: requestBody }
      );

      if (uploadError) {
        console.error(
          "❌ [sendPdfAndNotify] Error al subir PDF vía /api/ticketDigital:",
          uploadError
        );
        return false;
      }
      console.log(
        "📝 [sendPdfAndNotify] Respuesta correcta de /api/ticketDigital:",
        uploadData
      );

      const pdfUrl = uploadData?.url;
      if (!pdfUrl) {
        console.error(
          "❌ [sendPdfAndNotify] /api/ticketDigital devolvió data sin url:",
          uploadData
        );
        return false;
      }
      console.log("✅ PDF subido. URL pública obtenida:", pdfUrl);

      // 4) Enviar esa URL a la Lambda de WhatsApp (fetch puro o también con getDataFetch)
      console.log("📤 [sendPdfAndNotify] Enviando a Lambda WhatsApp...");
      const whatsappPayload = { ToNumber: destinationNumber, PdfUrl: pdfUrl };

      // Si tu Lambda está expuesta en el mismo dominio de tu backend, podrías llamar 
      // getDataFetch("/ruta/lambda-whatsapp", "POST", { rq: whatsappPayload }), 
      // pero asumo que es un endpoint externo, así que usamos fetch directo:
      const whatsappResponse = await fetch(
        "https://gyrcinysh7clqaqoirjndb7cje0xcyhr.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(whatsappPayload),
        }
      );
      console.log("📶 [sendPdfAndNotify] Status Lambda WhatsApp:", whatsappResponse.status);
      const whatsappText = await whatsappResponse.text();
      console.log("📥 [sendPdfAndNotify] Cuerpo crudo de Lambda WhatsApp:", whatsappText);

      if (!whatsappResponse.ok) {
        console.error(
          "❌ [sendPdfAndNotify] Error HTTP de Lambda WhatsApp:",
          whatsappResponse.status,
          whatsappText
        );
        return false;
      }

      let whatsappData;
      try {
        whatsappData = JSON.parse(whatsappText);
        console.log("📝 [sendPdfAndNotify] JSON parseado de Lambda WhatsApp:", whatsappData);
      } catch (e) {
        console.error(
          "❌ JSON.parse falló en respuesta de Lambda WhatsApp:",
          e,
          "\nTexto bruto:", whatsappText
        );
        return false;
      }

      if (whatsappData.success !== true) {
        console.error(
          "❌ Lambda devolvió success=false. Objeto completo:",
          whatsappData
        );
        return false;
      }
      console.log("✅ WhatsApp enviado. SID:", whatsappData.data.sid);
      return true;

    } catch (err) {
      console.error("🚨 Excepción en sendPdfAndNotify:", err);
      return false;
    }
  };

  return {
    plateRegister,
    vehicleType,
    plateError,
    loadingPhotos,
    photos,
    owner,
    document,
    brand,
    color,
    selectOptionDoc,
    detailsOptions,
    selectedTab,
    scannerVisible,
    sendPdfAndNotify,
    handlePlateChange,
    takePhoto,
    handleDetailsChange,
    submitEntry,
    saveImages,
    toggleScanner,
    handleScan,
    documentNumber,
    isPlateValid,
    setDocumentNumber: setDocumentNumber,

    setOwner: (value) => dispatch(setOwner(value)),
    setDocument: (value) => dispatch(setDocument(value)),
    setBrand: (value) => dispatch(setBrand(value)),
    setColor: (value) => dispatch(setColor(value)),
    setSelectOptionDoc: (value) => dispatch(setSelectOptionDoc(value)),
    setSelectedTab: (tab) => dispatch(setSelectedTab(tab)),
    parqueaderoId,
    tieneCuposBicicleta
  };
};

export default useVehicleEntryCardHook;
