import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Text } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useInfrastructureCloseTurnHook from "../hooks/useInfrastructureCloseTurnHook";
import stylesInfrastructureCloseTurn from "../styles/stylesInfrastructureCloseTurn";
import InfrastructureAccordion from "./components/InfrastructureAccordion";
import InfrastructureSection from "./components/InfrastructureSection";

const InfrastructureCloseTurn = () => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;

    const {
        dispositivos,
        seguridad,
        infraestructura,
        handleCantidadChange,
        handleEstadoChange,
        handleObservationChange,
        handlePrevious,
        handleNextStep,
    } = useInfrastructureCloseTurnHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesInfrastructureCloseTurn.container}>
                    <View style={stylesInfrastructureCloseTurn.subContainer}>
                        <View style={stylesInfrastructureCloseTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/closeTurnIcon.png")}
                                style={stylesInfrastructureCloseTurn.iconTitle}
                            />
                            <View style={stylesInfrastructureCloseTurn.textContainer}>
                                <Text style={stylesInfrastructureCloseTurn.textTitle}>Cierre de turno</Text>
                                <Text style={stylesInfrastructureCloseTurn.textSubtitle}>Bienvenid@ al registro de cierre de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesInfrastructureCloseTurn.greenLine} />
                        <View style={{ marginTop: 35 }}>
                            <Text style={stylesInfrastructureCloseTurn.title}>Elementos e Infraestructura</Text>
                            <Text style={stylesInfrastructureCloseTurn.subTitle}>Reporte de estado de los elementos recibidos</Text>
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
                            <Text style={stylesInfrastructureCloseTurn.title}>Observaciones</Text>
                            <Animatable.View style={{ marginTop: 15 }}>
                                <CustomTextInput
                                    label="Observaciones (opcional)"
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: "#90D400"
                                        }
                                    }}
                                    multiline
                                    numberOfLines={5}
                                    style={{ backgroundColor: "#FFFFFF", fontSize: 16, minHeight: 100, lineHeight: 20 }}
                                    keyboardType="default"
                                />
                            </Animatable.View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default InfrastructureCloseTurn;