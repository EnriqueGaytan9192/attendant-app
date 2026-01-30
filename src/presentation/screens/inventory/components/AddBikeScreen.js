import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import styles from "../styles/AddBikeStyle";
import { Button, Card, TextInput, ActivityIndicator } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from "react-native-element-dropdown";
import useDetailHook from "../hooks/useDetailHook";

const dataBicleType = [
  { label: "Tipo A", value: "tipo_a" },
  { label: "Tipo B", value: "tipo_b" },
  { label: "Tipo C", value: "tipo_c" },
];

const dataBrand = [
  { label: "GW", value: "gw" },
  { label: "Venzo", value: "venzo" },
  { label: "Trek", value: "trek" },
  { label: "Scott", value: "scott" },
  { label: "Giant", value: "giant" },
  { label: "Specialized", value: "specialized" },
  { label: "Merida", value: "merida" },
  { label: "Totem", value: "totem" },
  { label: "Benotto", value: "benotto" },
  { label: "Oxford", value: "oxford" },
];

const inventoryOptions = [
  { label: "Bueno", value: "bueno" },
  { label: "Regular", value: "regular" },
  { label: "Dañado", value: "dañado" },
  { label: "Roto", value: "roto" },
  { label: "No está", value: "No_esta" },
  { label: "No visible", value: "no_visible" },
  { label: "No aplica", value: "No_aplica" },
];

const brandOptions = [
  { label: 'Bianchi', value: 'BIANCHI' },
  { label: 'Cliff', value: 'CLIFF' },
  { label: 'Cube', value: 'CUBE' },
  { label: 'Giant', value: 'GIANT' },
  { label: 'GW Bicycles', value: 'GW BICYCLES' },
  { label: 'Liv', value: 'LIV' },
  { label: 'Marin', value: 'MARIN' },
  { label: 'Optimus', value: 'OPTIMUS' },
  { label: 'Orbea', value: 'ORBEA' },
  { label: 'Roca', value: 'ROCA' },
  { label: 'Scott', value: 'SCOTT' },
  { label: 'Specialized', value: 'SPECIALIZED' },
  { label: 'Treck', value: 'TRECK' },
  { label: 'Venzo', value: 'VENZO' },
  { label: 'Otro', value: 'OTRO' },
];

const AddBikeScreen = () => {
  // Estados locales para campos del formulario
  const [platesBicle, setPlatesBicle] = useState("");
  const [selectOptionType, setSelectOptionType] = useState(null);
  const [selectOptionBrand, setSelectOptionBrand] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brandPicked, setBrandPicked] = useState(true);

  // Campos de inventario
  const [inventoryDetails, setInventoryDetails] = useState({
    marco: "",
    sillin: "",
    frenos: "",
    pintura: "",
    ruedas: "",
  });

  // Observaciones (opcional)
  const [observation, setObservation] = useState("");
  const handleSaveModified = async () => {
    // Verifica que la placa cumpla el formato "BICI-0001"
    if (!/^BICI-[0-9]{4}$/.test(platesBicle.trim())) {
      Alert.alert("Error", "El formato de la placa debe ser \"BICI-0001\"");
      return;
    }
    setIsLoading(true); // Activa el spinner
    try {
      await handleSave();
    } catch (error) {
      console.error("Error en handleSaveModified:", error);
    } finally {
      setIsLoading(false); // Desactiva el spinner sin importar el resultado
    }
  };
  // Foto local
  const [photos, setPhotos] = useState({ photo1: null });

  // Importamos lógica del hook (incluye el estado global "form")
  const { form, handleCancelBici, getDataFetch, turnoIdEntry } = useDetailHook();

  // Definimos si es modo solo lectura según el flag del formulario
  const isReadOnly = form?.isView === true;

  const getInventoryValue = (label) => {
    const option = inventoryOptions.find(
      (item) => item.label.toLowerCase() === label.toLowerCase()
    );
    return option ? option.value : label;
  };
  // useEffect para precargar datos (si existen en el state global)
  useEffect(() => {
    console.log("Precargando datos del formulario:", form);
    if (form && Object.keys(form).length > 0) {

      setPlatesBicle(form.plate || "");
      setSelectOptionType(form.bikeType || "");
      setSelectOptionBrand(form.brand || "");
      //setSelectOptionType(form.bikeType ? form.bikeType.toLowerCase() : null);
      //setSelectOptionBrand(form.brand || null);
      setInventoryDetails({
        marco: form.frame ? getInventoryValue(form.frame) : "",
        sillin: form.seat ? getInventoryValue(form.seat) : "",
        frenos: form.brakes ? getInventoryValue(form.brakes) : "",
        pintura: form.paint ? getInventoryValue(form.paint) : "",
        ruedas: form.wheels ? getInventoryValue(form.wheels) : "",
      });
      setObservation(form.observations || "");
      setPhotos({ photo1: form.bikePhoto || null });
    }
  }, [form]);

  // useEffect para obtener la foto de la bici
  /*useEffect(() => {
    const fetchBikePhoto = async () => {
      try {
        if (form.bikePhoto) {
          const { data } = await getDataFetch(
            `/api/s3Download?key=${form.bikePhoto}`,
            "GET"
          );
          if (data?.url) {
            console.log("se obtubo foto", data)
            setPhotos({ photo1: data.url });
          } else {
            console.log("no se obtuvo foto")
            setPhotos({ photo1: null });
          }
        }
      } catch (error) {
        console.error("Error obteniendo la foto de la bici:", error);
        setPhotos({ photo1: null });
      }
    };

    if (form && form.bikePhoto) {
      fetchBikePhoto();
    }
  }, [form]);*/
  useEffect(() => {
    const fetchBikePhoto = async () => {
      try {
        if (form.bikePhoto) {
          if (form.bikePhoto.startsWith("http")) {
            // Ya es un presigned URL → úsalo directo
            setPhotos({ photo1: form.bikePhoto });
          } else {
            // Es solo la key → pide el presigned al backend
            const { data } = await getDataFetch(
              `/api/s3Download?key=${form.bikePhoto}`,
              "GET"
            );
            if (data?.url) {
              setPhotos({ photo1: data.url });
            } else {
              setPhotos({ photo1: null });
            }
          }
        }
      } catch (error) {
        console.error("Error obteniendo la foto de la bici:", error);
        setPhotos({ photo1: null });
      }
    };

    if (form && form.bikePhoto) {
      fetchBikePhoto();
    }
  }, [form]);


  // ============================================
  // Funciones para foto (cámara)
  // ============================================
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  const takePhoto = async () => {
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
      const newUri = result.assets[0].uri;
      setPhotos({ photo1: newUri });
      // Actualiza el form en Redux con la nueva foto
      dispatch(setFullForm({ bikePhoto: newUri, photos: [newUri] }));
    }
  };

  const renderPhotoSection = () => (
    <TouchableOpacity style={styles.photoContainer} onPress={takePhoto} disabled={true}>
      {photos.photo1 ? (
        <Image source={{ uri: photos.photo1 }} style={styles.photo} />
      ) : (
        <Icon name="camera-alt" size={50} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );

  // ============================================
  // Función para subir la foto a /api/s3Attendant
  // ============================================
  const uploadPhoto = async (localUri) => {
    if (!localUri) return null;
    const date = new Date();
    const formData = new FormData();
    const timestamp = date.toISOString().replace(/[-:.]/g, '');
    const fileName = `3_bici_${timestamp}.jpg`;
    formData.append("file", {
      uri: localUri,
      type: "image/jpeg",
      name: fileName,
    });
    const jsonBody = {
      name_file: fileName,
      file_type: 1,
      id_file_module: 2,
      destination: 11,
      fecha_vencimiento: "24/05/2024",
    };
    formData.append("json", JSON.stringify(jsonBody));
    const { data, errorFetch } = await getDataFetch("/api/s3Attendant", "FILES", {
      rq: formData,
    });
    if (errorFetch) {
      console.error("Error subiendo foto:", errorFetch);
      return null;
    }
    if (data && data.fileUrl) {
      return data.fileUrl;
    }
    return null;
  };

  // ============================================
  // Función para construir y enviar el formulario
  // ============================================
  const handleContinue = async () => {
    try {
      if (!platesBicle.trim()) {
        alert("Por favor ingresa la placa de la bici");
        return;
      }
      let uploadedUrl = null;
      if (photos.photo1) {
        uploadedUrl = await uploadPhoto(photos.photo1);
        if (!uploadedUrl) {
          alert("No se pudo subir la foto, intenta de nuevo.");
          return;
        }
      }
      const fechaHora = new Date().toISOString();
      const requestBody = {
        placa: platesBicle,
        tipoVehiculo: 3,
        estadoVehiculo: "1",
        fechaHoraInventario: fechaHora,
        observaciones: observation || "",
        foto: uploadedUrl || "foto1.jpg",
        detalles: {
          modelo: selectOptionType || "sin_modelo",
          marca: selectOptionBrand || "sin_marca",
          marco: inventoryDetails.marco || "sin_detalle",
          sillin: inventoryDetails.sillin || "sin_detalle",
          pintura: inventoryDetails.pintura || "sin_detalle",
          ruedas: inventoryDetails.ruedas || "sin_detalle",
          frenos: inventoryDetails.frenos || "sin_detalle",
        },
        turnoId: turnoIdEntry
      };
      const { data, errorFetch } = await getDataFetch("/api/saveBikeInventory", "POST", {
        rq: requestBody,
      });
      if (errorFetch) {
        console.error("Error en /api/saveBikeInventory:", errorFetch);
        alert(errorFetch.msg || errorFetch.message);
        return;
      }
      if (data) {
        Alert.alert("Aviso", "Bicicleta registrada exitosamente", [
          { text: "OK", onPress: () => handleCancelBici() },
        ]);
        //handleCancelBici();
      }
    } catch (error) {
      console.error("Error en handleContinue:", error);
      Alert.alert("Error", "Ocurrió un error inesperado: " + error.message, [
        { text: "OK" },
      ]);
    }
  };
  //ACTUALIZAR
  const updateBike = async () => {
    try {
      // Verifica si la foto es local y, de ser así, súbela a S3
      let photoUrl = photos.photo1;
      if (photoUrl && photoUrl.startsWith("file://")) {
        photoUrl = await uploadPhoto(photoUrl);
        if (!photoUrl) {
          alert("No se pudo subir la foto, intenta de nuevo.");
          return;
        }
      }

      const body = {
        id: form.id,
        placa: platesBicle,
        tipoVehiculo: 3,
        estadoVehiculo: "1",
        detalles: {
          modelo: selectOptionType || "sin_modelo",
          marca: selectOptionBrand || "sin_marca",
          marco: inventoryDetails.marco || "sin_detalle",
          sillin: inventoryDetails.sillin || "sin_detalle",
          pintura: inventoryDetails.pintura || "sin_detalle",
          ruedas: inventoryDetails.ruedas || "sin_detalle",
          frenos: inventoryDetails.frenos || "sin_detalle"
        },
        foto: photoUrl || "default_foto.jpg",
        observaciones: observation || ""
      };

      const { data, errorFetch } = await getDataFetch("/api/inventoryBicis", "PUT", { rq: body });
      if (errorFetch) {
        Alert.alert("Error", errorFetch.msg || errorFetch.message, [
          { text: "OK" },
        ]);
        return;
      }
      if (data) {
        Alert.alert("Aviso", "Bicicleta actualizada exitosamente", [
          { text: "OK", onPress: () => handleCancelBici() },
        ]);
        //handleCancelBici();
      }
    } catch (error) {
      console.error("Error en updateBike:", error);
      Alert.alert("Error", "Ocurrió un error inesperado: " + error.message, [
        { text: "OK" },
      ]);
    }
  };

  const handleSave = async () => {
    if (form.isEdit) {
      await updateBike();
    } else {
      await handleContinue();
    }
  };

  const renderSpinner = () => (
    isLoading && (
      <View style={localStyles.loadingOverlay}>
        <ActivityIndicator size="large" color="#90D400" />
      </View>
    )
  );
  // ============================================
  // Render principal
  // ============================================
  return (
    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ alignItems: "center", padding: 16 }}>
      <View style={{ width: "100%" }}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Detalle Inventario</Text>

            {/* Placa / Tipo Bici / Marca */}
            <View style={styles.inputContainer}>
              <TextInput
                label="Placa Bici *"
                mode="outlined"
                value={platesBicle}
                onChangeText={(text) => {
                  const upperText = text.toUpperCase();
                  setPlatesBicle(upperText);
                }}
                style={styles.input}
                editable={/*!isReadOnly*/false}
                theme={{
                  colors: {
                    outline: "#E5E5E5",
                    primary: "#90D400",
                  },
                }}
              />

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownText}
                containerStyle={[styles.dropdownContainer, { borderRadius: 8 }]}
                data={brandOptions}
                labelField="label"
                valueField="value"
                placeholder="Marca *"
                value={selectOptionType}
                onChange={item => {
                  setBrandPicked(false)
                  setSelectOptionType(item.value);
                }}
                disable={isReadOnly}
                search
                searchPlaceholder="Buscar marca..."
                maxHeight={300}
                itemContainerStyle={{ paddingVertical: 10 }}
              />

              <TextInput
                label="Modelo *"
                mode="outlined"
                value={selectOptionBrand}
                onChangeText={(text) => {
                  const upperText = text.toUpperCase();
                  setSelectOptionBrand(upperText);
                }}
                style={styles.inputTwo}
                editable={/*!isReadOnly*/false}
                theme={{
                  colors: {
                    outline: "#E5E5E5",
                    primary: "#90D400",
                  },
                }}
              />

              {/*<Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownText}
                containerStyle={styles.dropdownContainer}
                data={dataBicleType}
                labelField="label"
                valueField="value"
                placeholder="Tipo de Bicicleta *"
                value={selectOptionType}
                onChange={(item) => setSelectOptionType(item.value)}
                disable={isReadOnly}
              />*/}

              {/*<Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownText}
                containerStyle={styles.dropdownContainer}
                data={dataBrand}
                labelField="label"
                valueField="value"
                placeholder="Marca *"
                value={selectOptionBrand}
                onChange={(item) => setSelectOptionBrand(item.value)}
                disable={isReadOnly}
              />*/}
            </View>

            {/* Foto */}
            <View style={styles.subContainer}>
              <View style={styles.leftSection}>
                <Card style={styles.cardPhoto}>
                  <Card.Content>{renderPhotoSection()}</Card.Content>
                </Card>
              </View>

              {/* Detalles (marco, sillin, etc.) */}
              <View style={styles.rightSection}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    {[
                      { label: "Marco", key: "marco" },
                      { label: "Sillin", key: "sillin" },
                      { label: "Frenos", key: "frenos" },
                      { label: "Pintura", key: "pintura" },
                      { label: "Ruedas", key: "ruedas" },
                    ].map(({ label, key }) => (
                      <View key={key} style={styles.row}>
                        <Text style={styles.subtitle}>{label}</Text>
                        <Dropdown
                          style={styles.dropdownTwo}
                          placeholderStyle={styles.dropdownPlaceholder}
                          selectedTextStyle={styles.dropdownText}
                          containerStyle={styles.dropdownContainer}
                          data={inventoryOptions}
                          labelField="label"
                          valueField="value"
                          placeholder="Seleccionar Detalle"
                          value={inventoryDetails[key]}
                          onChange={(item) =>
                            setInventoryDetails((prev) => ({
                              ...prev,
                              [key]: item.value,
                            }))
                          }
                          disable={/*isReadOnly*/ true}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Observaciones */}
            <View>
              <TextInput
                label="Observaciones (opcional)"
                mode="outlined"
                maxLength={50}
                style={styles.inputObservation}
                value={observation === "Sin observaciones" ? "" : observation}
                onChangeText={setObservation}
                editable={!isReadOnly}
                theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
              />
            </View>

            {/* Botones */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 40,
              }}
            >
              <Button
                mode="contained"
                theme={{
                  colors: {
                    primary: "#8C8C8C",
                  },
                }}
                onPress={handleCancelBici}
                style={styles.cancelButton}
              >
                Cerrar
              </Button>

              {!isReadOnly && (
                <Button
                  mode="contained"
                  onPress={handleSaveModified}
                  disabled={brandPicked}
                  style={styles.continueButton}
                >
                  Continuar
                </Button>
              )}
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

export default AddBikeScreen;
