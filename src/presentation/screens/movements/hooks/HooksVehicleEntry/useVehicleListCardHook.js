import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch, useLazyFetch } from "../../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../../state/hooks";
import { setAlertMessage, setPlate, setReload, setScannedData, setScannerVisibleParking, setSelectedVehicle, setVehicleDetail, setVehicleList } from "../../../../../state/slices/movementsSlice";

const PRODUCT_TYPE_MAP = {
  "0": "Horas",
  "1": "Mensual",
  "2": "VIP",
  "3": "Pasadia"
};

const useVehicleListCardHook = () => {
  const dispatch = useDispatch();
  const { selectedVehicle, scannedData, scannerVisibleParking, vehiclesList, reload } = useSelector((state) => state.movements);
  const { numeroIdentificacion, parqueaderoId } = useAppSelector((state) => state.auth);
  const [turnId, setTurnId] = useState(null);
  const { getDataFetch } = useLazyFetch();
  let turnoIdPrueba = null;
  const [autos, setAutos] = useState(null);
  const [motos, setMotos] = useState(null);
  const [bicicletas, setBicicletas] = useState(null);
  const { refetch } = useFetch(
    numeroIdentificacion ? "/api/turn" : null,
    "POST",
    {
      rq: {
        id: numeroIdentificacion,
        parqueaderoId: parqueaderoId,
      },
      onComplete: async (res) => {
        if (res?.turn?.turnoId) {
          setTurnId(res.turn.turnoId);
          const { data: vehiclesResponse } = await getDataFetch(
            `/api/vehiclesEntry/active/${res.turn.turnoId}`,
            'GET',
            {}
          );

          if (vehiclesResponse?.data) {
            const vehiclesWithProductType = vehiclesResponse.data.map(vehicle => ({
              ...vehicle,
              typeProduct: PRODUCT_TYPE_MAP[vehicle.typeProduct] || "Desconocido"
            }));
            dispatch(setVehicleList(vehiclesWithProductType));
          }
          const [
            { data: autosResp },
            { data: motosResp },
            { data: bicisResp }
          ] = await Promise.all([
            getDataFetch(`/api/vehiclesActive/1/turnId/${res.turn.turnoId}/facilitie/${parqueaderoId}`, "GET", {}),
            getDataFetch(`/api/vehiclesActive/2/turnId/${res.turn.turnoId}/facilitie/${parqueaderoId}`, "GET", {}),
            getDataFetch(`/api/bicycleActive/turnId/${res.turn.turnoId}/facilitie/${parqueaderoId}`, "GET", {}),
          ]);

          setAutos(autosResp);
          setMotos(motosResp);
          setBicicletas(bicisResp);
        }
      }
    }
  );

  useEffect(() => {
    if (!turnId) return;

    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [turnId]);

  /*const { data: autos, refetch: refetchAutos } = useFetch(`/api/vehiclesActive/1/turnId/${turnoIdPrueba}/facilitie/${parqueaderoId}`, 'GET', {});
  const { data: motos, refetch: refetchMotos } = useFetch(`/api/vehiclesActive/2/turnId/${turnoIdPrueba}/facilitie/${parqueaderoId}`, 'GET', {});
  const { data: bicicletas, refetch: refetchBicicletas } = useFetch(`/api/bicycleActive/turnId/${turnoIdPrueba}/facilitie/${parqueaderoId}`, 'GET', {});*/

  useEffect(() => {

    const intervalId = setInterval(() => {
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (reload.list === true) {
      refetch();
      dispatch(setReload({ name: 'list', value: false }))
    }
  }, [reload.list]);

  const handleSelectVehicle = (vehicle) => {
    dispatch(setSelectedVehicle(vehicle));
    dispatch(setVehicleDetail(vehicle));
    dispatch(setPlate(vehicle.plate));
  };

  const toggleScanner = (state) => {
    dispatch(setScannerVisibleParking(state));
  };

  const handleScan = async (data) => {
    /*let payload = data;
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
    }*/


    dispatch(setScannedData(data));
    console.log("Escaneado:", data);

    const normalizedData = data.trim().toUpperCase();
    const [firstSection] = normalizedData.split("|");

    const foundVehicle = vehiclesList.find(vehicle =>
      vehicle.codeQR.trim().toUpperCase() === firstSection
    );

    console.log("Vehículo encontrado:", foundVehicle);

    if (foundVehicle) {
      dispatch(setSelectedVehicle(foundVehicle));
    } else {
      dispatch(setAlertMessage("No se encontró ningún vehículo/bicicleta con este código."));
    }
  };

  const fetchVehicleByQR = async (ticket) => {
    console.log("Ticket enviado:", ticket);

    const { data, errorFetch } = await getDataFetch(`/api/consultTicket`, "POST", { ticket });

    if (errorFetch) {
      console.error("Error obteniendo datos del vehículo:", errorFetch);
      return;
    }

    if (data?.status && data?.data) {
      dispatch(setSelectedVehicle({
        id: data.data.id,
        plate: data.data.placa,
        typeVehicle: data.data.tipoVehiculo,
        typeProduct: data.data.tipoProducto,
        entryAt: data.data.fechaHoraIngreso,
        codeQR: data.data.codigoQr,
        statusTransaction: data.data.estadoTransaccion,
        clientName: data.data.nombreCliente,
        clientDocument: data.data.documentoCliente,
      }));
      dispatch(setPlate(data.data.placa)); // Asegúrate de pasar la placa
      console.log("Vehículo seleccionado:", data.data);
    } else {
      console.error("No se encontraron datos del vehículo.");
    }
  };

  return {
    autos,
    motos,
    bicicletas,
    selectedVehicle,
    scannerVisibleParking,
    scannedData,
    vehiclesList,
    handleSelectVehicle,
    toggleScanner,
    handleScan,
    fetchVehicleByQR,
  };
};

export default useVehicleListCardHook;
