import { Dimensions, Image, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Card, Text } from "react-native-paper";
import stylesWelcomeCloseTurn from "../styles/stylesWelcomeCloseTurn";

const WelcomeCloseTurn = () => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;

    return (
        <TouchableWithoutFeedback>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesWelcomeCloseTurn.container}>
                    <View style={stylesWelcomeCloseTurn.subContainer}>
                        <View style={stylesWelcomeCloseTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/closeTurnIcon.png")}
                                style={stylesWelcomeCloseTurn.iconTitle}
                            />
                            <View style={stylesWelcomeCloseTurn.textContainer}>
                                <Text style={stylesWelcomeCloseTurn.textTitle}>Cierre de Turno</Text>
                                <Text style={stylesWelcomeCloseTurn.textSubtitle}>Bienvenid@ al registro de cierre de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesWelcomeCloseTurn.greenLine} />
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                            <Card style={{ width: "50%", paddingVertical: 100, borderRadius: 12, backgroundColor: "#FFFFFF", elevation: 3 }}>
                                <Card.Content>
                                    <View style={{ alignItems: "center" }}>
                                        <Image
                                            source={require("../../../../assets/images/messangeWarning.png")}
                                            style={{ width: 126, height: 110 }}
                                            resizeMode="center"
                                        />
                                        <View style={{ alignItems: "center", marginTop: 20, maxWidth: "70%" }}>
                                            <Text style={{ fontSize: 21, color: "#FFA000", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>¡Uppss!</Text>
                                            <Text style={{ fontSize: 21, color: "#929292", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>No has realizado la apertura de turno. Vuelve más tarde.</Text>
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

export default WelcomeCloseTurn;