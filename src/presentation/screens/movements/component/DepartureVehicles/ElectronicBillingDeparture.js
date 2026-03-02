import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native"; // Se agregó Alert para mostrar mensajes de alerta
import { Button, Card, Checkbox, Divider, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import useElectronicBillingDepartureHook from "../../hooks/HooksDepartureVehicles/useElectronicBillingDepartureHook";
import styles from "../../styles/stylesDepartureVehicles/stylesElectronicBillingDeparture";

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

const ElectronicBillingDeparture = () => {
    const {
        userInfo,
        nitCedula,
        cashInput,
        voucherInput,
        handleInputChange,
        handleSearch,
        handleCashInputChange,
        handleVoucherInputChange,
        selectedPayment,
        handlePaymentChange,
        isAuthorized,
        setIsAuthorized,
        showError,
        setShowError,
        resumeData,
        fetchResumeData,
        turnId,
        hasFetchedResumeData,
        savePayment,
        cupones,
        cashMixtoInput,
        voucherMixtoInput,
        mixtoDatafonoInput,
        handleCashMixtoInputChange,
        handleVoucherMixtoInputChange,
        handleMixtoDatafonoInputChange,
        handlePrevious,
        validateNitOrCC
    } = useElectronicBillingDepartureHook();

    const { billingSummary } = useSelector((state) => state.movements);
    const { serviceValue, discountBonos, discountValidacion, valueToPay: rawValueToPay } = billingSummary;
    const valueToPay = Math.max(0, rawValueToPay);
    const vehicleExitData = useSelector((state) => state.movements.vehicleExitData);
    const [isCashFocused, setIsCashFocused] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const nombreProducto = vehicleExitData?.nombreProducto;

    useEffect(() => {
        console.log("vehicleExitData:", vehicleExitData);
        console.log("turnId:", turnId);
        if (vehicleExitData?.plate && turnId && !resumeData && !hasFetchedResumeData) {
            fetchResumeData(vehicleExitData.plate);
        }
    }, [vehicleExitData?.plate, turnId, resumeData, hasFetchedResumeData, fetchResumeData]);

    useEffect(() => {
        if (nombreProducto && nombreProducto !== 'Horas') {
            handlePaymentChange('cupones');
        }
    }, [nombreProducto]);

    console.log("Total a pagar:", resumeData);
    const totalToPay = resumeData?.valorTotal ?? valueToPay;
    const isPaymentDisabled = totalToPay === 0;

    // NUEVO: Función que valida el efectivo ingresado y muestra una alerta si es insuficiente
    const handlePayment = async () => {
        if (!selectedPayment) {
            Alert.alert("Alerta", "Debe seleccionar un método de pago.");
            return;
        }

        if (nombreProducto === "Horas" && nitCedula.trim().length > 0 && !isAuthorized) {
            Alert.alert('Validación de documento', "Debe validar el NIT o Cédula antes de continuar con el pago.");
            return;
        }

        const total = resumeData?.valorTotal || valueToPay;

        // 🟢 VALIDACIÓN PARA PAGO MIXTO
        if (selectedPayment === "mixto") {
            const efectivo = parseFloat(cashMixtoInput) || 0;
            const datafono = parseFloat(mixtoDatafonoInput) || 0;

            // Si ambos están en 0 → no se puede continuar
            if (efectivo === 0 && datafono === 0) {
                Alert.alert("Alerta", "Para pago mixto, ambos campos (efectivo y datáfono) deben ser mayores a cero.");
                return;
            }

            // Caso 1️: Efectivo cubre todo y datafono está en 0 → cambia a “efectivo”
            if (datafono === 0 && efectivo >= total) {
                Alert.alert(
                    "Aviso",
                    "El valor en efectivo cubre el total. Se registrará el pago como 'efectivo'."
                );
                handleCashInputChange(String(efectivo));
                handlePaymentChange("efectivo");
                return;
            }

            // Caso 2: Datáfono cubre todo y efectivo está en 0 → cambia a “datafono”
            if (efectivo === 0 && datafono >= total) {
                Alert.alert(
                    "Aviso",
                    "El valor en datáfono cubre el total. Se registrará el pago como 'datáfono'."
                );
                handleVoucherInputChange(voucherMixtoInput || "");
                handlePaymentChange("datafono");
                return;
            }

            // Si la suma de ambos es menor que el total → error
            if (efectivo + datafono < total) {
                Alert.alert("Alerta", "La suma de los valores ingresados no cubre el total a pagar.");
                return;
            }
        }

        // 🟡 VALIDACIÓN PARA EFECTIVO
        if (!isPaymentDisabled && selectedPayment === "efectivo") {
            const cashProvided = parseFloat(cashInput) || 0;
            if (cashProvided < total) {
                Alert.alert("Alerta", "El efectivo ingresado es insuficiente.");
                return;
            }
        }

        try {
            setIsPaying(true);
            await savePayment(isPaymentDisabled, valueToPay);
        } finally {
            setIsPaying(false);
        }
    };

    const [selectedCoupons, setSelectedCoupons] = useState([]);

    const handleCouponSelect = (coupon) => {
        if (selectedCoupons.includes(coupon.codigoCupon)) {
            setSelectedCoupons(selectedCoupons.filter(id => id !== coupon.codigoCupon));
        } else {
            setSelectedCoupons([...selectedCoupons, coupon.codigoCupon]);
        }
    };

    return (
        <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ alignItems: "center", padding: 16 }}>
            <View style={{ width: "100%" }}>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.container}>
                            <Text style={styles.title}>Facturación Electrónica</Text>
                            <View style={{ flexDirection: "row", alignContent: "center" }}>
                                <View style={{ flexDirection: "column" }}>
                                    <TextInput
                                        label="NIT/Cédula *"
                                        mode="outlined"
                                        value={nitCedula}
                                        onChangeText={text => {
                                            handleInputChange(text);
                                            setIsAuthorized(false);
                                        }}
                                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                                        style={styles.textInput}
                                        error={nitCedula.length > 0 && !validateNitOrCC(nitCedula)}
                                        placeholder="Ej: 123456789-1 o 123456789"
                                        keyboardType="numeric"
                                        disabled={nombreProducto !== "Horas" || totalToPay === 0}
                                    />
                                    {nitCedula.length > 0 && !validateNitOrCC(nitCedula) && (
                                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                                            Ingresa un NIT válido (123456789-1) o una cédula válida (6-10 dígitos, sin ceros iniciales).
                                        </Text>
                                    )}
                                </View>
                                <Button
                                    mode="contained"
                                    onPress={handleSearch}
                                    style={styles.searchButton}
                                    disabled={nombreProducto !== "Horas" || totalToPay === 0}
                                >
                                    Validar
                                </Button>
                                {userInfo && (
                                    <Text style={styles.userInfoText}>
                                        {userInfo.number} - {userInfo.name}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.container}>
                            <Text style={[styles.title, { alignSelf: "center" }]}>Resumen de Pago</Text>

                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={styles.payTitle}>Producto</Text>
                                <Text style={styles.priceTitle}>{vehicleExitData?.nombreProducto || "Tipo no disponible"}</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <Text style={[styles.payTitle, { marginTop: 10 }]}>Valor Servicio</Text>
                                <Text style={[styles.priceTitle, { marginTop: 10 }]}>
                                    {formatCurrency(serviceValue)}
                                </Text>
                            </View>

                            <Divider style={styles.divider} />

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                <Text style={styles.payTitle}>Descuentos</Text>
                                <Text style={styles.priceTitle}>
                                    {formatCurrency(
                                        (resumeData?.bonoBeParking || 0) +
                                        (resumeData?.codigoBeParking || 0) +
                                        (resumeData?.descuentoValidaciones || 0)
                                    )}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 15, marginTop: 10 }}>
                                <Text style={styles.priceTitle}>bono be parking</Text>
                                <Text style={styles.priceTitle}>
                                    {formatCurrency(resumeData?.bonoBeParking)}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 15, marginTop: 5 }}>
                                <Text style={styles.priceTitle}>código be parking</Text>
                                <Text style={styles.priceTitle}>
                                    {formatCurrency(resumeData?.codigoBeParking)}
                                </Text>
                            </View>
                            {resumeData?.alianzaBancosImporte > 0 && (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 15, marginTop: 5 }}>
                                    <Text style={styles.priceTitle}>descuento alianza bancos</Text>
                                    <Text style={styles.priceTitle}>
                                        {formatCurrency(resumeData?.alianzaBancosImporte)}
                                    </Text>
                                </View>
                            )}
                            {resumeData?.validacionImporte > 0 && (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 15, marginTop: 5 }}>
                                    <Text style={styles.priceTitle}>descuento validaciones</Text>
                                    <Text style={styles.priceTitle}>
                                        {formatCurrency(resumeData?.descuentoValidaciones)}
                                    </Text>
                                </View>
                            )}

                            <Divider style={styles.divider} />

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                <Text style={styles.payTitle}>Tiquete Perdido</Text>
                                <Text style={styles.priceTitle}>
                                    {resumeData?.tiquetePerdido ? formatCurrency(resumeData.tiquetePerdido) : "$0.00"}
                                </Text>
                            </View>

                            <Divider style={styles.divider} />

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                <Text style={styles.payTitle}>Subtotal</Text>
                                <Text style={styles.priceTitle}>
                                    {resumeData?.valorBase ? formatCurrency(resumeData.valorBase) : formatCurrency(valueToPay)}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <Text style={styles.payTitle}>Iva</Text>
                                <Text style={styles.priceTitle}>
                                    {resumeData?.valorIva ? formatCurrency(resumeData.valorIva) : "$0.00"}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <Text style={styles.payTitle}>Valor a pagar</Text>
                                <Text style={styles.priceTitle}>
                                    {resumeData?.valorTotal ? formatCurrency(resumeData.valorTotal) : formatCurrency(valueToPay)}
                                </Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                {!isPaymentDisabled && (
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.container}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.title, { marginTop: 4 }]}>Medio de Pago</Text>
                                    {/*{nombreProducto === 'Horas' && (
                                        <>
                                            <Checkbox
                                                color="#90D400"
                                                status={selectedPayment === 'efectivo' ? 'checked' : 'unchecked'}
                                                onPress={() => handlePaymentChange('efectivo')}
                                            />
                                            <Text style={[styles.priceTitle, { marginTop: 4 }]}>Efectivo</Text>

                                            <Checkbox
                                                color="#90D400"
                                                status={selectedPayment === 'datafono' ? 'checked' : 'unchecked'}
                                                onPress={() => handlePaymentChange('datafono')}
                                            />
                                            <Text style={[styles.priceTitle, { marginTop: 4 }]}>Datáfono</Text>

                                            <Checkbox
                                                color="#90D400"
                                                status={selectedPayment === 'mixto' ? 'checked' : 'unchecked'}
                                                onPress={() => handlePaymentChange('mixto')}
                                            />
                                            <Text style={[styles.priceTitle, { marginTop: 4 }]}>Mixto</Text>
                                        </>
                                    )}

                                    {nombreProducto !== 'Horas' && (
                                        <>
                                            <Checkbox
                                                color="#90D400"
                                                status={selectedPayment === 'cupones' ? 'checked' : 'unchecked'}
                                                onPress={() => handlePaymentChange('cupones')}
                                            />
                                            <Text style={[styles.priceTitle, { marginTop: 4 }]}>Cupones</Text>
                                        </>
                                    )}*/}

                                    <Checkbox
                                        color="#90D400"
                                        status={selectedPayment === 'efectivo' ? 'checked' : 'unchecked'}
                                        onPress={() => handlePaymentChange('efectivo')}
                                    />
                                    <Text style={[styles.priceTitle, { marginTop: 4 }]}>Efectivo</Text>

                                    <Checkbox
                                        color="#90D400"
                                        status={selectedPayment === 'datafono' ? 'checked' : 'unchecked'}
                                        onPress={() => handlePaymentChange('datafono')}
                                    />
                                    <Text style={[styles.priceTitle, { marginTop: 4 }]}>Datáfono</Text>

                                    <Checkbox
                                        color="#90D400"
                                        status={selectedPayment === 'mixto' ? 'checked' : 'unchecked'}
                                        onPress={() => handlePaymentChange('mixto')}
                                    />
                                    <Text style={[styles.priceTitle, { marginTop: 4 }]}>Mixto</Text>

                                </View>
                                {selectedPayment === 'efectivo' && (
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                            <Text style={styles.payTitle}>Efectivo</Text>
                                            <TextInput
                                                label="$Efectivo *"
                                                mode="outlined"
                                                value={
                                                    isCashFocused
                                                        ? cashInput
                                                        : cashInput !== ""
                                                            ? formatCurrency(cashInput)
                                                            : ""
                                                }
                                                placeholder={isCashFocused ? "" : "$ 0.00"}
                                                onChangeText={handleCashInputChange}
                                                onFocus={() => setIsCashFocused(true)}
                                                onBlur={() => setIsCashFocused(false)}
                                                theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                                                style={styles.textInput}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 15 }}>
                                            <Text style={styles.payTitle}>Cambio</Text>
                                            <Text style={styles.priceTitle}>
                                                {formatCurrency(
                                                    Math.max(
                                                        parseFloat(cashInput || "0") - (resumeData?.valorTotal || valueToPay || 0),
                                                        0
                                                    )
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                {selectedPayment === 'datafono' && (
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                            <Text style={styles.payTitle}>Número de Comprobante</Text>
                                            <TextInput
                                                label="Número de Comprobante *"
                                                mode="outlined"
                                                value={voucherInput}
                                                onChangeText={handleVoucherInputChange}
                                                theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                                                style={styles.textInput}
                                                keyboardType="default"
                                            />
                                        </View>
                                    </View>
                                )}
                                {selectedPayment === 'mixto' && (
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                            <Text style={styles.payTitle}>Efectivo</Text>
                                            <TextInput
                                                label="$Efectivo *"
                                                mode="outlined"
                                                value={
                                                    isCashFocused
                                                        ? cashMixtoInput
                                                        : cashMixtoInput !== ""
                                                            ? formatCurrency(cashMixtoInput)
                                                            : ""
                                                }
                                                placeholder={isCashFocused ? "" : "$ 0.00"}
                                                onChangeText={handleCashMixtoInputChange}
                                                onFocus={() => setIsCashFocused(true)}
                                                onBlur={() => setIsCashFocused(false)}
                                                theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                                                style={styles.textInput}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 10 }}>
                                            <Text style={styles.payTitle}>Número de Comprobante</Text>
                                            <TextInput
                                                label="Número de Comprobante *"
                                                mode="outlined"
                                                value={voucherMixtoInput}
                                                onChangeText={handleVoucherMixtoInputChange}
                                                theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                                                style={styles.textInput}
                                                keyboardType="default"
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 10 }}>
                                            <Text style={styles.payTitle}>Pago en Datáfono</Text>
                                            <TextInput
                                                label="$Pago en Datáfono *"
                                                mode="outlined"
                                                value={
                                                    isCashFocused
                                                        ? mixtoDatafonoInput
                                                        : mixtoDatafonoInput !== ""
                                                            ? formatCurrency(mixtoDatafonoInput)
                                                            : ""
                                                }
                                                placeholder={isCashFocused ? "" : "$ 0.00"}
                                                onChangeText={handleMixtoDatafonoInputChange}
                                                onFocus={() => setIsCashFocused(true)}
                                                onBlur={() => setIsCashFocused(false)}
                                                theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                                                style={styles.textInput}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 15 }}>
                                            <Text style={styles.payTitle}>Cambio</Text>
                                            <Text style={styles.priceTitle}>
                                                {formatCurrency(
                                                    Math.max(
                                                        (parseFloat(cashMixtoInput || "0") + parseFloat(mixtoDatafonoInput || "0")) - (resumeData?.valorTotal || valueToPay || 0),
                                                        0
                                                    )
                                                )}
                                            </Text>
                                        </View>

                                    </View>
                                )}
                                {/*{selectedPayment === 'cupones' && (
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                            <Text style={styles.payTitle}>
                                                {cupones && cupones.length > 0 ? "Cupones" : "No cuenta con cupones"}
                                            </Text>
                                        </View>
                                        {cupones && cupones.length > 0 && cupones.map((cupon) => (
                                            <View key={cupon.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                                <Checkbox
                                                    color="#90D400"
                                                    status={selectedCoupons.includes(cupon.codigoCupon) ? "checked" : "unchecked"}
                                                    onPress={() => handleCouponSelect(cupon)}
                                                />
                                                <Text style={styles.priceTitle}>{cupon.descripcion}</Text>
                                                <Text style={styles.priceTitle}>{formatCurrency(cupon.importeDescuento)}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}*/}
                            </View>
                        </Card.Content>
                    </Card>
                )}
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                onPress={handlePayment}
                                loading={isPaying}
                                disabled={isPaying || !selectedPayment ||
                                    (selectedPayment === 'cupones' && selectedCoupons.length === 0) /*(selectedPayment === "cupones" && (!cupones || cupones.length === 0))*/}
                                style={styles.payButton}
                            >
                                {isPaying ? "Procesando..." : "Pagar"}
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    );
};

export default ElectronicBillingDeparture;