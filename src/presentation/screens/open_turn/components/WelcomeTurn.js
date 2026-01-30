import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text } from "react-native-paper";
import useWelcomeTurnHook from "../hooks/useWelcomeTurnHook";
import stylesWelcomeTurn from "../styles/stylesWelcomeTurn";

const WelcomeTurn = () => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();
    const {
        nombre, 
        loading
    } = useWelcomeTurnHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesWelcomeTurn.container}>
                    <View style={stylesWelcomeTurn.subContainer}>
                        <View style={stylesWelcomeTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/openTurnIcon.png")}
                                style={stylesWelcomeTurn.iconTitle}
                            />
                            <View style={stylesWelcomeTurn.textContainer}>
                                <Text style={stylesWelcomeTurn.textTitle}>Apertura de Turno</Text>
                                <Text style={stylesWelcomeTurn.textSubtitle}>Bienvenid@ al registro de apertura de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesWelcomeTurn.greenLine} />
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image
                                source={require("../../../../assets/images/welcomeOpenTurn.png")}
                                style={{ width: 250, height: 250 }}
                                resizeMode="center"
                            />
                            <View style={{ alignItems: "center", marginTop: 20, maxWidth: "40%"  }}>
                                <Text style={{ fontSize: 21, color: "#90D400", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>¡Bienvenid@ de nuevo!</Text>
                                <Text style={{ marginTop: 10, fontSize: 17, color: "#929292", textAlign: "center", fontFamily: "Montserrat_400Regular" }}>Hola {nombre}, gracias por haber llegado a tiempo, recuerda trabajar con buena energía y disposición</Text>
                            </View>
                            <View>
                                <Button
                                    mode="contained"
                                    style={{ backgroundColor: "#90D400", paddingVertical: 2, borderRadius: 10, marginTop: 15 }}
                                    contentStyle={{ paddingHorizontal: 15 }}
                                    onPress={() => navigation.navigate("movements")}
                                >
                                    Comenzar turno
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default WelcomeTurn;