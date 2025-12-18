import { useEffect } from "react";
import { Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Checkbox, Divider, Text } from "react-native-paper";
import { showAlert } from "../../../../../common/components/AlertManager";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import useViewManagersModalHook from "../hooks/useViewManagersModalHook";
import stylesViewManagersModal from "../styles/stylesViewManagersModal";

const ViewManagersModal = () => {
    const {
        jefe,
        isVisibleModal,
        currentStep,
        selectedOptionManagers,
        justifyRef,
        declineRef,
        signRef,
        nextStep,
        prevStep,
        closeModal,
        optionChange,
    } = useViewManagersModalHook();

    useEffect(() => {
        if (isVisibleModal && jefe === null) {
            showAlert("error", "No hay información disponible del operador.");
        }
    }, [isVisibleModal, jefe]);

    if (!jefe) return null;

    const steps = {
        1: (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <View style={stylesViewManagersModal.titleContent}>
                            <View style={stylesViewManagersModal.leftGroup}>
                                <Text style={stylesViewManagersModal.title}>
                                    Autorización de Descuentos
                                </Text>
                            </View>
                            <TouchableOpacity onPress={closeModal}>
                                <Image
                                    source={require("../../../../../assets/icons/close.png")}
                                    style={stylesViewManagersModal.icon}
                                />
                            </TouchableOpacity>
                        </View>
                        <Divider style={stylesViewManagersModal.divider} />
                        <View>
                            <View style={{ marginTop: 40}}>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    Bogotá, {" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.fechaDescuento}</Text>
                                </Text>
                            </View>
                            <View style={{ marginTop: 20}}>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    Yo, {" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.operario}</Text>
                                    , mayor de edad, identificado con C.C. No.{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.noIdentificador}</Text>
                                    {" "}en calidad de trabajador de{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.nombreEmpresa}</Text>
                                    {" "}por medio del presente documento manifiesto que.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    1. Soy beneficiario de un préstamo efectuado por la empresa por valor de{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.valorDescuento}</Text>
                                </Text>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    2. Dicho préstamo fue desembolsado el ________________
                                </Text>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    3. Dicho préstamo lo solicite por calamidad familiar.
                                </Text>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    4. El plazo para pagar dicho préstamo es de _______ meses a partir de la fecha.
                                </Text>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    5. Dicho préstamo no causa intereses durante el plazo de amortización.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    En virtud de lo anterior AUTORIZO a{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.nombreEmpresa}</Text>
                                    {" "}a descontar quincenalmente de cada mes el valor de la cuota de amortización por este concepto.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    Al momento de pagarse la Prima Legal de Servicios en cada periodo semestral, AUTORIZO a{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.nombreEmpresa}</Text>
                                    {" "}a descontar de su valor el 30% del mismo con destino a la amortización de la obligación de pago derivada del presente préstamo hecho por la Empresa.
                                </Text>
                            </View>
                        </View>
                        <View style={stylesViewManagersModal.buttonContent}>
                            <Button
                                mode="outlined"
                                style={stylesViewManagersModal.cancelModal}
                                textColor="#8C8C8C"
                                onPress={closeModal}
                            >
                                Cancelar
                            </Button>
                            <Button
                                mode="contained"
                                style={stylesViewManagersModal.nextModal}
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
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    De igual manera AUTORIZO a{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.nombreEmpresa}</Text>
                                    {" "}a descontar el saldo insoluto de este préstamo de mis prestaciones sociales el momento de registrarse la terminación de mi contrato de trabajo por cualquier causal.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    VALOR TOTAL DEL PRESTAMO{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.valorDescuento}</Text>
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    EL TRABAJADOR{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.operario}</Text>
                                </Text>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    C.C. No.{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.noIdentificador}</Text>
                                </Text>
                                <Text style={stylesViewManagersModal.textModalGray}>
                                    Centro de costos:{" "}
                                    <Text style={stylesViewManagersModal.textModalGreen}>{jefe.centroCostos}</Text>
                                </Text>
                            </View>
                            <View style={stylesViewManagersModal.checkContent}>
                                <View style={stylesViewManagersModal.checkSubContent}>
                                    <Checkbox
                                        color="#90D400"
                                        uncheckedColor="#68AF00"
                                        status={selectedOptionManagers === 'justificar' ? 'checked' : 'unchecked'}
                                        onPress={() => optionChange('justificar')}
                                    />
                                    <Text style={stylesViewManagersModal.titleCheck}>Justificar</Text>
                                </View>
                                <View style={[stylesViewManagersModal.checkSubContent, { marginLeft: 25 }]}>
                                    <Checkbox
                                        color="#90D400"
                                        uncheckedColor="#68AF00"
                                        status={selectedOptionManagers === 'rechazar' ? 'checked' : 'unchecked'}
                                        onPress={() => optionChange('rechazar')}
                                    />
                                    <Text style={stylesViewManagersModal.titleCheck}>Rechazar</Text>
                                </View>
                                <View style={[stylesViewManagersModal.checkSubContent, { marginLeft: 25 }]}>
                                    <Checkbox
                                        color="#90D400"
                                        uncheckedColor="#68AF00"
                                        status={selectedOptionManagers === 'firmar' ? 'checked' : 'unchecked'}
                                        onPress={() => optionChange('firmar')}
                                    />
                                    <Text style={stylesViewManagersModal.titleCheck}>Firmar</Text>
                                </View>
                            </View>
                            <View style={stylesViewManagersModal.contentOptionCheck}>
                                {selectedOptionManagers  === 'justificar' && (
                                    <View>
                                        <Animatable.View ref={justifyRef}>
                                            <CustomTextInput
                                                label="Justificación"
                                                mode="outline"
                                                theme={{
                                                    colors: {
                                                        outline: "#E5E5E5",
                                                        primary: "#90D400",
                                                    }
                                                }}
                                                multiline
                                                numberOfLines={5}
                                                style={stylesViewManagersModal.textInputCheck}
                                                keyboardType="default"
                                            />
                                        </Animatable.View>
                                    </View>
                                )}
                                {selectedOptionManagers  === 'rechazar' && (
                                    <View>
                                        <Animatable.View ref={declineRef}>
                                            <CustomTextInput
                                                label="Motivo Rechazo"
                                                mode="outline"
                                                theme={{
                                                    colors: {
                                                        outline: "#E5E5E5",
                                                        primary: "#90D400",
                                                    }
                                                }}
                                                multiline
                                                numberOfLines={5}
                                                style={stylesViewManagersModal.textInputCheck}
                                                keyboardType="default"
                                            />
                                        </Animatable.View>
                                    </View>
                                )}
                                {selectedOptionManagers  === 'firmar' && (
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

    return <>{steps[currentStep]}</>
}

export default ViewManagersModal;