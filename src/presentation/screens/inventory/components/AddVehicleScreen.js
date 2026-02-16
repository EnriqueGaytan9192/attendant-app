import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ActivityIndicator, Button, Card, Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { setFullForm, setPlacaInventario } from "../../../../state/slices/inventorySlice";
import useInventoryHook from "../hooks/useInventoryHook";
import styles from "../styles/AddVehicleStyle";

const AddVehicleScreen = () => {
  // ====== ESTADOS LOCALES PARA INPUTS ======
  const [selectedOptionType, setSelectedOptionType] = useState(null);
  const [platesInventory, setPlatesInventory] = useState("");
  const [observationInventory, setObservationInventory] = useState("");
  //const [vehiculo, setVehiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [plateError, setPlateError] = useState("");
  const [errors, setErrors] = useState({});

  // Partes
  const [inventoryDetails, setInventoryDetails] = useState({
    chapas: "",
    farolasStop: "",
    copas: "",
    frontal: "",
    emblema: "",
    cauchosLaterales: "",
    tapaLlantas: "",
    espejos: "",
    llantaRepuesto: "",
    radio: "",
    antena: "",
    tapaGasolina: "",
    limpiaBrisas: "",
    bahul: "",
  });

  // Detalles externos
  const [invDetails, setInvDetails] = useState({
    lateralIzquierdo: "",
    lateralDerecho: "",
    frente: "",
    posterior: "",
  });

  // Fotos
  const [photoUrls, setPhotoUrls] = useState({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  // ====== HOOK GLOBAL / REDUX ======
  const dispatch = useAppDispatch();
  const { functions, states } = useInventoryHook();
  const { handleCancel, handleSave, getDataFetch } = functions;
  const { form } = states;
  const { functions: { dropdwonPlacas } } = useInventoryHook();
  const [platesOptions, setPlatesOptions] = useState([]);
  const isReadOnly = form?.isView === true;
  const [rawPlates, setRawPlates] = useState([]);
  // el id de la placa seleccionada
  const [selectedPlateId, setSelectedPlateId] = useState(null);
  const isPlateSelected = !!selectedPlateId;
  // y el tipo de vehículo precargado
  const [vehiculo, setVehiculo] = useState("");
  // ====== OPCIONES PARA DROPDOWNS ======
  const { turnoIdEntry } = useAppSelector(state => state.movements);
  useEffect(() => {
    if (!turnoIdEntry) return;
    let mounted = true;
    (async () => {
      const all = await dropdwonPlacas();    // [{ vehicleId, plate, typeVehicle }, …]
      if (!mounted || !Array.isArray(all)) return;
      // filtramos los que NO sean typeVehicle=3
      const filtered = all.filter(item => item.typeVehicle !== 3);
      setRawPlates(filtered);
      setPlatesOptions(
        filtered.map(item => ({ label: item.plate, value: item.vehicleId }))
      );
    })();
    return () => { mounted = false; }
  }, [turnoIdEntry]);

  const onPlateChange = (vehicleId) => {
    setSelectedPlateId(vehicleId);

    const sel = rawPlates.find(r => r.vehicleId === vehicleId);
    if (!sel) return;

    setPlaca(sel.plate);
    dispatch(setPlacaInventario(sel.plate));

    // 🔴 LIMPIAR ERROR
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.placa;
      return copy;
    });

    const tipo = sel.typeVehicle === 1 ? "Carro" : "Moto";

    dispatch(setFullForm({
      placa: sel.plate,
      vehiculo: tipo
    }));

    setVehiculo(tipo);
  };



  /*const dataType = [
    { label: "Carro", value: "carro" },
    { label: "Moto", value: "moto" },
    { label: "Fronterizo", value: "fronterizo" },
  ];*/

  const inventoryOptions = [
    { label: "Bueno", value: "bueno" },
    { label: "Regular", value: "regular" },
    { label: "Dañado", value: "dañado" },
    { label: "Roto", value: "roto" },
    { label: "No está", value: "no_esta" },
    { label: "No visible", value: "no_visible" },
    { label: "No aplica", value: "no_aplica" },
  ];

  const invOptions = [
    { label: "Abolladuras", value: "abolladuras" },
    { label: "Rayones", value: "rayones" },
    { label: "Sin detalles", value: "sindetalles" },
  ];

  // Función de validación
  const validatePlate = (value, vehiculoType) => {
    let regex;
    if (vehiculoType === "carro") {
      // Automóvil: EXACTAMENTE 3 letras seguidas de 3 números (6 caracteres)
      regex = /^[A-Za-z]{3}[0-9]{3}$/;
    } else if (vehiculoType === "moto") {
      // Motocicleta: EXACTAMENTE 3 letras, 2 números y 1 letra (6 caracteres)
      regex = /^[A-Za-z]{3}[0-9]{2}[A-Za-z]$/;
    } else if (vehiculoType === "fronterizo") {
      // Parqueaderos fronterizos: EXACTAMENTE 7 caracteres alfanuméricos.
      regex = /^[A-Za-z0-9]{7}$/;
    } else {
      return ""; // Sin validación si no se selecciona el tipo
    }
    return regex.test(value) ? "" : "Formato de placa incorrecto";
  };

  // useEffect para validar placa cuando cambian los valores
  useEffect(() => {
    const error = validatePlate(placa, vehiculo);
    setPlateError(error);
  }, [placa, vehiculo]);
  // =============================================================================
  // 1) useEffect para COPIAR LOS DATOS DE form HACIA LOS ESTADOS LOCALES
  // (para que aparezcan precargados en los TextInput y Dropdowns)
  // =============================================================================
  useEffect(() => {
    //console.log("===> useEffect() entrando con form:", form);
    if (!form) return;
    if (form.isEdit || form.isView) {
      // Tipo de vehículo
      if (form.vehiculo === "Carro") {
        setVehiculo("carro");
      } else if (form.vehiculo === "Moto") {
        setVehiculo("moto");
      } else {
        setVehiculo("carro");
      }

      // Placa
      setPlaca(form.placa || "");

      // Observaciones
      //console.log("===> useEffect() precargando observaciones con:", form.observaciones);
      setObservaciones(form.observaciones || "");

      // Detalles externos
      setInvDetails({
        lateralIzquierdo: form.lateralIzquierdo || "",
        lateralDerecho: form.lateralDerecho || "",
        frente: form.frente || "",
        posterior: form.posterior || "",
      });

      // Partes
      setInventoryDetails({
        chapas: form.chapas || "",
        farolasStop: form.farolasStop || "",
        copas: form.copas || "",
        frontal: form.frontal || "",
        emblema: form.emblema || "",
        cauchosLaterales: form.cauchosLaterales || "",
        tapaLlantas: form.tapaLlantas || "",
        espejos: form.espejos || "",
        llantaRepuesto: form.llantaRepuesto || "",
        radio: form.radio || "",
        antena: form.antena || "",
        tapaGasolina: form.tapaGasolina || "",
        limpiaBrisas: form.limpiaBrisas || "",
        bahul: form.bahul || "",
      });
    }
  }, [form]);


  useEffect(() => {
    if (!isReadOnly) return;                 // solo aplica cuando form.isView === true
    if (!form?.placa) return;                // aún no llegó la placa
    if (rawPlates.length === 0) return;      // aún no llegaron las placas del turno

    // Buscamos la placa que coincide con la traída en el form
    const match = rawPlates.find(p => p.plate === form.placa);
    if (match) {
      setSelectedPlateId(match.vehicleId);   // ► muestra la placa en el dropdown
      setPlaca(match.plate);                 // (opcional) asegura estado local
    }
  }, [isReadOnly, form?.placa, rawPlates]);
  // =============================================================================
  // 2) useEffect para obtener las URL presignadas de las imágenes 
  // (si form.photo1, photo2, etc. son keys de S3).
  // =============================================================================
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const newState = { ...photoUrls };

        if (form.photo1 && !form.photo1.startsWith("file://")) {
          const { data } = await getDataFetch(`/api/s3Download?key=${form.photo1}`, "GET");
          if (data?.url) newState.photo1 = data.url;
        }
        if (form.photo2 && !form.photo2.startsWith("file://")) {
          const { data } = await getDataFetch(`/api/s3Download?key=${form.photo2}`, "GET");
          if (data?.url) newState.photo2 = data.url;
        }
        if (form.photo3 && !form.photo3.startsWith("file://")) {
          const { data } = await getDataFetch(`/api/s3Download?key=${form.photo3}`, "GET");
          if (data?.url) newState.photo3 = data.url;
        }
        if (form.photo4 && !form.photo4.startsWith("file://")) {
          const { data } = await getDataFetch(`/api/s3Download?key=${form.photo4}`, "GET");
          if (data?.url) newState.photo4 = data.url;
        }

        setPhotoUrls(newState);
      } catch (error) {
        console.log("Error obteniendo URLs de imagen:", error);
      }
    };

    if (form?.photo1 || form?.photo2 || form?.photo3 || form?.photo4) {
      fetchImageUrls();
    }
  }, [form]);

  // ====== Pedir permiso de cámara y tomar foto ======
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  const takePhoto = async (photoKey) => {
    if (isReadOnly || !isPlateSelected) return;

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log("No se otorgaron los permisos de cámara");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUrls((prev) => {
        const newUri = result.assets[0].uri;

        const updatedPhotos = {
          ...prev,
          [photoKey]: newUri,
        };

        dispatch(setFullForm({
          [photoKey]: newUri,
          photos: Object.values(updatedPhotos).filter(Boolean),
        }));

        // 🔴 LIMPIAR ERROR
        setErrors(prevErrors => {
          const copy = { ...prevErrors };
          delete copy[photoKey];
          return copy;
        });

        return updatedPhotos;
      });
    }
  };


  // Render de cada foto
  const renderPhotoSection = (photoKey) => {
    return (
      <View style={styles.photoWrapper}>
        <TouchableOpacity
          style={[
            styles.photoContainer,
            errors[photoKey] && errorStyles.input
          ]}
          onPress={() => takePhoto(photoKey)}
        >
          {photoUrls[photoKey] ? (
            <Image
              source={{ uri: photoUrls[photoKey] }}
              style={styles.photo}
            />
          ) : (
            <Icon name="camera-alt" size={50} color="#4CAF50" />
          )}
        </TouchableOpacity>

        {renderError(photoKey)}
      </View>
    );
  };


  const validateForm = () => {
    const newErrors = {};

    // ===== Placa =====
    if (!placa) {
      newErrors.placa = "Debe seleccionar una placa";
    }

    // ===== Detalles externos =====
    Object.entries(invDetails).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "Campo obligatorio";
      }
    });

    // ===== Partes =====
    Object.entries(inventoryDetails).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "Campo obligatorio";
      }
    });

    // ===== Fotos =====
    Object.entries(photoUrls).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "Debe tomar la fotografía";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const errorStyles = {
    text: {
      color: "#D32F2F",
      fontSize: 12,
      marginTop: 4,
    },
    input: {
      borderColor: "#D32F2F",
      borderWidth: 1,
    },
  };

  const renderError = (key) =>
    errors[key] ? (
      <Text style={errorStyles.text}>{errors[key]}</Text>
    ) : null;

  // ====== Preparar y llamar a handleSave ======
  const doBeforeSave = () => {
    const isValid = validateForm();

    if (!isValid) {
      Alert.alert(
        "Campos incompletos",
        "Debes completar los campos obligatorios antes de continuar."
      );
      return;
    }

    console.log("Entrando a doBeforeSave...");
    console.log("Vehículo:", vehiculo);
    const completeData = {
      // Campos generales
      placa,
      vehiculo: vehiculo === "carro" ? "Carro" : vehiculo === "moto" ? "Moto" : vehiculo,
      observaciones,

      // Partes
      chapas: inventoryDetails.chapas,
      farolasStop: inventoryDetails.farolasStop,
      copas: inventoryDetails.copas,
      frontal: inventoryDetails.frontal,
      emblema: inventoryDetails.emblema,
      cauchosLaterales: inventoryDetails.cauchosLaterales,

      accesorios: {
        espejos: inventoryDetails.espejos,
        tapaLlantas: inventoryDetails.tapaLlantas,
        llantaRepuesto: inventoryDetails.llantaRepuesto,
        radio: inventoryDetails.radio,
        antena: inventoryDetails.antena,
        tapaGasolina: inventoryDetails.tapaGasolina,
        limpiaBrisas: inventoryDetails.limpiaBrisas,
        tieneBaul: inventoryDetails.bahul,
      },

      // Detalles externos
      lateralIzquierdo: invDetails.lateralIzquierdo,
      lateralDerecho: invDetails.lateralDerecho,
      frente: invDetails.frente,
      posterior: invDetails.posterior,
      photos: Object.values(photoUrls).filter(Boolean)
    };
    dispatch(setFullForm(completeData));
    setIsLoading(true);
    setTimeout(() => {
      handleSave().finally(() => setIsLoading(false));;
    }, 100);
  };

  const renderSpinner = () => (
    isLoading && (
      <View style={localStyles.loadingOverlay}>
        <ActivityIndicator size="large" color="#90D400" />
      </View>
    )
  );

  // ====== RENDER ======
  return (
    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ alignItems: "center", padding: 16 }}>
      <View style={{ width: "100%" }}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Detalle Inventario</Text>

            {/* Fila: Tipo de Vehículo y Placa */}
            <View style={styles.inputContainer}>
              {isReadOnly ? (
                <View style={styles.readOnlyPlateContainer}>
                  <Text style={styles.readOnlyPlateText}>{placa || "—"}</Text>
                </View>
              ) : (
                <Dropdown
                  data={platesOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Placas *"
                  value={selectedPlateId}
                  onChange={item => onPlateChange(item.value)}
                  style={styles.dropdown}
                  disable={isReadOnly}
                  search
                  searchPlaceholder="Buscar placa..."
                  maxHeight={400} // Esto limita la altura total del dropdown (aprox. 5 ítems)
                  containerStyle={{ borderRadius: 8 }}
                  itemContainerStyle={{ paddingVertical: 10 }}
                />

              )}
              <TextInput
                label="Tipo de Vehículo *"
                value={vehiculo}
                mode="outlined"
                style={styles.input}
                disabled
              />
            </View>

            {/* Sección de fotos + Detalles */}
            <View style={styles.subContainer}>
              {/* COLUMNA IZQUIERDA (fotos + detalles) */}
              <View style={styles.leftSection}>
                <View style={{ flexDirection: "row" }}>
                  <Card style={styles.cardPhoto}>
                    <Card.Content>{renderPhotoSection("photo1")}</Card.Content>
                  </Card>
                  <Card style={[styles.cardPhoto, { marginLeft: 15 }]}>
                    <Card.Content>{renderPhotoSection("photo2")}</Card.Content>
                  </Card>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Card style={styles.cardPhoto}>
                    <Card.Content>{renderPhotoSection("photo3")}</Card.Content>
                  </Card>
                  <Card style={[styles.cardPhoto, { marginLeft: 15 }]}>
                    <Card.Content>{renderPhotoSection("photo4")}</Card.Content>
                  </Card>
                </View>

                {/* Detalles externos */}
                <View style={{ flex: 1, marginRight: 10, marginTop: 25 }}>
                  {[
                    { label: "Lateral Izquierdo", key: "lateralIzquierdo" },
                    { label: "Lateral Derecho", key: "lateralDerecho" },
                  ].map(({ label, key }) => (
                    <View key={key} style={styles.row}>
                      <Text style={styles.subtitle}>{label}</Text>
                      <View>
                        <Dropdown
                          style={[
                            styles.dropdownThree,
                            errors[key] && errorStyles.input,
                          ]}
                          placeholderStyle={styles.dropdownPlaceholder}
                          selectedTextStyle={styles.dropdownText}
                          containerStyle={styles.dropdownContainer}
                          data={invOptions}
                          labelField="label"
                          valueField="value"
                          disable={isReadOnly || !isPlateSelected}
                          placeholder="Seleccionar Detalle *"
                          value={invDetails[key]}
                          onChange={(item) => {
                            const newValue = item.value;

                            setInvDetails(prev => ({
                              ...prev,
                              [key]: newValue,
                            }));

                            dispatch(setFullForm({ [key]: newValue }));

                            // 🔴 LIMPIAR ERROR
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy[key];
                              return copy;
                            });
                          }}

                        />
                        {renderError(key)}
                      </View>
                    </View>
                  ))}
                  {[
                    { label: "Frente", key: "frente" },
                    { label: "Posterior", key: "posterior" },
                  ].map(({ label, key }) => (
                    <View key={key} style={styles.row}>
                      <Text style={styles.subtitle}>{label}</Text>
                      <View>
                        <Dropdown
                          style={[
                            styles.dropdownThree,
                            errors[key] && errorStyles.input,
                          ]}
                          placeholderStyle={styles.dropdownPlaceholder}
                          selectedTextStyle={styles.dropdownText}
                          containerStyle={styles.dropdownContainer}
                          data={invOptions}
                          labelField="label"
                          valueField="value"
                          disable={isReadOnly || !isPlateSelected}
                          dropdownPosition="top"
                          placeholder="Seleccionar Detalle *"
                          value={invDetails[key]}
                          onChange={(item) => {
                            const newValue = item.value;

                            setInvDetails(prev => ({
                              ...prev,
                              [key]: newValue,
                            }));

                            dispatch(setFullForm({ [key]: newValue }));

                            // 🔴 LIMPIAR ERROR
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy[key];
                              return copy;
                            });
                          }}

                        />
                        {renderError(key)}
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* COLUMNA DERECHA (partes + observaciones + botones) */}
              <View style={styles.rightSection}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    {[
                      { label: "Chapas", key: "chapas" },
                      { label: "Farolas Stop", key: "farolasStop" },
                      { label: "Copas", key: "copas" },
                      { label: "Frontal", key: "frontal" },
                      { label: "Emblema", key: "emblema" },
                      { label: "Cauchos Laterales", key: "cauchosLaterales" },
                      { label: "Tapa Llantas", key: "tapaLlantas" },
                    ].map(({ label, key }) => (
                      <View key={key} style={styles.row}>
                        <Text style={styles.subtitle}>{label}</Text>
                        <View>
                          <Dropdown
                            style={[
                              styles.dropdownTwo,
                              errors[key] && errorStyles.input
                            ]}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownText}
                            containerStyle={styles.dropdownContainer}
                            data={inventoryOptions}
                            labelField="label"
                            valueField="value"
                            disable={isReadOnly || !isPlateSelected}
                            placeholder="Seleccionar Detalle *"
                            value={inventoryDetails[key]}
                            onChange={(item) => {
                              const newValue = item.value;

                              setInventoryDetails(prev => ({
                                ...prev,
                                [key]: newValue,
                              }));

                              dispatch(setFullForm({ [key]: newValue }));

                              // 🔴 LIMPIAR ERROR
                              setErrors(prev => {
                                const copy = { ...prev };
                                delete copy[key];
                                return copy;
                              });
                            }}

                          />
                          {renderError(key)}
                        </View>
                      </View>
                    ))}
                  </View>

                  <View style={{ flex: 1, marginLeft: 10 }}>
                    {[
                      { label: "Espejos", key: "espejos" },
                      { label: "Llanta Repuesto", key: "llantaRepuesto" },
                      { label: "Radio", key: "radio" },
                      { label: "Antena", key: "antena" },
                      { label: "Tapa Gasolina", key: "tapaGasolina" },
                      { label: "Limpiabrisas", key: "limpiaBrisas" },
                      { label: "Baúl", key: "bahul" },
                    ].map(({ label, key }) => (
                      <View key={key} style={styles.row}>
                        <Text style={styles.subtitle}>{label}</Text>
                        <View>
                          <Dropdown
                            style={[
                              styles.dropdownTwo,
                              errors[key] && errorStyles.input
                            ]}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownText}
                            containerStyle={styles.dropdownContainer}
                            data={inventoryOptions}
                            labelField="label"
                            valueField="value"
                            disable={isReadOnly || !isPlateSelected}
                            placeholder="Seleccionar Detalle *"
                            value={inventoryDetails[key]}
                            onChange={(item) => {
                              const newValue = item.value;

                              setInventoryDetails(prev => ({
                                ...prev,
                                [key]: newValue,
                              }));

                              dispatch(setFullForm({ [key]: newValue }));

                              // 🔴 LIMPIAR ERROR
                              setErrors(prev => {
                                const copy = { ...prev };
                                delete copy[key];
                                return copy;
                              });
                            }}

                          />
                          {renderError(key)}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Observaciones + Botones */}
                <View>
                  <TextInput
                    label="Observaciones (opcional)"
                    value={observaciones}
                    onChangeText={(text) => {
                      //console.log("===> Cambiando observaciones local:", text);
                      setObservaciones(text);
                      dispatch(setFullForm({ observaciones: text }));
                    }}
                    mode="outlined"
                    disabled={isReadOnly || !isPlateSelected}
                    theme={{
                      colors: {
                        outline: "#E5E5E5",
                        primary: "#90D400",
                      },
                    }}
                    multiline
                    numberOfLines={5}
                    style={styles.observationsInput}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginTop: 40,
                    }}
                  >
                    <Button
                      mode="contained"
                      theme={{ colors: { primary: "#8C8C8C" } }}
                      onPress={handleCancel}
                      style={styles.cancelButton}
                    >
                      {isReadOnly ? "Cerrar" : "Cancelar"}
                    </Button>

                    {/* Sólo mostrar si NO es modo ver */}
                    {!isReadOnly && (
                      <Button
                        disabled={!selectedPlateId || isLoading}
                        loading={isLoading}
                        mode="contained"
                        onPress={doBeforeSave}
                        style={styles.continueButton}
                      >
                        {form?.isEdit ? "Guardar Cambios" : "Continuar"}
                      </Button>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
      {renderSpinner()}
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AddVehicleScreen;