import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useAppSelector } from "../../../../state/hooks";
import useShiftSelectorHook from "../../arching/hooks/useShiftSelectorHook";
import styles from "../styles/stylesSelector";
import VerificationModal from "./VerificationModal";

/* ---------- Formateador de moneda (sin anotaciones TS) ---------- */
const formatCurrency = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "$ 0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Cambia a "MXN" si lo necesitas
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const ArchingSelector = () => {
  /* ---------- Estados locales ---------- */
  const [userDetail, setUserDetail] = useState(null);
  const [isCashFocused, setIsCashFocused] = useState(false);
  const [multipleError, setMultipleError] = useState("");
  const [selectedTurn, setSelectedTurn] = useState(null);

  /* ---------- Hook con la lógica de turnos ---------- */
  const {
    functions: {
      handleSelectshiftList,
      handleSetValue,
      verifyValue,
      handleConfirm,
      fetchTurnData,
    },
    states: { data, value, baseCaja, turnData },
  } = useShiftSelectorHook();

  /* ---------- Usuario desde Redux ---------- */
  const { nombreParking } = useAppSelector((state) => state.auth);

  /* ---------- Opciones del dropdown ---------- */
  const options =
    data?.listTurn?.map((turn) => ({
      label: `Turno ${turn.turnoId} - ${turn.horaInicial} - ${turn.horaFinal}`,
      value: turn,
    })) || [];

  /* ---------- Cargar turnos al montar ---------- */
  useEffect(() => {
    fetchTurnData();
  }, []);

  /* ---------- Manejar cambio del input ---------- */
  const onChangeValue = (text) => {
    handleSetValue(text);
    const num = Number(text);
    if (!isNaN(num) && num > 0 && num % 50 !== 0) {
      setMultipleError("Solo se permiten múltiplos de 50");
    } else {
      setMultipleError("");
    }
  };

  /* ---------- Guardar y limpiar ---------- */
  /*const handleSave = async () => {
    const ok = await verifyValue(); // tu lógica existente
    if (ok) {
      handleSetValue("");      // Limpia en tu store/hook
      setMultipleError("");    // Elimina mensaje de error
      setIsCashFocused(false); // Hace que se muestre placeholder
    }
  };*/

  const handleSave = async () => {
    const num = Number(value);
    if (!value || isNaN(num) || num <= 0 || num % 50 !== 0) {
      setMultipleError("Ingresa un monto válido. Solo múltiplos de 50.");
      return;
    }

    const ok = await verifyValue();
    if (ok) {
      handleSetValue("");
      setMultipleError("");
      setIsCashFocused(false);
    }
  };


  /* ─────────────────── UI ─────────────────── */
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        {/* ---------- Tarjeta de selección de turno ---------- */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{nombreParking}</Text>

            <View style={{ marginTop: 20, width: "100%" }}>
              <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.dropdownText}
                containerStyle={styles.dropdownContainer}
                data={options}
                labelField="label"
                valueField="value"
                placeholder="Selecciona un turno"
                value={selectedTurn}
                onChange={(item) => {
                  setSelectedTurn(item.value);
                  handleSelectshiftList(item.value.turnoId);
                }}
              />
            </View>
          </Card.Content>
        </Card>

        {/* ---------- Tarjeta con detalle y arqueo ---------- */}
        {selectedTurn && (
          <Card style={styles.card}>
            <Card.Content>
              {/* Encabezado con datos del turno */}
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.titleMenu}>Turno</Text>
                  <Text style={styles.subtitleMenu}>
                    Turno {selectedTurn.turnoId} - {selectedTurn.horaInicial} a{" "}
                    {selectedTurn.horaFinal}
                  </Text>
                </View>
                <View style={{ marginLeft: 50 }}>
                  <Text style={styles.titleMenu}>Operario</Text>
                  <Text style={styles.subtitleMenu}>
                    {selectedTurn.empleadoNombre} - {selectedTurn.numeroIdentificacion}
                  </Text>
                </View>
                <View style={{ marginLeft: 50 }}>
                  <Text style={styles.titleMenu}>Base Caja</Text>
                  <Text style={styles.subtitleMenu}>{formatCurrency(baseCaja)}</Text>
                </View>
              </View>

              {/* Input para el valor del arqueo */}
              <View>
                <TextInput
                  label="Valor del Arqueo *"
                  value={
                    isCashFocused
                      ? value
                      : value !== ""
                        ? formatCurrency(value)
                        : ""
                  }
                  placeholder={isCashFocused ? "" : "$ 0.00"}
                  onChangeText={onChangeValue}
                  mode="outlined"
                  theme={{
                    colors: { outline: "#E5E5E5", primary: "#90D400" },
                  }}
                  onFocus={() => setIsCashFocused(true)}
                  onBlur={() => setIsCashFocused(false)}
                  style={styles.inputBase}
                  keyboardType="numeric"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Image
                          source={require("../../../../assets/images/monetization_on.png")}
                          style={styles.iconInput}
                        />
                      )}
                    />
                  }
                />

                {multipleError.length > 0 && (
                  <Text style={{ color: "red", marginTop: 4 }}>
                    {multipleError}
                  </Text>
                )}
              </View>

              {/* Botón de guardar */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 40,
                }}
              >
                <Button
                  mode="contained"
                  disabled={multipleError.length > 0}
                  onPress={handleSave}
                  style={styles.continueButton}
                >
                  Guardar
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* ---------- Modal de verificación ---------- */}
        <VerificationModal onConfirm={handleConfirm} />
      </View>
    </ScrollView>
  );
};

export default ArchingSelector;

