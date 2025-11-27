import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesOpenTurn from "../../open_turn/styles/stylesOpenTurn";

const CloseTurnScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesOpenTurn.container, { height: screenHeight - 100 }]}>
                    <View style={stylesOpenTurn.subContainer}>
                        <View style={stylesOpenTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/closeTurnIcon.png")}
                                style={stylesOpenTurn.iconTitle}
                            />
                            <View style={stylesOpenTurn.textContainer}>
                                <Text style={stylesOpenTurn.textTitle}>Cierre de Turno</Text>
                                <Text style={stylesOpenTurn.textSubtitle}>Bienvenid@ al registro de cierre de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesOpenTurn.greenLine} />
                        <View>
                            <Text>Reporte de Producido</Text>
                            <View>
                                <Text>Turno</Text>
                                <Text>Turno 1 - 06:00 am - 08:00 am</Text>
                            </View>
                            <View>
                                <Text>Operario</Text>
                                <Text>Nayibe Casas - 1020345678</Text>
                            </View>
                            <View>
                                <Text>Base de caja</Text>
                                <Text>$200.000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default CloseTurnScreen;