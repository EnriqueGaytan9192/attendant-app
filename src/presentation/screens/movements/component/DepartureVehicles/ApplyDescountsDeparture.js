import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Text,
  TextInput
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { formatDateTime } from "../../../../../common/actions";
import { setAppliedAlliance, setDiscountAllianceBank, setDiscountValidacion } from "../../../../../state/slices/movementsSlice";
import useApplyDescountsDepartureHook from "../../hooks/HooksDepartureVehicles/useApplyDescountsDepartureHook";
import styles from "../../styles/stylesDepartureVehicles/stylesApplyDescountsDeparture";
import InlineQRScanner from "./InlineQRScanner";

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

const ApplyDescountsDeparture = () => {
  const {
    selectedTabDescounts,
    vehicleExitData,
    handleNext,
    handlePrevious,
    setSelectedTabDescounts,
    parseInvoiceQR,
    validateInvoiceQR,
    getAplicableValidations,
    handleApplyAndNext,
    banks,
    errorBanks,
    loadingBanks,
    bin,
    setBin,
    validateAllianceBank,
    applyAllianceLogic,
    applyAllianceBankDiscount,
    cufe,
    setCufe,
    getAllianceBankErrorMessage,
    canApplyAllianceBank,
  } = useApplyDescountsDepartureHook();
  const [selectedAlliances, setSelectedAlliances] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [validations, setValidations] = useState([]);
  const [selectedValidations, setSelectedValidations] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const dispatch = useDispatch();

  // Obtenemos los valores del resumen de facturación
  const { serviceValue, discountBonos, discountValidacion, discountAllianceBank, valueToPay: rawValueToPay, appliedAlliance } = useSelector(
    (state) => state.movements.billingSummary
  );
  const valueToPay = Math.max(0, rawValueToPay);

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

  const toggleValidation = (item) => {
    setSelectedValidations((prev) => {
      const isSelected = prev.find((v) => v.validacionBonoId === item.validacionBonoId);
      let updated;

      if (isSelected) {
        updated = prev.filter((v) => v.validacionBonoId !== item.validacionBonoId);
      } else {
        updated = [...prev, item];
      }

      const newTotal = updated.reduce(
        (sum, v) => sum + (parseFloat(v.bonoValidacionImporte) || 0),
        0
      );

      dispatch(setDiscountValidacion(newTotal)); // ✅ Actualiza descuento y recalcula total

      setTotalDiscount(newTotal);
      return updated;
    });
  };

  const isValidationDisabled = (item) => {
    const montoMinimo = Number(item.montoMinimo) || 0;
    const bonoImporte = Number(item.bonoValidacionImporte) || 0;
    const isChecked = selectedValidations.some(
      (v) => v.validacionBonoId === item.validacionBonoId
    );

    const totalConEste = totalDiscount + bonoImporte;
    const nuevoTotalPagar = Math.max(0, serviceValue - totalConEste);

    if (serviceValue < montoMinimo) return true;

    if (valueToPay <= 0 && isChecked) return false;

    if (valueToPay <= 0 && !isChecked) return true;

    if (totalConEste > serviceValue) return true;

    return false;
  };

  const alliances = [
    { label: "Alianza de Prueba 1", value: "1" },
    { label: "Alianza de Prueba 2", value: "2" },
    { label: "Alianza de Prueba 3", value: "3" },
    { label: "Alianza de Prueba 4", value: "4" },
  ];

  const bank = [
    { label: "Banco de Prueba 1", value: "1" },
    { label: "Banco de Prueba 2", value: "2" },
    { label: "Banco de Prueba 3", value: "3" },
    { label: "Banco de Prueba 4", value: "4" },
  ];

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
                  <MaterialIcons
                    name={getVehicleIcon(vehicleExitData?.typeVehicle)}
                    size={25}
                    color="#90D400"
                  />
                  <Text style={[styles.vehicleText, { marginLeft: 10 }]}>
                    {vehicleExitData?.plate || "Placa no disponible"}
                  </Text>
                </View>

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
                        <MaterialIcons
                          name="north-east"
                          size={14}
                          color="white"
                        />
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
                        <MaterialIcons
                          name="south-west"
                          size={14}
                          color="white"
                        />
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
                        <MaterialIcons
                          name="south-west"
                          size={14}
                          color="white"
                        />
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

              <Text style={[styles.vehicleText, { marginLeft: 40 }]}>
                Aplicar Descuentos
              </Text>

              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTabDescounts === "validations" && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTabDescounts("validations")}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedTabDescounts === "validations" ? "#005A6D" : "#8C8C8C",
                    }}
                  >
                    Validaciones
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tab, selectedTabDescounts === "virtualCodes" && styles.activeTab]}
                  onPress={() => setSelectedTabDescounts("virtualCodes")}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedTabDescounts === "virtualCodes" ? "#005A6D" : "#8C8C8C",
                    }}
                  >
                    Código Virtuales
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTabDescounts === "allianceBanks" && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTabDescounts("allianceBanks")}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedTabDescounts === "allianceBanks" ? "#005A6D" : "#8C8C8C",
                    }}
                  >
                    Alianza Bancos
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                {selectedTabDescounts === "validations" && (
                  <View style={{ marginTop: 50 }}>
                    <View>
                      <Text style={[styles.timeTitle, { alignSelf: 'center' }]}>Escanear el código</Text>

                      <InlineQRScanner
                        onScan={async (data) => {
                          try {
                            console.log("QR escaneado:", data);

                            // Parsear el contenido del QR
                            const parsed = parseInvoiceQR(data);
                            console.log("Datos parseados:", parsed);

                            // Validar los datos antes de enviar
                            if (!parsed?.NitFac || !parsed?.CUFE || !parsed?.ValTolFac) {
                              console.warn("QR incompleto, no se enviará a la API");
                              return;
                            }

                            setCufe(parsed.CUFE)

                            const qrResponse = await validateInvoiceQR(parsed);
                            console.log("Respuesta validación QR:", JSON.stringify(qrResponse, null, 2));

                            if (Array.isArray(qrResponse && qrResponse[0]?.validacionBono)) {
                              const aplicables = await getAplicableValidations(qrResponse);
                              console.log("Validaciones aplicables obtenidas:", aplicables);

                              // 🔗 Enlazar nombre de tipoDescuento con su ID
                              const bonosOriginales = qrResponse[0].validacionBono;
                              const enriquecidas = aplicables.map((a) => {
                                const original = bonosOriginales.find(
                                  (b) => b.validacionBonoId === a.validacionBonoId
                                );
                                return {
                                  ...a,
                                  TipoDescuento: original?.TipoDescuento,
                                  nombreBono: original?.nombre,
                                  montoMinimo: original?.montoMinimo ?? 0,
                                  valorDescuento: original?.valorDescuento ?? 0,
                                };
                              });


                              console.log("Validaciones enriquecidas:", enriquecidas);
                              setValidations(enriquecidas);
                            } else {
                              console.warn("No se encontraron validaciones en la respuesta");
                              setValidations([]);
                            }

                            // Mostrar feedback visual
                            Alert.alert("Éxito", "Factura QR validada correctamente");

                          } catch (error) {
                            console.error("Error procesando QR:", error);

                            if (error.code === 409) {
                              Alert.alert(
                                "Factura ya utilizada",
                                "Esta factura ya fue usada anteriormente."
                              );
                              return;
                            }

                            if (error.code === 404) {
                              Alert.alert(
                                "Factura no válida",
                                "El NIT del emisor no está registrado como cliente corporativo."
                              );
                              return;
                            }


                            if (error.code === 401 || error.code === 403) {
                              Alert.alert(
                                "Sesión expirada",
                                "Tu sesión ha expirado. Inicia sesión nuevamente."
                              );
                              return;
                            }

                            if (error.code === 500) {
                              Alert.alert(
                                "Error del servidor",
                                "No se pudo validar la factura. Intenta nuevamente."
                              );
                              return;
                            }

                            if (error.code === 502) {
                              Alert.alert(
                                "Servicio no disponible",
                                "El servicio de validación no está disponible en este momento. Intenta nuevamente en unos minutos."
                              );
                              return;
                            }


                            Alert.alert(
                              "Error al validar factura",
                              error.message || "Error desconocido"
                            );
                          }
                        }}
                      />

                    </View>
                    {/*<View>
                      <Text style={[styles.timeTitle, { alignSelf: 'center' }]}>Escanear el código</Text>

                      <View style={styles.scannerContainer}>
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                      </View>
                    </View>*/}

                    <Text style={[styles.vehicleText, { fontSize: 16, marginLeft: 40, marginTop: 30 }]}>
                      Validaciones Actuales
                    </Text>

                    <Text style={[styles.vehicleSubText, { marginLeft: 40 }]}>
                      Debe seleccionar la validación que desea aplicar para realizar el pago
                    </Text>

                    {validations.length > 0 ? (
                      validations.map((item, index) => {
                        console.log("ITEM VALIDATION:", item);
                        const isChecked = selectedValidations.some(
                          (v) => v.validacionBonoId === item.validacionBonoId
                        );
                        return (
                          <View
                            key={item.validacionBonoId || index}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginLeft: 50,
                              marginRight: 25,
                              marginTop: index === 0 ? 20 : 5,
                            }}
                          >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                              <Checkbox
                                status={isChecked ? "checked" : "unchecked"}
                                onPress={() => !isValidationDisabled(item) && toggleValidation(item)}
                                color="#90D400"
                                disabled={isValidationDisabled(item)}
                                uncheckedColor={isValidationDisabled(item) ? "#ccc" : "#90D400"}
                              />

                              <Text
                                style={[styles.vehicleText, { fontSize: 16, marginLeft: 10, color: isValidationDisabled(item) ? "#aaa" : "#000", }]}
                              >
                                {/*{`Validación ${item.nombre} ${item.TipoDescuento?.nombre || ""}`}*/}
                                {`Validación ${item.TipoDescuento?.nombre || ""}`}
                              </Text>
                            </View>
                            <Text style={styles.vehicleSubText}>
                              ${item.bonoValidacionImporte?.toLocaleString("es-US") || "0"}
                            </Text>
                          </View>
                        )
                      })
                    ) : (
                      <Text
                        style={{
                          textAlign: "center",
                          marginTop: 10,
                          color: "#888",
                          fontStyle: "italic",
                        }}
                      >
                        No hay validaciones disponibles.
                      </Text>
                    )}

                    <View style={styles.priceSection}>
                      <View style={styles.priceHeader}>
                        <Text style={styles.priceHeaderText}>Valor del Servicio</Text>
                        <Text style={styles.priceHeaderAmount}>
                          {serviceValue ? formatCurrency(serviceValue) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>
                          Descuento Bonos be parking
                        </Text>
                        <Text style={styles.priceAmount}>
                          {discountBonos ? formatCurrency(discountBonos) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Descuento Validación</Text>
                        <Text style={styles.priceAmount}>
                          {discountValidacion ? formatCurrency(discountValidacion) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Valor a Pagar</Text>
                        <Text style={styles.priceAmount}>
                          {valueToPay ? formatCurrency(valueToPay) : "$ 0.00"}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {selectedTabDescounts === "virtualCodes" && (
                  <View style={{ marginTop: 30 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.dropdownPlaceholder}
                        selectedTextStyle={styles.dropdownText}
                        containerStyle={styles.dropdownContainer}
                        data={alliances}
                        labelField="label"
                        valueField="value"
                        placeholder="Alianzas *"
                        value={selectedAlliances}
                        onChange={(item) => setSelectedAlliances(item.value)}
                      />

                      <TextInput
                        label="Código *"
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
                        style={styles.validateButton}
                      >
                        Validar
                      </Button>
                    </View>

                    <View style={styles.priceSection}>
                      <View style={styles.priceHeader}>
                        <Text style={styles.priceHeaderText}>Valor del Servicio</Text>
                        <Text style={styles.priceHeaderAmount}>
                          {serviceValue ? formatCurrency(serviceValue) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>
                          Descuento Bonos be parking
                        </Text>
                        <Text style={styles.priceAmount}>
                          {discountBonos ? formatCurrency(discountBonos) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Descuento Códigos Virtuales</Text>
                        <Text style={styles.priceAmount}>
                          {discountValidacion ? formatCurrency(discountValidacion) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Valor a Pagar</Text>
                        <Text style={styles.priceAmount}>
                          {valueToPay ? formatCurrency(valueToPay) : "$ 0.00"}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {selectedTabDescounts === "allianceBanks" && (
                  <View style={{ marginTop: 30 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.dropdownPlaceholder}
                        selectedTextStyle={styles.dropdownText}
                        containerStyle={styles.dropdownContainer}
                        data={banks}
                        labelField="label"
                        valueField="value"
                        placeholder={loadingBanks ? "Cargando bancos..." : "Banco *"}
                        value={selectedBank}
                        onChange={(item) => {
                          console.log("Banco seleccionado:", item);
                          setSelectedBank(item.value);
                        }}
                        disable={loadingBanks}
                      />

                      <TextInput
                        label="Bines *"
                        mode="outlined"
                        value={bin}
                        onChangeText={setBin}
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
                        onPress={async () => {
                          try {

                            if (!selectedBank) {
                              Alert.alert("Error", "Debe seleccionar una alianza");
                              return;
                            }

                            const response = await validateAllianceBank({
                              alianzaId: selectedBank,
                              bin,
                              placa: vehicleExitData?.plate,
                            });

                            const alliance = response?.[0];

                            const canApply = canApplyAllianceBank({
                              alliance,
                              discountBonos,
                              discountValidacion,
                            });

                            if (!canApply) {
                              Alert.alert(
                                "Alianza no disponible",
                                "Esta alianza bancaria no puede aplicarse porque ya se utilizó un producto no permitido."
                              );
                              return;
                            }

                            const { discount } = applyAllianceLogic({
                              alliances: response,
                              serviceValue: vehicleExitData?.serviceValue,
                            })

                            dispatch(setDiscountAllianceBank(discount));

                            dispatch(setAppliedAlliance({
                              alianzaId: alliance.alianzaId,
                              alianzaBinId: alliance.alianzaBinId,
                              montoDescuento: discount,
                            }));

                            Alert.alert("Éxito", "Alianza bancaria aplicada correctamente.");
                          } catch (error) {
                            Alert.alert(
                              "Error",
                              getAllianceBankErrorMessage(error)
                            );
                          }

                        }}
                        style={styles.validateButton}
                      >
                        Validar
                      </Button>
                    </View>

                    {!loadingBanks && banks.length === 0 && (
                      <Text style={{ marginTop: 10, color: "#888" }}>
                        No hay alianzas bancarias disponibles para este parqueadero
                      </Text>
                    )}


                    <View style={[styles.priceSection, { marginTop: 100 }]}>
                      <View style={styles.priceHeader}>
                        <Text style={styles.priceHeaderText}>Valor del Servicio</Text>
                        <Text style={styles.priceHeaderAmount}>
                          {serviceValue ? formatCurrency(serviceValue) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>
                          Descuento Bonos be parking
                        </Text>
                        <Text style={styles.priceAmount}>
                          {discountBonos ? formatCurrency(discountBonos) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Descuento Alianzas de Bancos</Text>
                        <Text style={styles.priceAmount}>
                          {discountAllianceBank ? formatCurrency(discountAllianceBank) : "$ 0.00"}
                        </Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Valor a Pagar</Text>
                        <Text style={styles.priceAmount}>
                          {valueToPay ? formatCurrency(valueToPay) : "$ 0.00"}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
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
                  onPress={async () => {
                    try {
                      await handleApplyAndNext(selectedValidations, discountValidacion);

                      if (appliedAlliance) {
                        await applyAllianceBankDiscount(appliedAlliance);
                      }

                      handleNext();
                    } catch (error) {
                      Alert.alert(
                        "Error",
                        error.message || "No se pudieron aplicar los descuentos."
                      );
                    }
                  }}
                  style={styles.continueButton}
                >
                  Continuar
                </Button>
              </View>

            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default ApplyDescountsDeparture;
