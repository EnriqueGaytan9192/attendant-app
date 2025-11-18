import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesPqrsScreen from "../styles/stylesPqrsScreen";

const PqrsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesPqrsScreen.container, { height: screenHeight - 25 }]}>
                    <View style={stylesPqrsScreen.subContainer}>
                        <View style={stylesPqrsScreen.containerTitle}>
                            <Image
                                source={require("../../../../../assets/images/pqrsIcon.png")}
                                style={stylesPqrsScreen.iconTitle}
                            />
                            <View style={stylesPqrsScreen.textContainer}>
                                <Text style={stylesPqrsScreen.textTitle}>PQRS</Text>
                                <Text style={stylesPqrsScreen.textSubtitle}>Radicar PQRS</Text>
                            </View>
                        </View>
                        <View style={stylesPqrsScreen.greenLine} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default PqrsScreen;