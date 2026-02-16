import { Dimensions, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import VehiclesListCard from "../components/VehiclesEntry/VehiclesListCard";
import stylesMovementsScreen from "../styles/stylesMovementsScreen";

const MovementsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesMovementsScreen.container, { height: screenHeight - 100 }]}>
                    <View style={stylesMovementsScreen.subContainer}>
                        {/*<View style={stylesMovementsScreen.containerTitle}>
                            <Image
                                source={require("../../../../assets/icons/movements.png")}
                                style={stylesMovementsScreen.iconTitle}
                            />
                            <View style={stylesMovementsScreen.textContainer}>
                                <Text style={stylesMovementsScreen.textTitle}>Movimientos</Text>
                                <Text style={stylesMovementsScreen.textSubtitle}>Entrada y Salida de Vehículos</Text>
                            </View>
                        </View>
                        <View style={stylesMovementsScreen.greenLine} />*/}
                        <View style={stylesMovementsScreen.containerColumns}>
                            <View style={stylesMovementsScreen.leftColumn}>
                                <VehiclesListCard />
                            </View>
                            <View style={stylesMovementsScreen.rightColumn}>
                                <Text>Columna Izquierda</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default MovementsScreen;