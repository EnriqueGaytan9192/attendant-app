import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Text } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useInfrastructureTurnHook from "../hooks/useInfrastructureTurnHook";
import stylesInfrastructureTurn from "../styles/stylesInfrastructureTurn";
import InfrastructureAccordion from "./components/InfrastructureAccordion";
import InfrastructureSection from "./components/InfrastructureSection";

const InfrastructureTurn = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        dispositivos,
        seguridad,
        infraestructura,
        loading,
        handleCantidadChange,
        handleEstadoChange,
        handleObservationChange,
        handlePrevious,
        handleNextStep,
    } = useInfrastructureTurnHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesInfrastructureTurn.container}>
                    <View style={stylesInfrastructureTurn.subContainer}>
                        <View style={stylesInfrastructureTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/openTurnIcon.png")}
                                style={stylesInfrastructureTurn.iconTitle}
                            />
                            <View style={stylesInfrastructureTurn.textContainer}>
                                <Text style={stylesInfrastructureTurn.textTitle}>Apertura de Turno</Text>
                                <Text style={stylesInfrastructureTurn.textSubtitle}>Bienvenid@ al registro de apertura de turn</Text>
                            </View>
                        </View>
                        <View style={stylesInfrastructureTurn.greenLine} />
                        <View style={{ marginTop: 35 }}>
                            <Text style={stylesInfrastructureTurn.title}>Elementos e Infraestructura</Text>
                            <Text style={stylesInfrastructureTurn.subTitle}>Reporte de estado de los elementos recibidos</Text>
                        </View>
                        <View style={{ marginTop: 35 }}>
                            <InfrastructureAccordion title="Dispositivos y Equipos">
                                <InfrastructureSection
                                    data={dispositivos}
                                    category="dispositivos"
                                    onObservationChange={handleObservationChange}
                                    onEstadoChange={handleEstadoChange}
                                    onCantidadChange={handleCantidadChange}
                                />
                            </InfrastructureAccordion>

                            <InfrastructureAccordion title="Elementos de Seguridad y Avisos">
                                <InfrastructureSection
                                    data={seguridad}
                                    category="seguridad"
                                    onObservationChange={handleObservationChange}
                                    onEstadoChange={handleEstadoChange}
                                    onCantidadChange={handleCantidadChange}
                                />
                            </InfrastructureAccordion>

                            <InfrastructureAccordion title="Infraestructura">
                                <InfrastructureSection
                                    data={infraestructura}
                                    category="infraestructura"
                                    onObservationChange={handleObservationChange}
                                    onEstadoChange={handleEstadoChange}
                                    onCantidadChange={handleCantidadChange}
                                />
                            </InfrastructureAccordion>
                        </View>
                        <View style={{ marginTop: 35, marginBottom: 50 }}>
                            <Text style={stylesInfrastructureTurn.title}>Observaciones</Text>
                            <Animatable.View style={{ marginTop: 15 }}>
                                <CustomTextInput
                                    label="Observaciones (opcional)"
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: '#90D400',
                                        }
                                    }}
                                    multiline
                                    numberOfLines={5}
                                    style={{ backgroundColor: "#FFFFFF", fontSize: 16, minHeight: 100, lineHeight: 20 }}
                                    keyboardType="default"
                                />
                            </Animatable.View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: "auto" }}>
                            <Button
                                mode="contained"
                                onPress={handlePrevious}
                                style={{ backgroundColor: "#8C8C8C", alignSelf: "flex-end", borderRadius: 10, marginRight: 20 }}
                                contentStyle={{
                                    paddingHorizontal: 30,
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                mode="contained"
                                onPress={handleNextStep}
                                style={{ backgroundColor: "#80C300", alignSelf: "flex-end", borderRadius: 10, marginLeft: 20 }}
                                contentStyle={{
                                    paddingHorizontal: 30
                                }}
                                loading={loading}
                                disabled={loading}
                            >
                                Continuar
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default InfrastructureTurn;