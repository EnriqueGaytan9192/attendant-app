import { useState } from "react";
import { useFetch, useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import {
  handleMenu,
  hideAlert,
  setBaseCaja,
  setLabelMessage,
  setLabelTitle,
  setTurnId,
  setValue,
  showAlert
} from "../../../../state/slices/archingSlice";

const useShiftSelectorHook = () => {
  // 1. Obtener númeroIdentificación y empleado de Redux (authSlice, p.e.)
  const { numeroIdentificacion, terminalId, parqueaderoId } = useAppSelector((state) => state.auth);
  // 2. Obtener la lista de turnos con useFetch
  const { data } = useFetch(`/api/parkinglot/${parqueaderoId}`, "GET", {});

  // 3. useLazyFetch para hacer GET/POST dinámicos
  const { getDataFetch, data: st2 } = useLazyFetch();
  //const { getDataFetch: invokeStep3 } = useLazyFetch();

  // 4. Leer variables de Redux (archingSlice, p.e.)
  const { showList, selectedShift, value, idTurn, baseCaja } = useAppSelector((state) => state.arching);
  const dispatch = useAppDispatch();
  console.log("data", baseCaja);
  // 5. Manejadores:
  const handleMenuList = (flag) => dispatch(handleMenu(flag));
  const handleSetValue = (text) => dispatch(setValue(text));
  const [selectedTurnIdentificacion, setSelectedTurnIdentificacion] = useState(null);



  const [turnData, setTurnData] = useState(null);

  // Función para obtener datos del turno con POST
  const fetchTurnData = async () => {
    const payload = {
      id: numeroIdentificacion,
      parqueaderoId: parqueaderoId
    };

    const { data, errorFetch } = await getDataFetch(
      "/api/turn",
      "POST",
      { rq: payload }
    );

    if (errorFetch) {
      console.error("Error fetching turn data:", errorFetch);
      return null;
    }

    if (data) {
      setTurnData(data);
      return data;
    }

    return null;
  };


  const handleSelectshiftList = async (turnoId) => {
    dispatch(setTurnId(turnoId));
    dispatch(handleMenu(false));
  
    // Buscar el turno en la lista y guardar su número de identificación
    const selected = data?.listTurn?.find((t) => t.turnoId === turnoId);
    if (selected) {
      setSelectedTurnIdentificacion(selected.numeroIdentificacion); // 👈 Aquí guardamos el valor correcto
    }
    
    const url = `/api/parkingLotTurnDet?turn_id=${turnoId}&parqueaderoId=${parqueaderoId}&terminalId=${terminalId}`
    console.log("URL", url);
    const { data: det } = await getDataFetch(
      url,
      'GET',
      {}
    );
    if (det) {
      console.log("data", det.turn.box_base);
      dispatch(setBaseCaja(det.turn.box_base));
    }
  };
  

  const verifyValue = async () => {
    const payload = {
      id: Number(selectedTurnIdentificacion), // ✅ Aquí lo usamos
      turn_id: Number(idTurn),
      reportedValue: Number(value),
    };

    console.log("GET /api/tonnage =>", payload);

    // Se consume la API GET; se envía el payload en el objeto rq
    const { data: getResponse, errorFetch: getError } = await getDataFetch(
      `/api/tonnage?id=${payload.id}&turn_id=${payload.turn_id}&terminal_id=${terminalId}&reportedValue=${payload.reportedValue}`,
      "GET"
    );
    console.log("Respuesta GET /api/tonnage:", getResponse);
    if (getError) {
      console.error("Error en GET /api/tonnage:", getError);
      alert("Ocurrió un error: " + (getError.msg || getError.message));
      return;
    }

    let severity;
    switch (getResponse.title) {
      case "Turno Cuadrado":
        severity = "success";
        break;
      case "Descuadres":
        severity = "warning";
        break;
      case "Sobrante":
        severity = "info";
        break;
      default:
        severity = "info";
    }

    dispatch(showAlert({ flag: true, severity: severity }));
    dispatch(setLabelTitle(getResponse.title));
    dispatch(setLabelMessage(getResponse.message));
  };

  const handleConfirm = async () => {
    if (alertState.severity === "success") {
      dispatch(hideAlert());
      return;
    }
  
    const payload = {
      id: Number(selectedTurnIdentificacion), // ✅ Correcto
      turn_id: Number(idTurn),
      reportedValue: Number(value),
    };

    console.log("POST /api/tonnage =>", payload);

    const { data: postResponse, errorFetch: postError } = await getDataFetch(
      "/api/tonnage",
      "POST",
      { rq: payload }
    );
  
    if (postError) {
      console.error("Error en POST /api/tonnage:", postError);
      alert("Ocurrió un error: " + (postError.msg || postError.message));
      return;
    }

    console.log("Respuesta POST /api/tonnage:", postResponse);
    // Se puede notificar al usuario de éxito. Aquí se muestra un modal con estado success.
    dispatch(showAlert({ flag: true, severity: "success" }));
    dispatch(setLabelTitle("Operación Exitosa"));
    dispatch(setLabelMessage("El avance se realizó correctamente."));
  };

  return {
    functions: {
      handleSelectshiftList,
      handleMenuList,
      handleSetValue,
      verifyValue,
      handleConfirm,
      fetchTurnData
    },
    states: {
      showList,
      selectedShift,
      data,
      value,
      st2,
      baseCaja,
      turnData
    },
  };
};

export default useShiftSelectorHook;