import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Icon,
  Text,
  TextInput
} from "react-native-paper";
import { formatDate, formatDateTime, getProductType } from "../../../../../common/actions";
import useBeParkingDepartureHook from "../../hooks/HooksDepartureVehicles/useBeParkingDepartureHook";
import styles from "../../styles/stylesDepartureVehicles/stylesBeParkingDeparture";

const formatCurrency = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "$ 0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // O la moneda que requieras (por ejemplo, "MXN")
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const BeParkingDeparture = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    vehicleExitData,
    loading,
    error,
    searchResult,
    document,
    code,
    bonusList,
    setCode,
    onChecked,
    handleNext,
    handlePrevious,
    setDocument,
    onSearch,
    discountTotal,
    sendBeParkingData,
    isCalculatingBonuses,
    setIsCalculatingBonuses
  } = useBeParkingDepartureHook();
  //const finalPrice = Number(vehicleExitData?.serviceValue || 0) - discountTotal;
  const finalPrice = Math.max(0, Number(vehicleExitData?.serviceValue || 0) - discountTotal);
  console.log("vehicleExitData", vehicleExitData);
  // Obtener el icono según el tipo de vehículo
  const getVehicleIcon = (typeVehicle) => {
    switch (typeVehicle) {
      case 1:
        return "directions-car"; // Auto
      case 2:
        return "two-wheeler"; // Moto
      case 3:
        return "pedal-bike"; // Bicicleta
      default:
        return "directions-car"; // Default
    }
  };

  // Variable para mostrar el mensaje de estado
  let statusMessage = "";

  // Si los datos del vehículo no están cargados, asignamos el mensaje de carga
  if (loading) {
    statusMessage = "Cargando datos.";
  }
  // Si hay un error, asignamos el mensaje de error
  else if (error) {
    statusMessage = `No se lograron cargar los datos`;
  }
  // Si el vehículo no tiene datos, asignamos el mensaje de advertencia
  else if (!vehicleExitData) {
    statusMessage = "No se encontraron datos.";
  }

  const onContinue = async () => {
    setIsSubmitting(true);
    try {
      await sendBeParkingData();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ alignItems: "center", padding: 16 }}>
      <View style={{ width: "100%" }}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.vehicleInfo}>
                  <Text style={[styles.vehicleText, { marginRight: 20 }]}>
                    Salida de Vehiculo
                  </Text>
                  {/*<Icon source="car" size={24} color="#90D400" />*/}
                  <MaterialIcons
                    name={getVehicleIcon(vehicleExitData?.typeVehicle)}
                    size={25}
                    color="#90D400"
                  />
                  <Text style={[styles.vehicleText, { marginLeft: 10 }]}>
                    {vehicleExitData?.plate || "Placa no disponible"}
                  </Text>
                </View>

                {/* Mostrar el mensaje de estado solo si es necesario */}
                {statusMessage && (
                  <View>
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      {statusMessage}
                    </Text>
                  </View>
                )}

                <View style={styles.timeInfoContainer}>
                  <View style={styles.timeColumn}>
                    <Text style={styles.timeTitle}>Tipo</Text>
                    <Text style={[styles.timeSubtitle, { marginLeft: 10 }]}>
                      {vehicleExitData?.nombreProducto || "Tipo no disponible"}
                    </Text>
                  </View>

                  <View style={styles.timeColumn}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="north-east" size={14} color="white" />
                      </View>
                      <Text style={styles.timeTitle}>Entrada</Text>
                    </View>
                    <Text style={[styles.timeSubtitle, { marginLeft: 35 }]}>
                      {vehicleExitData?.entryAt ? formatDateTime(vehicleExitData.entryAt) : "Fecha no disponible"}
                    </Text>
                  </View>

                  <View style={styles.timeColumn}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="south-west" size={14} color="white" />
                      </View>
                      <Text style={styles.timeTitle}>Salida</Text>
                    </View>
                    <Text style={[styles.timeSubtitle, { marginLeft: 45 }]}>
                      {vehicleExitData?.entryAt ? formatDateTime(vehicleExitData.exitAt) : "Fecha no disponible"}
                    </Text>
                  </View>

                  <View style={styles.timeColumn}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="south-west" size={14} color="white" />
                      </View>
                      <Text style={styles.timeTitle}>Duración</Text>
                    </View>
                    <Text style={[styles.timeSubtitle, { marginLeft: 35 }]}>
                      {`${vehicleExitData?.minutes} minutos`}
                    </Text>
                  </View>
                </View>

                <Divider style={styles.divider} />
              </View>

              <Image
                source={require("../../../../../assets/images/BeParking.png")}
                style={{ marginLeft: 35 }}
              />

              <View style={styles.searchContainer}>
                <TextInput
                  label="Número de Documento *"
                  value={document}
                  onChangeText={setDocument}
                  mode="outlined"
                  theme={{
                    colors: {
                      outline: "#E5E5E5",
                      primary: "#90D400",
                    },
                  }}
                  style={styles.inputBase}
                  keyboardType="numeric"
                />

                <Button
                  mode="contained"
                  onPress={onSearch}
                  style={styles.searchButton}
                  disabled={vehicleExitData?.nombreProducto !== "Horas"}
                >
                  Buscar
                </Button>
              </View>

              {searchResult && (
                <View style={{ marginLeft: 35 }}>
                  <View style={styles.searchResult}>
                    <Text style={styles.clientId}>
                      {searchResult.data.cedula} - {searchResult.data.nombre} {searchResult.data.apellido}
                    </Text>
                    <View style={styles.greenPill}>
                      <Text style={styles.greenPillText}>{searchResult.data.extracto?.categoria}</Text>
                    </View>
                  </View>

                  <View style={styles.bonusSection}>
                    <Text style={styles.bonusTitle}>Bonos</Text>
                    {(bonusList && bonusList.length > 0) && bonusList.map((bonus, index) => (
                      <View key={index}>
                        <View style={styles.bonusItem}>
                          <View style={styles.checkboxContainer}>
                            <Checkbox
                              status={bonus.checked ? "checked" : "unchecked"}
                              color={bonus.checked || finalPrice > 0 ? "#90D400" : "#C4C4C4"} // verde si se puede usar, gris si está bloqueado
                              onPress={() => {
                                if (bonus.checked || finalPrice > 0) {
                                  setIsCalculatingBonuses(true)
                                  onChecked(bonus);
                                }
                              }}
                            />
                          </View>
                          <View style={styles.bonusInfo}>
                            <Text style={styles.bonusName}>{bonus.nombre}</Text>
                            <Text style={styles.bonusDescription}>
                              {bonus.tiempo}
                            </Text>
                          </View>
                          <View style={{ alignSelf: "flex-start" }}>
                            <Text style={styles.bonusValidity}>
                              vigencia: {formatDate(bonus.vigencia, 'fecha')}
                            </Text>
                          </View>
                        </View>

                        <Divider style={styles.dividerTwo} />
                      </View>
                    ))}
                  </View>

                  <View style={styles.discountSection}>
                    <Text style={styles.discountTitle}>
                      Código de Descuento
                    </Text>
                    <View style={styles.discountInputContainer}>
                      <TextInput
                        label="Código *"
                        value={code}
                        onChangeText={setCode}
                        mode="outlined"
                        theme={{
                          colors: {
                            outline: "#E5E5E5",
                            primary: "#90D400",
                          },
                        }}
                        style={styles.inputBase}
                        keyboardType="numeric"
                      />

                      <Button
                        mode="contained"
                        onPress={() => { }}
                        style={styles.searchButton}
                      >
                        Validar
                      </Button>
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.priceSection}>
                <View style={styles.priceHeader}>
                  <Text style={styles.priceHeaderText}>Valor del Servicio</Text>
                  <Text style={styles.priceHeaderAmount}>
                    {vehicleExitData?.serviceValue ? formatCurrency(vehicleExitData?.serviceValue) : "$ 0.00"}
                  </Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>
                    Descuento Bonos be parking
                  </Text>
                  <Text style={styles.priceAmount}>
                    {discountTotal.toFixed(2) ? formatCurrency(discountTotal) : "$ 0.00"}
                  </Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Valor a Pagar</Text>
                  <Text style={styles.priceAmount}>
                    {finalPrice.toFixed(2) ? formatCurrency(finalPrice) : "$ 0.00"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  mode="contained"
                  theme={{
                    colors: {
                      primary: "#8C8C8C",
                    },
                  }}
                  onPress={handlePrevious}
                  style={styles.cancelButton}
                >
                  Cancelar
                </Button>

                <Button
                  mode="contained"
                  loading={isSubmitting || isCalculatingBonuses}
                  disabled={isSubmitting || isCalculatingBonuses}
                  onPress={onContinue}
                  style={styles.continueButton}
                >
                  {isCalculatingBonuses ? "Procesando…" : "Continuar"}
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default BeParkingDeparture;
