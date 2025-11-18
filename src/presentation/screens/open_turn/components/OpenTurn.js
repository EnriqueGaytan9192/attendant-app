import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesOpenTurn from "../styles/stylesOpenTurn";

const OpenTurnScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[ stylesOpenTurn.container, { height: screenHeight - 25 }]}>
                    <View style={stylesOpenTurn.subContainer}>
                        <View style={stylesOpenTurn.containerTitle}>
                            <Image 
                                source={require("../../../../assets/images/openTurnIcon.png")}
                                style={stylesOpenTurn.iconTitle}
                            />
                            <View  style={stylesOpenTurn.textContainer}>
                                <Text style={stylesOpenTurn.textTitle}>Apertura de Turno</Text>
                                <Text style={stylesOpenTurn.textSubtitle}>Bienvenid@ al registro de apertura de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesOpenTurn.greenLine} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default OpenTurnScreen;