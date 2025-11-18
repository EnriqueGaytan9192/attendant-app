import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesSinisterScreen from "../styles/stylesSinisterScreen";

const SinisterScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesSinisterScreen.container, { height: screenHeight - 25 }]}>
                    <View style={stylesSinisterScreen.subContainer}>
                        <View style={stylesSinisterScreen.containerTitle}>
                            <Image
                                source={require("../../../../../assets/images/sinisterIcon.png")}
                                style={stylesSinisterScreen.iconTitle}
                            />
                            <View style={stylesSinisterScreen.textContainer}>
                                <Text style={stylesSinisterScreen.textTitle}>Siniestro</Text>
                                <Text style={stylesSinisterScreen.textSubtitle}>Radicar Siniestro</Text>
                            </View>
                        </View>
                        <View style={stylesSinisterScreen.greenLine} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default SinisterScreen;