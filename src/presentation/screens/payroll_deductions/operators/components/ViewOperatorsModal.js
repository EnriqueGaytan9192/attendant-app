import { useEffect } from "react";
import { Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Checkbox, Divider, Text } from "react-native-paper";
import { showAlert } from "../../../../../common/components/AlertManager";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import useViewOperatorsModalHook from "../hooks/useViewOperatorsModalHook";
import stylesViewOperatorsModal from "../styles/stylesViewOperatorsModal";

const ViewOperatorsModal = () => {
    const {
        operator,
        isVisibleModal,
        justifyText,
        declineText,
        currentStep,
        selectedOptionOperators,
        justifyRef,
        declineRef,
        signRef,
        setJustifyText,
        setDeclineText,
        nextStep,
        prevStep,
        closeModal,
        optionChange
    } = useViewOperatorsModalHook();

    useEffect(() => {
        if (isVisibleModal && operator === null) {
            showAlert("error", "No hay información disponible del operador.");
        }
    }, [isVisibleModal, operator]);

    if (!operator) return null;

    const steps = {
        1: (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <View style={stylesViewOperatorsModal.titleContent}>
                            <View style={stylesViewOperatorsModal.leftGroup}>
                                <Text style={stylesViewOperatorsModal.title}>
                                    Autorización de Descuentos
                                </Text>
                            </View>
                            <TouchableOpacity onPress={closeModal}>
                                <Image
                                    source={require("../../../../../assets/icons/close.png")}
                                    style={stylesViewOperatorsModal.icon}
                                />
                            </TouchableOpacity>
                        </View>
                        <Divider style={stylesViewOperatorsModal.divider} />
                        <View>
                            <View style={{ marginTop: 40 }}>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    Bogotá, {" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.fechaDescuento}</Text>
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    Yo,{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.nombreOperador}</Text>
                                    , mayor de edad, identificado con C.C. No.{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.noIdentificador}</Text>
                                    {" "}en calidad de trabajador de{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.nombreEmpresa}</Text>
                                    {" "}por medio del presente documento manifiesto que.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    1. Soy beneficiario de un préstamo efectuado por la empresa por valor de{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.valorDescuento}</Text>
                                </Text>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    2. Dicho préstamo fue desembolsado el ________________
                                </Text>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    3. Dicho préstamo lo solicite por calamidad familiar.
                                </Text>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    4. El plazo para pagar dicho préstamo es de _______ meses a partir de la fecha.
                                </Text>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    5. Dicho préstamo no causa intereses durante el plazo de amortización.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    En virtud de lo anterior AUTORIZO a{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.nombreEmpresa}</Text>
                                    {" "}a descontar quincenalmente de cada mes el valor de la cuota de amortización por este concepto.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    Al momento de pagarse la Prima Legal de Servicios en cada periodo semestral, AUTORIZO a{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.nombreEmpresa}</Text>
                                    {" "}a descontar de su valor el 30% del mismo con destino a la amortización de la obligación de pago derivada del presente préstamo hecho por la Empresa.
                                </Text>
                            </View>
                        </View>
                        <View style={stylesViewOperatorsModal.buttonContent}>
                            <Button
                                mode="outlined"
                                style={stylesViewOperatorsModal.cancelModal}
                                textColor="#8C8C8C"
                                onPress={closeModal}
                            >
                                Cancelar
                            </Button>
                            <Button
                                mode="contained"
                                style={stylesViewOperatorsModal.nextModal}
                                onPress={nextStep}
                            >
                                Continuar
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        ),
        2: (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <View>
                            <View style={{ marginTop: 50 }}>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    De igual manera AUTORIZO a{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.nombreEmpresa}</Text>
                                    {" "}a descontar el saldo insoluto de este préstamo de mis prestaciones sociales el momento de registrarse la terminación de mi contrato de trabajo por cualquier causal.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    VALOR TOTAL DEL PRESTAMO{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.valorDescuento}</Text>
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    EL TRABAJADOR{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.nombreOperador}</Text>
                                </Text>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    C.C. No.{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.noIdentificador}</Text>
                                </Text>
                                <Text style={stylesViewOperatorsModal.textModalGray}>
                                    Centro de costos:{" "}
                                    <Text style={stylesViewOperatorsModal.textModalGreen}>{operator.centroCostos}</Text>
                                </Text>
                            </View>
                            <View style={stylesViewOperatorsModal.checkContent}>
                                <View style={stylesViewOperatorsModal.checkSubContent}>
                                    <Checkbox
                                        color="#90D400"
                                        uncheckedColor="#68AF00"
                                        status={selectedOptionOperators === 'justificar' ? 'checked' : 'unchecked'}
                                        onPress={() => optionChange('justificar')}
                                    />
                                    <Text style={stylesViewOperatorsModal.titleCheck}>Justificar</Text>
                                </View>
                                <View style={[stylesViewOperatorsModal.checkSubContent, { marginLeft: 25 }]}>
                                    <Checkbox
                                        color="#90D400"
                                        uncheckedColor="#68AF00"
                                        status={selectedOptionOperators === 'rechazar' ? 'checked' : 'unchecked'}
                                        onPress={() => optionChange('rechazar')}
                                    />
                                    <Text style={stylesViewOperatorsModal.titleCheck}>Rechazar</Text>
                                </View>
                                <View style={[stylesViewOperatorsModal.checkSubContent, { marginLeft: 25 }]}>
                                    <Checkbox
                                        color="#90D400"
                                        uncheckedColor="#68AF00"
                                        status={selectedOptionOperators === 'firmar' ? 'checked' : 'unchecked'}
                                        onPress={() => optionChange('firmar')}
                                    />
                                    <Text style={stylesViewOperatorsModal.titleCheck}>Firmar</Text>
                                </View>
                            </View>
                            <View style={stylesViewOperatorsModal.contentOptionCheck}>
                                {selectedOptionOperators === 'justificar' && (
                                    <View>
                                        <Animatable.View ref={justifyRef}>
                                            <CustomTextInput
                                                label="Justificación"
                                                mode="outline"
                                                value={justifyText}
                                                onChangeText={(text) => {
                                                    let value = text;

                                                    if (/^\s+/.test(value)) {
                                                        showAlert("warning", "No se permiten espacios al inicio.");
                                                        value = value.replace(/^\s+/, '');
                                                    }

                                                    setJustifyText(value);
                                                }}
                                                theme={{
                                                    colors: {
                                                        outline: "#E5E5E5",
                                                        primary: "#90D400",
                                                    }
                                                }}
                                                multiline
                                                numberOfLines={5}
                                                style={stylesViewOperatorsModal.textInputCheck}
                                                keyboardType="default"
                                            />
                                        </Animatable.View>
                                    </View>
                                )}
                                {selectedOptionOperators === 'rechazar' && (
                                    <View>
                                        <Animatable.View ref={declineRef}>
                                            <CustomTextInput
                                                label="Motivo Rechazo"
                                                mode="outline"
                                                value={declineText}
                                                onChangeText={(text) => {
                                                    let value = text;

                                                    if (/^\s+/.test(value)) {
                                                        showAlert("warning", "No se permiten espacios al inicio.");
                                                        value = value.replace(/^\s+/, '');
                                                    }

                                                    setDeclineText(value);
                                                }}
                                                theme={{
                                                    colors: {
                                                        outline: "#E5E5E5",
                                                        primary: "#90D400",
                                                    }
                                                }}
                                                multiline
                                                numberOfLines={5}
                                                style={stylesViewOperatorsModal.textInputCheck}
                                                keyboardType="default"
                                            />
                                        </Animatable.View>
                                    </View>
                                )}
                                {selectedOptionOperators === 'firmar' && (
                                    <View>
                                        <Text style={{ fontSize: 17, color: '#005A6D' }}>Firma Operario</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }

    return <>{steps[currentStep]}</>;
}

export default ViewOperatorsModal;