import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesAreaManagersScreen from "../styles/stylesAreaManagersScreen";

const AreaManagersScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesAreaManagersScreen.container, { height: screenHeight - 25 }]}>
                    <View style={stylesAreaManagersScreen.subContainer}>
                        <View style={stylesAreaManagersScreen.containerTitle}>
                            <Image
                                source={require("../../../../../assets/images/pqrsIcon.png")}
                                style={stylesAreaManagersScreen.iconTitle}
                            />
                            <View style={stylesAreaManagersScreen.textContainer}>
                                <Text style={stylesAreaManagersScreen.textTitle}>Jefes</Text>
                                <Text style={stylesAreaManagersScreen.textSubtitle}>Radicar PQRS</Text>
                            </View>
                        </View>
                        <View style={stylesAreaManagersScreen.greenLine} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default AreaManagersScreen;