import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Card, Text, TextInput } from "react-native-paper";

import { useAppSelector } from "../../../../state/hooks";
import useShiftSelectorHook from "../hooks/useShiftSelectorHook";
import styles from "../styles/stylesSelector";
import VerificationModal from "./VerificationModal";

/* ──────── Formateador de moneda ──────── */
const formatCurrency = (value) => {
    const number = Number(value);
    if (isNaN(number)) return "$ 0.00";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", // Cambia a "MXN" si lo prefieres
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

const ShiftSelector = () => {
    /* ──────── Estados locales ──────── */
    const [isCashFocused, setIsCashFocused] = useState(false);
    const [userDetail, setUserDetail] = useState(null);
    const [multipleError, setMultipleError] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [amount, setAmount] = useState("");

    /* ──────── Datos de Redux ──────── */
    const {nombreParking } = useAppSelector((state) => state.auth);

    /* ──────── Hook de lógica de turnos ──────── */
    const {
        functions: { handleSelectshiftList, fetchTurnData },
        states: { data, value, turnData },
    } = useShiftSelectorHook();

    /* ──────── Hook de lógica para modal y guardado ──────── */
    const {
        showModal,
        hideModal,
        visible,
        modalType,
        modalData,
        handleSave,     // guarda avance y muestra modal
        handleConfirm,  // confirma en el modal
    } = useShiftSelectorHook();

    /* ──────── Opciones del dropdown ──────── */
    const options =
        data?.listTurn?.map((turn) => ({
            label: `Turno ${turn.turnoId} - ${turn.horaInicial} - ${turn.horaFinal}`,
            value: turn,
        })) || [];

    /* ──────── Cargar turnos al montar ──────── */
    useEffect(() => {
        fetchTurnData();
    }, []);

    /* ──────── Validar y setear input ──────── */
    const onChangeValue = (text) => {
        setAmount(text);
        const num = Number(text);
        if (!isNaN(num) && num > 0 && num % 50 !== 0) {
            setMultipleError("Solo se permiten múltiplos de 50");
        } else {
            setMultipleError("");
        }
    };

    /* ──────── Guardar y limpiar ──────── */
    const handleSavePress = async () => {
        // Ejecuta el guardado (abre modal, etc.)
        const ok = await handleSave(amount, selectedOption.numeroIdentificacion);

        // Si la operación fue exitosa, limpia el campo y errores
        if (ok) {
            setAmount("");
            setMultipleError("");
            setIsCashFocused(false);
        }
    };

    /* ─────────────────── UI ─────────────────── */
    return (
        <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                {/* Tarjeta para elegir turno */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.title}>{nombreParking}</Text>

                        <View style={{ marginTop: 20, width: "100%" }}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.dropdownPlaceholder}
                                selectedTextStyle={styles.dropdownText}
                                containerStyle={styles.dropdownContainer}
                                data={options}
                                labelField="label"
                                valueField="value"
                                placeholder="Selecciona un Turno"
                                value={selectedOption}
                                onChange={(item) => {
                                    setSelectedOption(item.value);
                                    handleSelectshiftList(item.value.turnoId);
                                }}
                            />
                        </View>
                    </Card.Content>
                </Card>

                {/* Tarjeta de detalles y avance */}
                {selectedOption && (
                    <Card style={styles.card}>
                        <Card.Content>
                            {/* Detalles del turno / operario */}
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <Text style={styles.titleMenu}>Turno</Text>
                                    <Text style={styles.subtitleMenu}>
                                        Turno {selectedOption.turnoId} - {selectedOption.horaInicial} a{" "}
                                        {selectedOption.horaFinal}
                                    </Text>
                                </View>

                                <View style={{ marginLeft: 50 }}>
                                    <Text style={styles.titleMenu}>Operario</Text>
                                    <Text style={styles.subtitleMenu}>
                                        {selectedOption.empleadoNombre} - {selectedOption.numeroIdentificacion}
                                    </Text>
                                </View>
                            </View>

                            {/* Input de avance */}
                            <View>
                                <TextInput
                                    label="Valor del Avance *"
                                    value={
                                        isCashFocused
                                            ? amount
                                            : amount !== ""
                                                ? formatCurrency(amount)
                                                : ""
                                    }
                                    placeholder={isCashFocused ? "" : "$ 0.00"}
                                    onChangeText={onChangeValue}
                                    onFocus={() => setIsCashFocused(true)}
                                    onBlur={() => setIsCashFocused(false)}
                                    mode="outlined"
                                    theme={{
                                        colors: { outline: "#E5E5E5", primary: "#90D400" },
                                    }}
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
                                    marginTop: 100,
                                }}
                            >
                                <Button
                                    mode="contained"
                                    disabled={multipleError.length > 0}
                                    onPress={handleSavePress}
                                    style={styles.continueButton}
                                >
                                    Guardar
                                </Button>
                            </View>
                        </Card.Content>
                    </Card>
                )}

                {/* Modal de verificación */}
                <VerificationModal
                    visible={visible}
                    hideModal={hideModal}
                    modalType={modalType}
                    modalData={modalData}
                    onConfirm={() => {
                        // Si tu lógica requiere confirmación adicional,
                        // llama aquí a handleConfirm según tu implementación
                        if (modalType !== "success" && modalType !== "warning") {
                            handleConfirm(selectedOption.numeroIdentificacion);
                        }
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default ShiftSelector;
