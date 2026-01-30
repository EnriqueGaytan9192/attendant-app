import { useEffect, useState } from "react";
import { Alert } from "react-native"; // Importar Alert para mostrar errores
import { useDispatch, useSelector } from "react-redux";
import { useFetch, useLazyFetch } from "../../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../../state/hooks";
import { setCedulaBeParking } from "../../../../../state/slices/authSlice";
import { nextStep, onCheckedElement, previousStep, resetAuth, setAux, setBillingSummary, setBonus, setSearchResult, setVehicleExitData } from "../../../../../state/slices/movementsSlice";

const useBeParkingDepartureHook = () => {
  const [discountTotal, setDiscountTotal] = useState(0);
  const dispatch = useDispatch();
  const [document, setDocument] = useState("");
  const aux = useAppSelector((state) => state.movements.aux);
  const [checked, setChecked] = useState();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { numeroIdentificacion, parqueaderoId } = useAppSelector((state) => state.auth);
  const plate = useSelector((state) => state.movements.selectedVehicle?.plate);
  const vehicleExitData = useSelector((state) => state.movements.vehicleExitData);
  const searchResult = useSelector((state) => state.movements.searchResult);
  const bonusList = useSelector((state) => state.movements.bonusList);
  const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);
  const [isCalculatingBonuses, setIsCalculatingBonuses] = useState(false);
  const [error, setError] = useState(null);

  const { getDataFetch } = useLazyFetch();
  const { getDataFetch: getUserInfo } = useLazyFetch();
  const { getDataFetch: getBonus } = useLazyFetch();

  useFetch(`/api/turn`, 'POST', {
    rq: {
      id: numeroIdentificacion || '',
      parqueaderoId: parqueaderoId
    },
    onComplete: async (turnResponse) => {
      await conCompleteCallBack(turnResponse);
    },
    onError: (errorFetch) => {
      console.log("❌ Error al obtener el turno:", errorFetch);
      setError(errorFetch);
      handleError(errorFetch); // Manejar el error cuando no se obtiene el turno
    }
  });

  const conCompleteCallBack = async (turnResponse) => {
    const { turn } = turnResponse;
    await fetchExitData(turn.turnoId);
  }

  const fetchExitData = async (turnId) => {
    if (!turnId || !plate) {
      handleError("🔴 No se puede consultar salida: turnId o plate no están disponibles");
      return;
    }

    setLoading(true);

    try {
      const url = `/api/vehiclesExit?plate=${plate}&turnId=${turnId}&entryVehicleId=${selectedVehicle?.vehicleId}`;
      console.log("🔗 URL generada para la petición de salida:", url);

      // 🔍 Hacer la petición
      const { data: vehicleExitResponse, errorFetch } = await getDataFetch(url, 'GET', {});

      if (vehicleExitResponse) {
        dispatch(setVehicleExitData(vehicleExitResponse.vehicleData));
        console.log("Datos de salida del vehículo obtenidos:", vehicleExitResponse.vehicleData);

        if (vehicleExitResponse.vehicleData.nombreProducto !== 'Horas') {
          handleNext();
        }
      }

      handleError(errorFetch); // Manejar errores de fetch
    } catch (err) {
      setError(err);
      handleError(err); // Manejar errores de excepción
    } finally {
      setLoading(false);
    }
  };


  //MANEJAR ERROR
  const handleError = (errorFetch) => {
    if (errorFetch) {
      console.error('Error en la operación:', errorFetch);

      // Definir un mensaje de error más comprensible para el operario
      let errorMessage = "El usuario no se encuentra registrado en Be Parking.";

      // Si el error es por un estado de servicio, lo especificamos
      if (errorFetch?.status === 503) {
        //errorMessage = "El servicio está temporalmente no disponible. Intente más tarde.";
      } else if (errorFetch?.error === "unexpected-error") {
        errorMessage = "Se produjo un error inesperado. Por favor, contacte al soporte.";
      }

      // Usar Alert para mostrar el mensaje de error
      Alert.alert(
        "Error", // Título del alert
        errorMessage, // Mensaje del error amigable para el operario
        [{ text: "OK" }] // Botón para cerrar el alert
      );
    }
  }

  const handleError2 = (errorFetch) => {
    if (errorFetch) {
      console.error('Error en la operación:', errorFetch);

      // Definir un mensaje de error más comprensible para el operario
      let errorMessage = "El usuario no cuenta con bonos disponibles.";

      // Si el error es por un estado de servicio, lo especificamos
      if (errorFetch?.status === 503) {
        //errorMessage = "El servicio está temporalmente no disponible. Intente más tarde.";
      } else if (errorFetch?.error === "unexpected-error") {
        errorMessage = "Se produjo un error inesperado. Por favor, contacte al soporte.";
      }

      // Usar Alert para mostrar el mensaje de error
      Alert.alert(
        "Usuario sin bonos", // Título del alert
        errorMessage, // Mensaje del error amigable para el operario
        [{ text: "OK" }] // Botón para cerrar el alert
      );
    }
  }

  const onSearch = async () => {
    const ok = await findCedula();
    if (ok) {
      await invokeBonusApi();
    }
  };

  const findCedula = async () => {
    dispatch(setCedulaBeParking(document))
    setLoading(true);
    const { data, errorFetch, loading } = await getUserInfo(`/api/beParking/consultaInfoUsuario/${document}`, 'GET', {});
    setLoading(loading);
    if (data) {
      dispatch(setSearchResult(data));
      return true;
    }
    if (errorFetch) {
      handleError(errorFetch);
      return false;           // <-- Indica fallo
    }
    // Manejar el error si ocurre
  }

  const invokeBonusApi = async () => {
    setLoading(true);
    dispatch(setCedulaBeParking(document))
    console.log("valor beparkimg", document)
    const { data, errorFetch, loading } = await getBonus(`/api/ServiciosApp/rest/bono/consultar/${document}`, 'GET', {});
    setLoading(loading);

    if (data) {
      const bonosVigentes = data.data.filter(bono => bono.estado === 'S');
      const bonosOrdenados = bonosVigentes.sort((a, b) => {
        const fechaA = new Date(a.vigencia.replace(' ', 'T'));
        const fechaB = new Date(b.vigencia.replace(' ', 'T'));
        return fechaA - fechaB;
      });

      console.log("Bonos vigentes y ordenados:", bonosOrdenados);
      // Dispatch con los bonos filtrados
      dispatch(setBonus(bonosOrdenados));
    }

    handleError2(errorFetch); // Manejar el error si ocurre
  };

  const [updatedBonusList, setUpdatedBonusList] = useState(bonusList || []);
  const calculateBonusDiscounts = async () => {
    setIsCalculatingBonuses(true);
    let totalDiscount = 0;
    const updatedBonuses = await Promise.all(
      bonusList.map(async (bonus) => {
        if (bonus.checked) {
          const url = `/api/ms-tarifa-attendant?tiempo=${encodeURIComponent(bonus.tiempo)}&parqueaderoId=${parqueaderoId}&tipoVehiculoId=${vehicleExitData?.typeVehicle || 0}`;
          try {
            const { data, errorFetch } = await getDataFetch(url, 'GET', {});
            if (data && data.data.valor) {
              const discount = Number(data.data.valor);
              totalDiscount += discount;
              return { ...bonus, descuento: discount };
            } else {
              return { ...bonus, descuento: 0 };
            }
          } catch (e) {
            console.error(`Error obteniendo descuento para bono ${bonus.nombre}:`, e);
            return { ...bonus, descuento: 0 };
          }
        }
        return bonus;
      })
    );
    setDiscountTotal(totalDiscount);
    // Actualizamos el estado local para usarlo en el request
    setUpdatedBonusList(updatedBonuses);
    setIsCalculatingBonuses(false);
  };

  useEffect(() => {
    calculateBonusDiscounts();
  }, [bonusList]);

  const calculateBillingSummary = () => {
    const serviceValue = Number(vehicleExitData?.serviceValue || 0);
    const discountBonos = discountTotal;
    const discountValidacion = 0; // Asigna aquí el descuento de validación, si lo tienes
    const valueToPay = serviceValue - discountBonos - discountValidacion;
    dispatch(setBillingSummary({
      serviceValue,
      discountBonos,
      discountValidacion,
      valueToPay,
    }));
  };

  useEffect(() => {
    calculateBonusDiscounts();
  }, [bonusList]);

  const onChecked = (item) => {
    dispatch(onCheckedElement(item));
  }

  const handleNext = () => {
    //dispatch(nextStep())
    dispatch(nextStep());
  };

  const sendBeParkingData = async () => {

    //await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('document', document);
    const numContratoValue = document || aux || "----";
    dispatch(setAux(numContratoValue));
    console.log('numContratoValue:', numContratoValue);
    //console.log('updatedBonusList', updatedBonusList);
    calculateBillingSummary();
    const bonosBeParking = updatedBonusList
      .filter(bonus => bonus.checked)
      .map(bonus => {
        const descuentoBono = bonus.descuento !== undefined ? bonus.descuento.toString() : "0";
        console.log(`Bono ${bonus.codigo} - descuentoBono:`, descuentoBono);
        return {
          codigo: bonus.codigo,
          codigoCampania: "-",
          descuentoBono: descuentoBono
        };
      });

    const body = {
      numContrato: numContratoValue,
      descuentosBonos: discountTotal,
      estatus: 1,
      entradaVehiculoId: vehicleExitData?.vehicleId || 0,
      bonosBeParking: bonosBeParking
    };

    console.log("Enviando datos a /api/mb-beparking:", body);

    try {
      const { data, errorFetch } = await getDataFetch("/api/mb-beparking", "POST", { rq: body });
      if (errorFetch) {
        console.error("Error al guardar datos en beParking:", errorFetch);
        Alert.alert("ERROR", "Error al guardar datos: " + (errorFetch.message || errorFetch));
      } else {
        Alert.alert("OK", data.mensaje || "Datos guardados exitosamente");
        // Avanzar a la siguiente pantalla
        handleNext();
      }
    } catch (e) {
      console.error("Error inesperado en sendBeParkingData:", e);
      Alert.alert("ERROR", "Se produjo un error inesperado al enviar los datos.");
    }
  };

  const deleteBeParkingEntry = async () => {
    const entradaVehiculoId = vehicleExitData?.vehicleId;

    if (!entradaVehiculoId) {
      Alert.alert("Error", "No se encontró el ID del vehículo para eliminar la entrada.");
      return;
    }

    try {
      console.log(`Eliminando entrada de BeParking con ID: ${entradaVehiculoId}`);
      const url = `/api/ms-beparking/entradaVehiculo/${entradaVehiculoId}`;
      const { data, errorFetch } = await getDataFetch(url, "DELETE", {});

      if (errorFetch) {
        console.error("Error al eliminar entrada BeParking:", errorFetch);
        //Alert.alert("Error", "No se pudo eliminar la entrada en BeParking.");
      } else {
        console.log("Entrada eliminada exitosamente:", data);
        //Alert.alert("Éxito", "Entrada de BeParking eliminada correctamente.");
      }
    } catch (error) {
      console.error("Error inesperado al eliminar BeParking:", error);
      //Alert.alert("Error", "Ocurrió un error inesperado al eliminar la entrada.");
    }
  };

  const handlePrevious = async () => {
    await deleteBeParkingEntry();
    dispatch(resetAuth());
    dispatch(previousStep());
  }
  return {
    vehicleExitData,
    loading,
    document,
    searchResult,
    error, // El error es tanto el de los turnos como el de los datos de salida
    checked,
    code,
    bonusList,
    onChecked,
    setCode,
    setChecked,
    handleNext: () => dispatch(nextStep()),
    handlePrevious,
    setDocument,
    onSearch,
    calculateBonusDiscounts,
    discountTotal,
    sendBeParkingData,
    isCalculatingBonuses,
    setIsCalculatingBonuses
  };
};

export default useBeParkingDepartureHook;
