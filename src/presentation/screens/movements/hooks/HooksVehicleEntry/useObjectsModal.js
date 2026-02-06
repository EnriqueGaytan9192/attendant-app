import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLazyFetch } from "../../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../../state/hooks";
import {
  setFirmaSignature,
  setTurnoId,
  showObjectsModal
} from "../../../../../state/slices/movementsSlice";

const useObjectsModal = () => {
  const dispatch = useDispatch();
  const { getDataFetch } = useLazyFetch();
  const stableGetDataFetch = useCallback(getDataFetch, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [object, setObject] = useState("");
  const [objectsList, setObjectsList] = useState([]);
  const [base64Signature, setBase64Signature] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showError, setShowError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [identificationNumberError, setIdentificationNumberError] = useState(false);
  const [objectListError, setObjectListError] = useState(false);
  const [existingObject, setExistingObject] = useState(null);
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isSignatureAvailable, setIsSignatureAvailable] = useState(false);

  const signatureRef = useRef(null);

  const { numeroIdentificacion, parqueaderoId } = useAppSelector((state) => state.auth);
  const vehicleDetail = useSelector((state) => state.movements.vehicleDetail);
  const turnoIdObjects = useSelector((state) => state.movements.turnoIdObjects);
  const signatureFirma = useSelector((state) => state.movements.signature);
  const plate = vehicleDetail?.plate;
  const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);

  useEffect(() => {
    console.log("Plate:", plate);
    console.log("ParqueaderoId:", parqueaderoId);

    const fetchObjectData = async () => {
      try {
        if (!plate || !parqueaderoId) {
          console.error("Faltan parámetros necesarios: plate o parqueaderoId.");
          return;
        }

        setLoading(true);

        const { data, errorFetch } = await stableGetDataFetch(
          `/api/object/${plate}/parkingId/${parqueaderoId}/entryVehicleId/${selectedVehicle?.vehicleId}`, "GET", {}
        );

        if (errorFetch) {
          console.error("Error al obtener el objeto:", errorFetch);
          return;
        }

        if (data) {
          setExistingObject(data);
          console.log("Objeto encontrado:", data);

          if (data.imgFirmaPropietario) {
            const { data: signatureData, errorFetch: signatureError } = await stableGetDataFetch(
              `/api/s3Download?key=${data.imgFirmaPropietario}`, "GET", {}
            );

            if (signatureError) {
              console.error("Error al obtener la firma:", signatureError);
            } else if (signatureData) {
              setSignatureUrl(signatureData?.url);
              console.log("Firma obtenida:", signatureData?.url);
            }
          }
        } else {
          setExistingObject(null);
          console.log("No se encontró ningún objeto asociado.");
        }
      } catch (error) {
        console.error("Error al verificar el objeto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (plate && parqueaderoId) {
      fetchObjectData();
    }
  }, [plate, parqueaderoId, stableGetDataFetch]);


  const nextStep = () => {

    if (existingObject) {
      setCurrentStep(3);
      return;
    }

    let hasError = false;

    if (!name) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (!identificationNumber) {
      setIdentificationNumberError(true);
      hasError = true;
    } else {
      setIdentificationNumberError(false);
    }

    if (objectsList.length === 0) {
      setObjectListError(true);
      hasError = true;
    } else {
      setObjectListError(false);
    }

    if (hasError) {
      setShowError(true);
    } else {
      setShowError(false);
      setCurrentStep((prevStep) => prevStep + 1); // Si no hay errores, avanzamos al siguiente paso
    }
  };


  const prevStep = () =>
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  const resetSteps = () => setCurrentStep(1);

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
    const fetchTurnoId = async () => {
      try {
        const { data, errorFetch } = await getDataFetch("/api/turn", "POST", {
          rq: { id: numeroIdentificacion, parqueaderoId: parqueaderoId },
        });

        if (data?.turn?.turnoId) {
          dispatch(setTurnoId(data.turn.turnoId));
          console.log("Turno Id obtenido:", data.turn.turnoId);
        } else {
          console.error("No se pudo obtener el turnoId de objects useObjectsModal");
        }

        handleError(errorFetch);
      } catch (error) {
        console.error("Error al obtener el turnoIdObjects:", error);
        handleError(error);
      }
    };

    if (!turnoIdObjects) {
      fetchTurnoId();
    }
  }, [turnoIdObjects, numeroIdentificacion, dispatch, getDataFetch]);

  const onCloseModal = () => {
    dispatch(showObjectsModal(false));
  };

  const formatDate = (date) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  /*const addObjectToList = () => {
    if (object) {
      const newObject = {
        date: formatDate(new Date()),
        objectName: object,
      };
      setObjectsList([...objectsList, newObject]);
      setObject("");
    }
  };*/

  const addObjectToList = () => {
    if (object) {
      const newObject = {
        date: formatDate(new Date()),
        date: new Date().toISOString(), // ✅ Usar formato ISO
        objectName: object,
      };
      setObjectsList([...objectsList, newObject]);
      setObject("");
    }
  };


  const handleReceivedSignature = (signature) => {
    console.log("Firma recibida:", signature); // Añadir log para verificar lo que recibes.
    if (signature) {
      setBase64Signature(signature);
      setIsSignatureAvailable(true); // La firma está disponible
      console.log("Firma en base64 establecida correctamente:", signature);
    } else {
      console.error("Firma vacía recibida");
    }
  };

  const handleSaveSignature = async () => {
    if (signatureRef.current) {
      const signature = await signatureRef.current.getSignature();
    }
  };

  const saveObjectData = async () => {
    console.log("Firma antes de guardar:", signatureFirma);


    if (currentStep === 2 && !isAuthorized) {
      setShowError(true);
      return;
    } else {
      setShowError(false);

      if (!signatureFirma) {
        console.error("La firma en base64 está vacía o no tiene el formato adecuado.");
        alert("Por favor, complete la firma correctamente antes de guardar.");
        return;
      }

      if (!plate || !turnoIdObjects) {
        console.error("No se puede guardar el objeto, falta la placa o turnoId.", plate, turnoIdObjects);
        return;
      }

      // Crear los datos para la solicitud
      const requestData = {
        plate: plate,
        name: name,
        identificationNumber: identificationNumber,
        objects: objectsList.map((obj) => ({
          dateTimeEntry: new Date().toISOString(),
          object: obj.objectName,
        })),
        dataProcessing: true,
        turnoId: turnoIdObjects,
        parqueaderoId: parqueaderoId,
        base64: signatureFirma,
      };

      console.log("Datos a enviar para guardar el objeto:", requestData);

      // Enviar la solicitud
      const { data, errorFetch } = await getDataFetch("/api/object", "POST", {
        rq: requestData,
      });

      console.log("Respuesta de la API:", data);
      if (data) {
        dispatch(setFirmaSignature(""));
        console.log("Objeto guardado exitosamente");
        Alert.alert(
          "Éxito", "Objeto guardado exitosamente",
          [{ text: "OK", onPress: () => onCloseModal() }]);

      } else {
        console.error("Error al guardar el objeto:", errorFetch || "Desconocido");
      }
    }
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    resetSteps,
    onCloseModal,
    name,
    setName,
    identificationNumber,
    setIdentificationNumber,
    object,
    setObject,
    objectsList,
    setObjectsList,
    addObjectToList,
    saveObjectData,
    signatureRef,
    isAuthorized,
    setIsAuthorized,
    showError,
    setShowError,
    nameError,
    setNameError,
    identificationNumberError,
    setIdentificationNumberError,
    objectListError,
    setObjectListError,
    isSignatureAvailable,
    base64Signature,
    handleReceivedSignature,
    handleSaveSignature,
    existingObject,
    signatureUrl
  };
};

export default useObjectsModal;
