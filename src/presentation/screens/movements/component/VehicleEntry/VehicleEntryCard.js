import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Card,
  Checkbox,
  Text,
  TextInput,
} from "react-native-paper";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../styles/styleVehicleEntry/stylesVehicleEntry";
import { Dropdown } from "react-native-element-dropdown";
import useVehicleEntryCardHook from "../../hooks/HooksVehicleEntry/useVehicleEntryCardHook";
import GoParkingScanner from "./GoParkingScanner";

const CameraButton = ({ onPress }) => (
  <View>
    <Button
      mode="contained"
      onPress={onPress}
      style={styles.goParkingButton}
    >
      Go Parking
    </Button>
  </View>
);

const VehicleEntryCard = () => {
  const {
    owner,
    document,
    brand,
    color,
    selectOptionDoc,
    detailsOptions,
    photos,
    loadingPhotos,
    plateRegister,
    vehicleType,
    plateError,
    selectedTab,
    isPlateValid,
    scannerVisible,
    handleDetailsChange,
    takePhoto,
    setOwner,
    setDocument,
    setBrand,
    setColor,
    handlePlateChange,
    setSelectedTab,
    handleScan,
    documentNumber,
    setDocumentNumber,
    submitEntry,
    sendPdfAndNotify,
    toggleScanner,
    parqueaderoId,
    tieneCuposBicicleta
  } = useVehicleEntryCardHook();

  const [showTextInput, setShowTextInput] = useState(false);
  const [ticketDigitalChecked, setTicketDigitalChecked] = useState(false);
  const [phoneDigital, setPhoneDigital] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [errors, setErrors] = useState({});

  const options = [
    { label: "Bueno", value: "bueno" },
    { label: "Dañado", value: "dañado" },
    { label: "No aplica", value: "no_aplica" },
    { label: "No está", value: "no_esta" },
    { label: "No visible", value: "no_visible" },
    { label: "Regular", value: "regular" },
    { label: "Roto", value: "roto" },
  ];

  const modeloOptions = [
    { label: "Eléctrica", value: "Eléctrica" },
    { label: "Montaña", value: "Montaña" },
    { label: "Ruta", value: "Ruta" },
    { label: "Urbana", value: "Urbana" },
    { label: "Otro", value: "Otro" },
  ];

  const colorOptions = [
    { label: "Amarillo", value: "Amarillo" },
    { label: "Azul", value: "Azul" },
    { label: "Blanco", value: "Blanco" },
    { label: "Celeste", value: "Celeste" },
    { label: "Dorado", value: "Dorado" },
    { label: "Gris", value: "Gris" },
    { label: "Marrón", value: "Marron" },
    { label: "Morado", value: "Morado" },
    { label: "Naranja", value: "Naranja" },
    { label: "Negro", value: "Negro" },
    { label: "Plateado", value: "Plateado" },
    { label: "Rojo", value: "Rojo" },
    { label: "Rosa", value: "Rosa" },
    { label: "Verde", value: "Verde" }
  ];

  const renderPhotoSection = (photoKey) => {
    const defaultLabel =
      photoKey === "photo1" ? "Foto Bicicleta" : "Foto Cédula";
    return (
      <TouchableOpacity
        style={styles.photoButton}
        onPress={() => takePhoto(photoKey)}
        disabled={loadingPhotos[photoKey]} // 🔒 Desactivar mientras carga
      >
        {loadingPhotos[photoKey] ? (
          <ActivityIndicator animating color="#90D400" />
        ) : (
          <>
            <MaterialIcons name="camera-alt" size={24} color="#90D400" />
            <Text style={styles.photoButtonText}>
              {photos[photoKey] ? "Foto Tomada" : defaultLabel}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const resetForm = () => {
    if (selectedTab === "addVehicles") {
      handlePlateChange("");
    } else if (selectedTab === "addBikes") {
      setOwner("");
      setDocument("");
      setDocumentNumber("");
      setBrand("");
      setColor("");
      handleDetailsChange("marco", "");
      handleDetailsChange("frenos", "");
      handleDetailsChange("ruedas", "");
      handleDetailsChange("sillin", "");
      handleDetailsChange("pintura", "");
    }
  };

  const handleSubmitEntry = async () => {
    if (submitting) return; // evita doble clic
    /*if (ticketDigitalChecked && !/^3\d{9}$/.test(phoneDigital)) {
      Alert.alert(
        "Formato incorrecto",
        "El número de celular debe iniciar con 3 y tener exactamente 10 dígitos."
      );
      return;
    }*/

    if (selectedTab === "addBikes") {
      const isValid = validateBikeForm();
      if (!isValid) {
        Alert.alert(
          "Formulario incompleto",
          "Complete todos los campos obligatorios."
        );
        return;
      }
    }

    const ticketDigital = ticketDigitalChecked ? 1 : 0;
    const numCelular = ticketDigitalChecked ? phoneDigital : "0";

    setSubmitting(true);
    try {
      const success = await submitEntry(ticketDigital, numCelular);

      if (success) {
        resetForm();
        setPhoneDigital("");
        setErrors({});
        if (ticketDigitalChecked) {
          sendPdfAndNotify(numCelular)
        }
        setTicketDigitalChecked(false);
      }

    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectBikesTab = () => {
    if (alertShown) return; // Evita toques repetidos

    if (!tieneCuposBicicleta) {
      setAlertShown(true);
      Alert.alert(
        "Sin tarifas de bicicletas",
        "No hay tarifas de bicis en este parqueadero",
        [
          {
            text: "OK",
            onPress: () => setAlertShown(false),
          },
        ]
      );
      return;
    }

    setSelectedTab("addBikes");
  };

  const validateBikeForm = () => {
    const newErrors = {};

    if (!owner.trim()) newErrors.owner = "El propietario es obligatorio";
    if (!document) newErrors.document = "Seleccione tipo de documento";
    if (!documentNumber || documentNumber.length < 5)
      newErrors.documentNumber = "Documento inválido (mínimo 5 dígitos)";
    if (!brand) newErrors.brand = "Seleccione el modelo";
    if (!color) newErrors.color = "Seleccione el color";

    // Estados de piezas
    ["marco", "frenos", "ruedas", "sillin", "pintura"].forEach((key) => {
      if (!detailsOptions[key]) {
        newErrors[key] = "Campo obligatorio";
      }
    });

    // Fotos
    if (!photos.photo1) newErrors.photo1 = "Debe tomar la foto de la bicicleta";
    if (!photos.photo2) newErrors.photo2 = "Debe tomar la foto del documento";

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
    errors[key] ? <Text style={errorStyles.text}>{errors[key]}</Text> : null;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "addVehicles" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("addVehicles")}
            disabled={submitting}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: selectedTab === "addVehicles" ? "#005A6D" : "#8C8C8C",
              }}
            >
              Ingreso De Vehículos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === "addBikes" && styles.activeTab]}
            onPress={handleSelectBikesTab}
            disabled={alertShown}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: selectedTab === "addBikes" ? "#005A6D" : "#8C8C8C",
              }}
            >
              Ingreso De Bicicletas
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {selectedTab === "addVehicles" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="directions-car"
                    size={24}
                    color={
                      vehicleType === "auto" || vehicleType === "foreign" || vehicleType === "diplomatic"
                        ? "#90D400"
                        : "#666666"
                    }
                  />
                  <MaterialIcons
                    style={{ marginLeft: 15 }}
                    name="two-wheeler"
                    size={30}
                    color={vehicleType === "moto" ? "#90D400" : "#666666"}
                  />
                </View>

                {/*<CameraButton onPress={() => toggleScanner(true)} /> */}

              </View>
              <View style={{ marginTop: 10 }}>
                {scannerVisible && (
                  <GoParkingScanner
                    visible={scannerVisible}
                    onClose={() => toggleScanner(false)}
                    onScan={(data) => {
                      handleScan(data);
                      toggleScanner(false);
                    }}
                  />
                )}
                {/*<View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.title}>Tiquete Digital</Text>
                  <Checkbox
                    color="#90D400"
                    status={ticketDigitalChecked ? "checked" : "unchecked"}
                    onPress={() => {
                      if (submitting) return;
                      setTicketDigitalChecked(!ticketDigitalChecked);
                      if (ticketDigitalChecked) setPhoneDigital("");
                    }}
                  />
                  {ticketDigitalChecked && (
                    <TextInput
                      label="Celular *"
                      value={phoneDigital}
                      onChangeText={setPhoneDigital}
                      mode="outlined"
                      theme={{
                        colors: {
                          outline: "#E5E5E5",
                          primary: "#90D400",
                        },
                      }}
                      style={styles.inputTicket}
                      editable={!submitting}
                    />
                  )}
                </View>
                */}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  label="Placa *"
                  value={plateRegister}
                  onChangeText={handlePlateChange}
                  mode="outlined"
                  theme={{
                    colors: {
                      outline: "#E5E5E5",
                      primary: "#90D400",
                    },
                  }}
                  style={styles.input}
                  editable={!submitting}
                />

                <Button
                  mode="contained"
                  onPress={handleSubmitEntry}
                  style={styles.addButton}
                  loading={submitting}
                  disabled={
                    submitting ||
                    vehicleType === "bici" ||
                    !isPlateValid ||
                    !plateRegister
                  }
                >
                  Registrar
                </Button>
              </View>

              {plateError ? (
                <Text style={{ color: "red", marginTop: 5 }}>{plateError}</Text>
              ) : null}
            </View>
          )}

          {selectedTab === "addBikes" && (
            <View>
              <Text style={styles.title}>Datos</Text>

              <View style={styles.inputContainer}>
                <View>
                  <TextInput
                    label="Propietario *"
                    value={owner}
                    //onChangeText={setOwner}
                    onChangeText={text => {
                      const noLeadingSpaces = text.replace(/^\s+/, '');

                      const filtered = noLeadingSpaces.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

                      setOwner(filtered);
                    }}

                    mode="outlined"
                    theme={{
                      colors: {
                        outline: errors.owner ? "red" : "#E5E5E5",
                        primary: "#90D400",
                      },
                    }}
                    style={styles.inputTwo}
                    editable={!submitting}
                  />
                  {renderError("owner")}
                </View>

                <View>
                  <Dropdown
                    style={[styles.dropdown, errors.document && errorStyles.input]}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownText}
                    containerStyle={[styles.dropdownContainer, { borderRadius: 8 }]}
                    data={selectOptionDoc}
                    labelField="label"
                    valueField="value"
                    placeholder="Tipo Documento *"
                    value={document}
                    onChange={(item) => !submitting && setDocument(item.value)}
                    disable={submitting}
                    search
                    searchPlaceholder="Buscar tipo documento"
                    maxHeight={300}
                    itemContainerStyle={{ paddingVertical: 10 }}
                  />
                  {renderError("document")}
                </View>

                <View>
                  <TextInput
                    label="# documento *"
                    value={documentNumber}
                    onChangeText={(text) => {
                      // 1. Eliminar espacios y todo lo que no sea número
                      let cleaned = text.replace(/[^0-9]/g, '');

                      // 2. Evitar que comience con 0
                      if (cleaned.startsWith('0')) {
                        cleaned = cleaned.replace(/^0+/, '');
                      }

                      // 3. Evitar que sea solo ceros
                      if (/^0+$/.test(cleaned)) {
                        cleaned = '';
                      }

                      setDocumentNumber(cleaned);
                    }}
                    mode="outlined"
                    keyboardType="numeric"
                    theme={{
                      colors: {
                        outline: errors.documentNumber ? "red" : "#E5E5E5",
                        primary: "#90D400",
                      },
                    }}
                    style={styles.inputThree}
                    editable={!submitting}
                  />
                  {renderError("documentNumber")}

                </View>
              </View>

              <View style={styles.inputContainer}>
                {/*<TextInput
                  label="Modelo *"
                  value={brand}
                  onChangeText={setBrand}
                  mode="outlined"
                  theme={{
                    colors: {
                      outline: "#E5E5E5",
                      primary: "#90D400",
                    },
                  }}
                  style={styles.inputTwo}
                  editable={!submitting}
                />*/}

                <View>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      errors.brand && errorStyles.input,
                    ]}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownText}
                    containerStyle={[styles.dropdownContainer, { borderRadius: 8 }]}
                    data={modeloOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Modelo *"
                    value={brand}
                    onChange={(item) => !submitting && setBrand(item.value)}
                    disable={submitting}
                    search
                    searchPlaceholder="Buscar Modelo..."
                    maxHeight={300}
                    itemContainerStyle={{ paddingVertical: 10 }}
                  />
                  {renderError("brand")}
                </View>


                {/*<TextInput
                  label="Color *"
                  value={color}
                  onChangeText={setColor}
                  mode="outlined"
                  theme={{
                    colors: {
                      outline: "#E5E5E5",
                      primary: "#90D400",
                    },
                  }}
                  style={styles.inputTwo}
                  editable={!submitting}
                />*/}

                <View>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      errors.color && errorStyles.input,
                    ]}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownText}
                    containerStyle={[styles.dropdownContainer, { borderRadius: 8 }]}
                    data={colorOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Color *"
                    value={color}
                    onChange={(item) => !submitting && setColor(item.value)}
                    disable={submitting}
                    search
                    searchPlaceholder="Buscar Color..."
                    maxHeight={300}
                    itemContainerStyle={{ paddingVertical: 10 }}
                  />
                  {renderError("color")}
                </View>

              </View>

              <Text style={[styles.title, { marginTop: 20 }]}>Estado</Text>

              <View style={{ flexDirection: "row", marginTop: 25 }}>
                <View style={{ flex: 1 }}>
                  {[
                    { label: "Marco", key: "marco" },
                    { label: "Frenos", key: "frenos" },
                    { label: "Ruedas", key: "ruedas" },
                  ].map(({ label, key }) => (
                    <View key={key} style={styles.row}>
                      <Text style={styles.subtitle}>{label}</Text>
                      <View>
                        <Dropdown
                          style={[
                            styles.dropdownTwo,
                            errors[key] && errorStyles.input,
                          ]}
                          placeholderStyle={styles.dropdownPlaceholder}
                          selectedTextStyle={styles.dropdownText}
                          containerStyle={styles.dropdownContainer}
                          data={options}
                          labelField="label"
                          valueField="value"
                          placeholder="Seleccionar *"
                          value={detailsOptions[key]}
                          onChange={(item) =>
                            !submitting && handleDetailsChange(key, item.value)
                          }
                          disable={submitting}
                        />
                        {renderError(key)}
                      </View>
                    </View>
                  ))}
                </View>

                <View style={{ flex: 1 }}>
                  {[
                    { label: "Sillin", key: "sillin" },
                    { label: "pintura", key: "pintura" },
                  ].map(({ label, key }) => (
                    <View key={key} style={styles.row}>
                      <Text style={styles.subtitle}>{label}</Text>
                      <View>
                        <Dropdown
                          style={[
                            styles.dropdownTwo,
                            errors[key] && errorStyles.input,
                          ]}
                          placeholderStyle={styles.dropdownPlaceholder}
                          selectedTextStyle={styles.dropdownText}
                          containerStyle={styles.dropdownContainer}
                          data={options}
                          labelField="label"
                          valueField="value"
                          placeholder="Seleccionar *"
                          value={detailsOptions[key]}
                          onChange={(item) =>
                            !submitting && handleDetailsChange(key, item.value)
                          }
                          disable={submitting}
                        />
                        {renderError(key)}
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/*<View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.title}>Tiquete Digital</Text>
                  <Checkbox
                    color="#90D400"
                    status={ticketDigitalChecked ? "checked" : "unchecked"}
                    onPress={() => {
                      if (submitting) return;
                      setTicketDigitalChecked(!ticketDigitalChecked);
                      if (ticketDigitalChecked) setPhoneDigital("");
                    }}
                  />
                  {ticketDigitalChecked && (
                    <TextInput
                      label="Celular *"
                      value={phoneDigital}
                      onChangeText={setPhoneDigital}
                      mode="outlined"
                      theme={{
                        colors: {
                          outline: "#E5E5E5",
                          primary: "#90D400",
                        },
                      }}
                      style={styles.inputTicket}
                      editable={!submitting}
                    />
                  )}
                </View>
              </View>*/}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <View>
                  {renderPhotoSection("photo1")}
                  {renderError("photo1")}
                </View>

                <View>
                  {renderPhotoSection("photo2")}
                  {renderError("photo2")}
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                }}
              >
                <Button
                  mode="contained"
                  onPress={handleSubmitEntry}
                  style={styles.continueButton}
                  loading={submitting}
                  disabled={submitting}
                >
                  Registrar
                </Button>
              </View>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

export default VehicleEntryCard;