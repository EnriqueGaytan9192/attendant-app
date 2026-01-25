import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import useSummaryCloseTurnHook from "../hooks/useSummaryCloseTurnHook";
import stylesSummaryCloseTurn from "../styles/stylesSummaryCloseTurn";

const SummaryCloseTurn = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        handlePrevious,
        handledNextStep,
    } = useSummaryCloseTurnHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesSummaryCloseTurn.container}>
                    <View style={stylesSummaryCloseTurn.subContainer}>
                        <View style={stylesSummaryCloseTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/closeTurnIcon.png")}
                                style={stylesSummaryCloseTurn.iconTitle}
                            />
                            <View style={stylesSummaryCloseTurn.textContainer}>
                                <Text style={stylesSummaryCloseTurn.textTitle}>Cierre de Turno</Text>
                                <Text style={stylesSummaryCloseTurn.textSubtitle}>Bienvenid@ al registro de cierre de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesSummaryCloseTurn.greenLine} />
                        <View style={{ marginTop: 35 }}>
                            <Text style={stylesSummaryCloseTurn.title}>Resumen Cierre de Turno</Text>
                        </View>
                        <View style={{ marginTop: 35, marginLeft: 20, flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ width: "45%" }}>
                                <View>
                                    <Text style={stylesSummaryCloseTurn.subTitle}>Turno</Text>
                                    <Text style={stylesSummaryCloseTurn.info}>Turno 1 - 06:00 am - 08:00 am</Text>
                                </View>
                                <Divider style={stylesSummaryCloseTurn.divider} />
                                <View style={{ marginTop: 25 }}>
                                    <Text style={stylesSummaryCloseTurn.subTitle}>Operario</Text>
                                    <Text style={stylesSummaryCloseTurn.infoTwo}>Nayibe Casas - 1020345678</Text>
                                </View>
                                <Divider style={stylesSummaryCloseTurn.divider} />
                                <View style={{ marginTop: 25 }}>
                                    <Text style={stylesSummaryCloseTurn.subTitle}>Terminal</Text>
                                    <Text style={stylesSummaryCloseTurn.infoTwo}>Terminal 1</Text>
                                </View>
                                <Divider style={stylesSummaryCloseTurn.divider} />
                                <View style={{ marginTop: 25 }}>
                                    <Text style={stylesSummaryCloseTurn.subTitle}>Base de caja</Text>
                                    <Text style={stylesSummaryCloseTurn.infoTwo}>$200.000</Text>
                                </View>
                                <Divider style={stylesSummaryCloseTurn.divider} />
                                <View style={{ marginTop: 25 }}>
                                    <Text style={stylesSummaryCloseTurn.subTitle}>Vehículos en Patio</Text>
                                    <Text style={stylesSummaryCloseTurn.infoTwo}>20</Text>
                                </View>
                                <Divider style={stylesSummaryCloseTurn.divider} />
                                <View style={{ marginTop: 25 }}>
                                    <Text style={stylesSummaryCloseTurn.subTitle}>Comprobantes de Pago</Text>
                                    <Text style={stylesSummaryCloseTurn.infoTwo}>20 de la 123 a la 456</Text>
                                </View>
                            </View>
                            <View style={{ width: "45%" }}>
                                <Card
                                    style={{
                                        width: "100%",
                                        borderRadius: 8,
                                        elevation: 3,
                                        backgroundColor: "white",

                                    }}
                                >
                                    <Card.Content>
                                        <View style={{ marginBottom: 60 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 60 }}>
                                                <Text style={stylesSummaryCloseTurn.title}>Producido reportado</Text>
                                                <Text style={stylesSummaryCloseTurn.infoThree}>$200.000</Text>
                                            </View>
                                            <Divider style={stylesSummaryCloseTurn.divider} />
                                            <View style={{ marginTop: 50, marginBottom: 30 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 50 }}>
                                                    <Text style={stylesSummaryCloseTurn.title}>Producido Attendant</Text>
                                                    <Text style={stylesSummaryCloseTurn.infoThree}>$200.000</Text>
                                                </View>
                                                <View style={{ marginLeft: 20 }}>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                                                        <Text style={stylesSummaryCloseTurn.title}>Efectivo</Text>
                                                        <Text style={stylesSummaryCloseTurn.infoThree}>$200.000</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                                                        <Text style={stylesSummaryCloseTurn.title}>Datáfono</Text>
                                                        <Text style={stylesSummaryCloseTurn.infoThree}>$200.000</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                                                        <Text style={stylesSummaryCloseTurn.title}>Avances</Text>
                                                        <Text style={stylesSummaryCloseTurn.infoThree}>$200.000</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <Divider style={stylesSummaryCloseTurn.divider} />
                                        </View>
                                    </Card.Content>
                                </Card>
                            </View>
                        </View>
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
                                onPress={handledNextStep}
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
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

export default SummaryCloseTurn;