import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Switch, Text } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useInfrastructureCloseTurnHook from "../hooks/useInfrastructureCloseTurnHook";
import stylesInfrastructureCloseTurn from "../styles/stylesInfrastructureCloseTurn";
import InfrastructureAccordion from "./components/InfrastructureAccordion";
import InfrastructureSection from "./components/InfrastructureSection";

const InfrastructureCloseTurn = () => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;

    const {
        // Infraestructura
        dispositivos,
        seguridad,
        infraestructura,

        // Observaciones
        observationClose,

        // Boletería
        isComplete,
        numTicket,
        iniTicket,
        finTicket,

        // Handlers
        handleCantidadChange,
        handleEstadoChange,
        handleObservationChange,
        handleObservationCloseChange,

        handleIsCompleteChange,
        handleNumTicketChange,
        handleIniTicketChange,
        handleFinTicketChange,

        handlePrevious,
        handleSubmitCloseTurn,
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
                        <View style={{ marginTop: 35 }}>
                            <Text style={stylesInfrastructureCloseTurn.title}>Observaciones</Text>
                            <Animatable.View style={{ marginTop: 15 }}>
                                <CustomTextInput
                                    label="Observaciones (opcional)"
                                    value={observationClose}
                                    onChangeText={handleObservationCloseChange}
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
                        <View style={{ marginTop: 35 }}>
                            <Text style={stylesInfrastructureCloseTurn.title}>Boletería Mnaual</Text>
                            <View style={{ alignItems: "flex-start", flexDirection: "row", alignItems: "center" }}>
                                <Switch
                                    value={isComplete}
                                    onValueChange={handleIsCompleteChange}
                                    color="#90D400"
                                    trackColor={{
                                        true: "#90D400",
                                        false: "#90D400"
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 13,
                                        marginLeft: 8,
                                        fontFamily: "Montserrat_400Regular",
                                        lineHeight: 20,
                                        //color: baseCompleta ? "#666666" : "#666666",
                                        color: "#666666",
                                    }}
                                >
                                    {isComplete ? "No" : "Si"}
                                </Text>
                            </View>
                            {!isComplete && (
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Animatable.View style={{ width: "30%" }}>
                                        <CustomTextInput
                                            label="Cantidad de Boletas *"
                                            value={numTicket}
                                            onChangeText={handleNumTicketChange}
                                            mode="outlined"
                                            theme={{
                                                colors: {
                                                    outline: "#E5E5E5",
                                                    primary: "#90D400"
                                                }
                                            }}
                                            style={{ backgroundColor: "#FFFFFF", fontSize: 16, lineHeight: 20 }}
                                            keyboardType="numeric"
                                        />
                                    </Animatable.View>
                                    <Animatable.View style={{ width: "30%" }}>
                                        <CustomTextInput
                                            label="# de Boleta Inicial *"
                                            value={iniTicket}
                                            onChangeText={handleIniTicketChange}
                                            mode="outlined"
                                            theme={{
                                                colors: {
                                                    outline: "#E5E5E5",
                                                    primary: "#90D400"
                                                }
                                            }}
                                            style={{ backgroundColor: "#FFFFFF", fontSize: 16, lineHeight: 20 }}
                                            keyboardType="numeric"
                                        />
                                    </Animatable.View>
                                    <Animatable.View style={{ width: "30%" }}>
                                        <CustomTextInput
                                            label="# de Boleta Final *"
                                            value={finTicket}
                                            onChangeText={handleFinTicketChange}
                                            mode="outlined"
                                            theme={{
                                                colors: {
                                                    outline: "#E5E5E5",
                                                    primary: "#90D400"
                                                }
                                            }}
                                            style={{ backgroundColor: "#FFFFFF", fontSize: 16, lineHeight: 20 }}
                                            keyboardType="numeric"
                                        />
                                    </Animatable.View>
                                </View>
                            )}
                            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: "auto", marginTop: 50 }}>
                                <Button
                                    mode="contained"
                                    onPress={handlePrevious}
                                    style={{ backgroundColor: "#8C8C8C", alignSelf: "flex-end", borderRadius: 10, marginRight: 20 }}
                                    contentStyle={{ paddingHorizontal: 30 }}

                                >
                                    Cancelar
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={handleSubmitCloseTurn}
                                    style={{ backgroundColor: "#80C300", alignSelf: "flex-end", borderRadius: 10, marginLeft: 20 }}
                                    contentStyle={{
                                        paddingHorizontal: 30
                                    }}
                                >
                                    Continuar
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default InfrastructureCloseTurn;