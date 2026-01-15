import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import stylesCloseTurn from "../styles/stylesCloseTurn";

const CloseTurnScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesCloseTurn.container}>
                    <View style={stylesCloseTurn.subContainer}>
                        <View style={stylesCloseTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/closeTurnIcon.png")}
                                style={stylesCloseTurn.iconTitle}
                            />
                            <View style={stylesCloseTurn.textContainer}>
                                <Text style={stylesCloseTurn.textTitle}>Cierre de Turno</Text>
                                <Text style={stylesCloseTurn.textSubtitle}>Bienvenid@ al registro de cierre de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesCloseTurn.greenLine} />
                        <View style={{ marginTop: 35 }}>
                            <Text style={stylesCloseTurn.title}>Reporte de Producido</Text>
                        </View>
                        <View style={{ marginTop: 35, marginLeft: 20 }}>
                            <Text style={stylesCloseTurn.subTitle}>Turno</Text>
                            <Text style={stylesCloseTurn.info}>Turno 1 - 06:00 am - 08:00 am</Text>
                        </View>
                        <Divider style={stylesCloseTurn.divider} />
                        <View style={{ marginTop: 25, marginLeft: 20 }}>
                            <Text style={stylesCloseTurn.subTitle}>Operario</Text>
                            <Text style={stylesCloseTurn.infoTwo}>Nayibe Casas - 1020345678</Text>
                        </View>
                        <Divider style={stylesCloseTurn.divider} />
                        <View style={{ marginTop: 25, marginLeft: 20 }}>
                            <Text style={stylesCloseTurn.subTitle}>Base de caja</Text>
                            <Text style={stylesCloseTurn.infoTwo}>$200.000</Text>
                        </View>
                        <Divider style={stylesCloseTurn.divider} />
                        <Divider style={stylesCloseTurn.divider} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default CloseTurnScreen;