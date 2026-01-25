import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesInventoryVehicle from "../styles/stylesInventoryVehicle";

const InventoryVehicle = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesInventoryVehicle.container}>
                    <View style={stylesInventoryVehicle.subContainer}>
                        <View style={stylesInventoryVehicle.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/inventoryIcon.png")}
                                style={stylesInventoryVehicle.iconTitle}
                            />
                            <View style={stylesInventoryVehicle.textContainer}>
                                <Text style={stylesInventoryVehicle.textTitle}>Inventario de Vehiculos</Text>
                                <Text style={stylesInventoryVehicle.textSubtitle}>Estado de los Vehículos Ingresados</Text>
                            </View>
                        </View>
                        <View style={stylesInventoryVehicle.greenLine} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default InventoryVehicle;