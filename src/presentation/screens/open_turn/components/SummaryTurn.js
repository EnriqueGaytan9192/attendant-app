import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Divider, Switch, Text, TextInput } from "react-native-paper";
import useSummaryTurnHook from "../hooks/useSummaryTurnHook";
import stylesSummaryTurn from "../styles/stylesSummaryTurn";

const SummaryTurn = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        baseCompleta,
        toggleBase,
        handlePrevious,
    } = useSummaryTurnHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesSummaryTurn.container}>
                    <View style={stylesSummaryTurn.subContainer}>
                        <View style={stylesSummaryTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/openTurnIcon.png")}
                                style={stylesSummaryTurn.iconTitle}
                            />
                            <View style={stylesSummaryTurn.textContainer}>
                                <Text style={stylesSummaryTurn.textTitle}>Apertura de Turno</Text>
                                <Text style={stylesSummaryTurn.textSubtitle}>Bienvenid@ al registro de apertura de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesSummaryTurn.greenLine} />
                        <View style={{ marginTop: 35 }}>
                            <Text style={stylesSummaryTurn.title}>Resumen Apertura de Turno</Text>
                        </View>
                        <View style={{ marginTop: 35, marginLeft: 20 }}>
                            <Text style={stylesSummaryTurn.subTitle}>Turno</Text>
                            <Text style={stylesSummaryTurn.info}>Turno 1 - 06:00 am - 08:00 am</Text>
                        </View>
                        <Divider style={stylesSummaryTurn.divider} />
                        <View style={{ marginTop: 25, marginLeft: 20 }}>
                            <Text style={stylesSummaryTurn.subTitle}>Operario</Text>
                            <Text style={stylesSummaryTurn.infoTwo}>Nayibe Casas - 1020345678</Text>
                        </View>
                        <Divider style={stylesSummaryTurn.divider} />
                        <View style={{ marginTop: 25, marginLeft: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 20 }}>
                                <View>
                                    <Text style={stylesSummaryTurn.subTitle}>Base de caja</Text>
                                    <Text style={stylesSummaryTurn.infoTwo}>$200.000</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Switch
                                        value={baseCompleta}
                                        onValueChange={toggleBase}
                                        color="#80C300"
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 8,
                                            fontFamily: "Montserrat_500Medium",
                                            color: baseCompleta ? "#80C300" : "#8C8C8C",
                                        }}
                                    >
                                        {baseCompleta ? "Completa" : "Incompleta"}
                                    </Text>
                                </View>

                                {!baseCompleta && (
                                    <TextInput
                                        mode="outlined"
                                        placeholder="Base de Caja"
                                        style={{
                                            marginTop: 12,
                                            backgroundColor: "#FFFFFF",
                                            height: 45,
                                        }}
                                        outlineColor="#E5E5E5"
                                        activeOutlineColor="#80C300"
                                    />
                                )}
                            </View>
                        </View>
                        <Divider style={stylesSummaryTurn.divider} />
                        <View style={{ marginTop: 25, marginLeft: 20 }}>
                            <Text style={stylesSummaryTurn.subTitle}>Vehículos en Patio</Text>
                            <Text style={stylesSummaryTurn.infoTwo}>20</Text>
                        </View>
                        <Divider style={stylesSummaryTurn.divider} />
                        <View style={stylesSummaryTurn.containerButtons}>
                            <Button
                                mode="contained"
                                onPress={handlePrevious}
                                style={{ backgroundColor: "#8C8C8C", alignSelf: "flex-end", paddingHorizontal: 30, borderRadius: 10, marginRight: 20 }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                mode="contained"
                                style={{ backgroundColor: "#80C300", alignSelf: "flex-end", paddingHorizontal: 30, borderRadius: 10, marginLeft: 20 }}
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

export default SummaryTurn;