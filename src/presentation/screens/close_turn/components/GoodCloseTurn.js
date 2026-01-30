import { Dimensions, Image, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { resetAuth as resetAdvance } from "../../../../state/slices/advanceSlice";
import { resetAuth as resetArching } from "../../../../state/slices/archingSlice";
import { resetAuth } from "../../../../state/slices/authSlice";
import { resetCloseTurn } from "../../../../state/slices/closeTurnSlice";
import { resetAuth as resetInventory } from "../../../../state/slices/inventorySlice";
import { resetAuth as resetManagement } from "../../../../state/slices/managementSlice";
import { resetAuth as resetMovements } from "../../../../state/slices/movementsSlice";
import { resetOpenTurn } from "../../../../state/slices/openTurnSlice";
import stylesGoodCloseTurn from "../styles/stylesGoodCloseTurn";

const GoodCloseTurn = () => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;

    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(resetAuth());
        dispatch(resetOpenTurn());
        dispatch(resetCloseTurn());
        dispatch(resetAdvance());
        dispatch(resetArching());
        dispatch(resetInventory());
        dispatch(resetManagement());
        dispatch(resetMovements());
    };

    return (
        <TouchableWithoutFeedback>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesGoodCloseTurn.container}>
                    <View style={stylesGoodCloseTurn.subContainer}>
                        <View style={stylesGoodCloseTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/closeTurnIcon.png")}
                                style={stylesGoodCloseTurn.iconTitle}
                            />
                            <View style={stylesGoodCloseTurn.textContainer}>
                                <Text style={stylesGoodCloseTurn.textTitle}>Cierre de Turno</Text>
                                <Text style={stylesGoodCloseTurn.textSubtitle}>Bienvenid@ al registro de cierre de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesGoodCloseTurn.greenLine} />
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                            <Card style={{ width: "50%", paddingVertical: 20, borderRadius: 12, backgroundColor: "#FFFFFF", elevation: 3 }}>
                                <Card.Content>
                                    <View style={{ alignItems: "center" }}>
                                        <Image
                                            source={require("../../../../assets/images/welcomeOpenTurn.png")}
                                            style={{ width: 250, height: 250 }}
                                            resizeMode="center"
                                        />
                                        <View style={{ alignItems: "center", marginTop: 10, maxWidth: "80%" }}>
                                            <Text style={{ fontSize: 21, color: "#90D400", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>¡Gran trabajo!</Text>
                                            <Text style={{ marginTop: 10, fontSize: 17, color: "#929292", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>Gracias por tu reporte, el turno ha terminado. Nos vemos mañana para seguir trabajando con el mismo entusiasmo. ¡Es hora de descansar!</Text>
                                        </View>
                                        <View>
                                            <Button
                                                mode="contained"
                                                style={{ backgroundColor: "#80C300", paddingVertical: 2, borderRadius: 10, marginTop: 15 }}
                                                contentStyle={{ paddingHorizontal: 15 }}
                                                onPress={handleLogOut}
                                            >
                                                Terminar turno
                                            </Button>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default GoodCloseTurn;