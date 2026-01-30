import { Image, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../state/hooks";
import { resetAuth as resetAdvance } from "../../../../state/slices/advanceSlice";
import { resetAuth as resetArching } from "../../../../state/slices/archingSlice";
import { resetAuth } from "../../../../state/slices/authSlice";
import { resetCloseTurn } from "../../../../state/slices/closeTurnSlice";
import { resetAuth as resetInventory } from "../../../../state/slices/inventorySlice";
import { resetAuth as resetManagement } from "../../../../state/slices/managementSlice";
import { resetAuth as resetMovements } from "../../../../state/slices/movementsSlice";
import { resetOpenTurn } from "../../../../state/slices/openTurnSlice";
import stylesMajorImbalanceCloseTurn from "../styles/stylesMajorImbalanceCloseTurn";

const MajorImbalanceCloseTurn = () => {
    const { shifValidatorResponse } = useAppSelector((state) => state.closeTurn)
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

    const formatCurrency = (amount) => {
        const number = Number(amount);
        if (isNaN(number)) return "$ 0.00";

        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number);
    };


    return (
        <TouchableWithoutFeedback>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesMajorImbalanceCloseTurn.container}>
                    <View style={stylesMajorImbalanceCloseTurn.subContainer}>
                        <View style={stylesMajorImbalanceCloseTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/closeTurnIcon.png")}
                                style={stylesMajorImbalanceCloseTurn.iconTitle}
                            />
                            <View style={stylesMajorImbalanceCloseTurn.textContainer}>
                                <Text style={stylesMajorImbalanceCloseTurn.textTitle}>Cierre de Turno</Text>
                                <Text style={stylesMajorImbalanceCloseTurn.textSubtitle}>Bienvenid@ al registro de cierre de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesMajorImbalanceCloseTurn.greenLine} />
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                            <Card style={{ width: "50%", paddingVertical: 60, borderRadius: 12, backgroundColor: "#FFFFFF", elevation: 3 }}>
                                <Card.Content>
                                    <View style={{ alignItems: "center" }}>
                                        <Image
                                            source={require("../../../../assets/images/messangeWarning.png")}
                                            style={{ width: 126, height: 110 }}
                                            resizeMode="center"
                                        />
                                        <View style={{ alignItems: "center", marginTop: 20, maxWidth: "80%" }}>
                                            <Text style={{ fontSize: 21, color: "#FFA000", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>¡Hoy tienes un descuadre en tu turno!</Text>
                                            <Text style={{ fontSize: 21, color: "#929292", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>El faltante es por un valor de:</Text>
                                            <Text style={{ fontSize: 21, color: "#FFA000", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>{formatCurrency(shifValidatorResponse?.ajuste)}</Text>
                                        </View>
                                        <View>
                                            <Button
                                                mode="contained"
                                                style={{ backgroundColor: "#FFA000", paddingVertical: 2, borderRadius: 10, marginTop: 15 }}
                                                contentStyle={{ paddingHorizontal: 15 }}
                                                onPress={handleLogOut}
                                            >
                                                Cerrar con Faltante
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

export default MajorImbalanceCloseTurn;